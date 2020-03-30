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
            fullcards:[],
        };
        this.usersAPI = new UsersApi();
        this.usersAPI.apiClient.authentications.token.apiKey = cookies.get('token');
        this.cardsApi = new CardsApi(); 
    }

    componentDidMount() {
        this.cardsApi.cardsUsercardsGet().then((response)=>{
            response = response.filter((v,i,a)=>a.findIndex(t=>(t.cardId===v.cardId))===i)
            response.forEach(element => {
                this.cardsApi.cardsCardIdGet(element.cardId).then((response)=>{
                    this.setState({ fullcards: [...this.state.fullcards, response,] })
                })


            }); 
        })
    }

    sortBy(type){
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
    }


      render() {
          if(this.state.fullcards.length === 0){
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
