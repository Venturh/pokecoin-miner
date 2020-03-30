import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import { CardsApi } from '../server';
import NavigationBar from './NavigationBar';
import Pack from './Pack';
import Loading from './Loading';

class Packages extends Component{
    constructor(props){
        super(props);
        this.state = {
            packages: [],
            loading: true,
          
        };
        this.cardsApi = new CardsApi();   
    }

    componentDidMount() {
        this.cardsApi.cardsPackagesGet().then((response) => {
        this.setState({ packages: response, loading: false });
      })
  }

      render() {
        if(this.state.loading){
            return (
                <div>
                    <NavigationBar/>
                    <Loading/>
              </div>
            );
        } else {
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
}



export default Packages;
