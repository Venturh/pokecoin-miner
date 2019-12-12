import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import { CardsApi } from '../server';

import NavigationBar from './NavigationBar';
import Pack from './Pack';




class Packages extends Component{
    constructor(props){
        super(props);

        this.state = {
            packages: [],
          
        };
        this.cardsApi = new CardsApi();


        
    }

    componentDidMount() {
        this.cardsApi.cardsPackagesGet().then((response) => {
        console.log("Packages", response)
        this.setState({ packages: response });
        console.log("State Cards", this.state.packages)

      })

  }


      render() {
        return (
            <div>
                <NavigationBar/>
                <Container >
                    <h1>Packages</h1>
                    <Row>
                        {this.state.packages.map(item =>(
                        <Col xs="auto" key={item}>
                            <Pack key={item.id} name={item}/>
                        </Col>
                        ))}

                    </Row>
                </Container>
          </div>
        );
      }
}



export default Packages;
