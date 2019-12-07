import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';

import { CardsApi, UsersApi, UserCard } from '../server';
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
                const element = response[index];
                this.cardsApi.cardsCardIdGet(element.cardId).then((response)=>{
                    this.setState({ fullcards: [...this.state.fullcards, response] })
                })
            } 
        })


  }





      render() {
        console.log(this.state.fullcards)
          if(this.state.fullcards.length == 0){
              return(
                  <div>
                    <NavigationBar/>
                    <p>Loading...</p>
                  </div>
              )
          } else {
              return(
                <div>
                <NavigationBar/>
                    <Container >
                        <h1>Your Cards</h1>
                        <Row>
                            {this.state.fullcards.map(item =>(
                                <Col xs="auto" key={item.card.id}>
                                <UserCarde key={item.card.id} imageurl={item.card.imageUrl}/>
                                
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
