import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';

import { CardsApi, UsersApi } from '../server';
import { cookies } from '../constants/Cookie';
import NavigationBar from './NavigationBar';
import UserCarde from './UserCard';




class UserCards extends Component{
    constructor(props){
        super(props);

        this.state = {
            cards: [],
            fullcards:[]
        };
        this.usersAPI = new UsersApi();
        this.usersAPI.apiClient.authentications.token.apiKey = cookies.get('token');
        this.cardsApi = new CardsApi(); 
    }

    componentDidMount() {
        this.cardsApi.cardsUsercardsGet().then((response)=>{
            console.log("response", response)
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
                    if (double == false)
                        this.setState({ fullcards: [...this.state.fullcards, response] })
                        this.state.fullcards.sort((a, b) => (a.card.supertype > b.card.supertype) ? 1 : -1)
                })
            } 
            
        })
  }

      render() {
          if(this.state.fullcards.length == 0){
              return(
                  <div>
                    <NavigationBar/>
                    <p>Loading...</p>
                  </div>
              )
          } else {
            console.log(this.state.fullcards)
              return(
                <div>
                <NavigationBar/>
                    <Container >
                        <h1>Your Cards</h1>
                        <Row>
                            {this.state.fullcards.map(item =>(
                                
                                <Col xs="auto" key={item.card.id}>
                                <UserCarde key={item.card.id}
                                    imageurl={item.card.imageUrl} 
                                    imageUrlHiRes={item.card.imageUrlHiRes} 
                                    name={item.card.name}
                                    cardId={item.card.id}
                                    set={item.card.set}/>
                                
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
