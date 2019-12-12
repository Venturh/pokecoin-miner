import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, CardImg,
    CardTitle, Button, Col, Row } from 'reactstrap';

import { UsersApi, CardsApi } from '../server';
import { cookies } from '../constants/Cookie';
import UserCard from './Card';



class Pack extends Component{
    constructor(props){
        super(props);
        this.state = {
          success: false,
          cards: [],
        }
        this.usersAPI = new UsersApi();
        this.cardsApi = new CardsApi();
        this.usersAPI.apiClient.authentications.token.apiKey = cookies.get('token');
        //this.buyPackage = this.buyPackage.bind(this);
        this.buytest = this.buytest.bind(this);
    }

    buyPackage(name){
      this.setState({success: false})
      console.log("Gekauft", name);
      this.cardsApi.cardsPackagesCardPackNameBuyDefaultPackageGet(name).then((response) => {
        this.setState({success: true, cards: response.cards})
        console.log(this.state.cards, this.state.success);
      })
    }

    buytest(){
      this.setState({ success: false});
      this.setState({ success: true});
      console.log("Gekauft", this.state.cards, this.state.success);


    }
      


      render() {
        return (
          <div >
            <Container>
                <Card style={{ width: '18rem' }}>
                    <CardImg top src={this.props.imageurl ? this.props.imageurl:"https://i.ebayimg.com/images/g/gsYAAOSwt9FdQogP/s-l1600.png"}  alt="https://i.ebayimg.com/images/g/gsYAAOSwt9FdQogP/s-l1600.png" />
                    <Container className="text-center">
                      <CardTitle><h1>{this.props.name}</h1></CardTitle>
                      <Button color="primary" size="lg" onClick={()=>this.buyPackage(this.props.name)}>Buy</Button>
                    </Container>
                </Card>
                <Container>
                  <Row>
                  {this.state.success &&  this.state.cards.map(item =>(
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
                
              </Container>




              

          </div>

        );
      }
}



export default Pack;
