import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import { CardsApi } from '../server';

import NavigationBar from './NavigationBar';
import Carde from './Card';




class AllCards extends Component{
    constructor(props){
        super(props);

        this.state = {
          cards:[],
        };
        this.cardsApi = new CardsApi();


        
    }

    componentDidMount() {
      this.cardsApi.cardsGet(4).then((response) => {
        //console.log("Cards", response.cards)
        this.setState({ cards: response.cards });
      })

  }


      render() {
        return (
          <div>
            <NavigationBar/>
          <Container >
            <h1>All Cards</h1>
            <Row>
              {this.state.cards.map(item =>(
                    <Col xs="auto" key={item.id}>
                    <Carde key={item.id} name={item.name} imageurl={item.imageUrl}/>
                    </Col>
                ))}
            </Row>
          </Container>
          </div>
        );
      }
}

export default (AllCards);
