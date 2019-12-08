import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { CardsApi } from '../server';

import NavigationBar from './NavigationBar';
import UserCard from './Card';
import Loading from './Loading';




class AllCards extends Component{
    constructor(props){
        super(props);

        this.state = {
          cards : [],
          loading : false,
        };
        this.cardsApi = new CardsApi();


        
    }

    componentDidMount() {
      this.loadCards(0)


  }

  loadCards(pagenr){
    this.setState({loading: true})
    this.cardsApi.cardsGet({page: pagenr}).then((response) => {
      //console.log("Cards", response.cards)
      this.setState({ cards: response.cards, loading: false });
    })
  }


      render() {
        if(this.state.loading){
          return(
          <div>
            <NavigationBar/>
            <Loading/>
          </div>
          )
        } else {
        return (
          <div>
            <NavigationBar/>
          <Container >
            <h1>All Cards</h1>
            <Pagination aria-label="Page navigation example">
              <PaginationItem>
                  <PaginationLink first onClick={()=>this.loadCards(0)} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={()=>this.loadCards(0)}>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                <PaginationLink onClick={()=>this.loadCards(1)}>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                <PaginationLink onClick={()=>this.loadCards(2)}>
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink last href="#" />
                </PaginationItem>
              </Pagination>
            <Row>
              {this.state.cards.map(item =>(
                    <Col xs="auto" key={item.id}>
                                                    <UserCard key={item.id}
                                    imageurl={item.imageUrl} 
                                    imageUrlHiRes={item.imageUrlHiRes} 
                                    name={item.name}
                                    cardId={item.id}
                                    set={item.set}/>
                    </Col>
                ))}
            </Row>
          </Container>
          </div>
        );
      }
    }
}

export default (AllCards);
