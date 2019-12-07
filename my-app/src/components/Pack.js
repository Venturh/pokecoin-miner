import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, CardImg,
    CardTitle, Button } from 'reactstrap';

import { UsersApi, CardsApi } from '../server';
import { cookies } from '../constants/Cookie';



class Pack extends Component{
    constructor(props){
        super(props);
        this.usersAPI = new UsersApi();
        this.cardsApi = new CardsApi();
        this.usersAPI.apiClient.authentications.token.apiKey = cookies.get('token');
        this.buyPackage = this.buyPackage.bind(this);
    }

    buyPackage(name){
      console.log("Gekauft", name);
      this.cardsApi.cardsPackagesCardPackNameBuyDefaultPackageGet(name).then((response) => {
        console.log(response);
      })


    }
      


      render() {
        return (
          <div >
              <Card>
                  <CardImg top src={this.props.imageurl ? this.props.imageurl:"https://i.ebayimg.com/images/g/gsYAAOSwt9FdQogP/s-l1600.png"}  alt="https://i.ebayimg.com/images/g/gsYAAOSwt9FdQogP/s-l1600.png" />
                  <Container className="text-center">
                    <CardTitle><h1>{this.props.name}</h1></CardTitle>
                    <Button color="primary" size="lg" onClick={()=>this.buyPackage(this.props.name)}>Buy</Button>
                  </Container> 
              </Card>

          </div>

        );
      }
}



export default Pack;
