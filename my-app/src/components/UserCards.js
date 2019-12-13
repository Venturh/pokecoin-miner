import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'reactstrap';

import { CardsApi, UsersApi } from '../server';
import { cookies } from '../constants/Cookie';
import NavigationBar from './NavigationBar';
import UserCard from './Card';
import Loading from './Loading';




class UserCards extends Component{
    constructor(props){
        super(props);

        this.state = {
            cards: [],
            fullcards:[],
            loading: true
        };
        this.usersAPI = new UsersApi();
        this.usersAPI.apiClient.authentications.token.apiKey = cookies.get('token');
        this.cardsApi = new CardsApi(); 
    }

    componentDidMount() {
        this.cardsApi.cardsUsercardsGet().then((response)=>{
            this.setState({ cards: response})
            for (let index = 0; index < response.length; index++) {
                let double = false;
                const element = response[index];
                this.cardsApi.cardsCardIdGet(element.cardId).then((response)=>{
                    this.state.fullcards.forEach(e => {
                        if(e.card.id === element.cardId){
                            double = true;
                        }

                    });
                    if (double == false){
                        this.setState({ fullcards: [...this.state.fullcards, response,] })
                    }   
                })
            } 
            this.setState({loading: false})
        })
    }

    sortBy(type){
        this.setState({loading: true})
        switch (type) {
            case "supertype":
                this.state.fullcards.sort((a, b) => (a.card.supertype > b.card.supertype) ? 1 : -1)
                break;
            case "name":
                this.state.fullcards.sort((a, b) => (a.card.name > b.card.name) ? 1 : -1)
                break;
            default:
                break;
        }
        this.setState({loading: false})
    }


      render() {
          if(this.state.fullcards.length == 0){
              return(
                  <div>
                    <NavigationBar/>
                    <Loading/>
                  </div>
              )
          } else {
              return(
                <div>
                <NavigationBar/>
                    <Container >
                        <h1>Your cards</h1>
                        <span>Amount: {this.state.cards.length} | Without doubles: {this.state.fullcards.length}</span>
                        <Row>
                            <Col xs="3">
                                <Button block onClick={()=>this.sortBy("supertype")}>Sort by supertype</Button>
                            </Col>
                            <Col xs="3">
                                <Button block onClick={()=>this.sortBy("name")}>Sort by name</Button>
                                <p></p>
                            </Col>
                        </Row>

                        <Row>
                            {this.state.fullcards.map(item =>(
                                
                                <Col xs="auto" key={item.card.id}>
                                <UserCard key={item.card.id}
                                    imageurl={item.card.imageUrl} 
                                    imageUrlHiRes={item.card.imageUrlHiRes} 
                                    name={item.card.name}
                                    cardId={item.card.id}
                                    set={item.card.set}
                                    link={true}/>
                                    <p>#{item.card.nationalPokedexNumber}</p>
                                
                                </Col>
                            ))}
            
                        </Row>
                    </Container>
              </div>
              )
              

          }
      }
}

export default (UserCards);
