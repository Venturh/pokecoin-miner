import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardTitle, CardHeader, CardSubtitle, CardBody, Button, Container, Row, Col } from 'reactstrap';
import NavigationBar from './NavigationBar';






class DetailCard extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }

  render() {
    return (
      <Container>
          <NavigationBar/>
          <Container className="d-flex justify-content-center">
            <Row>
              <Col xs="auto">
                <Card style={{ width: '18rem'}}>
                  <CardHeader >{this.props.location.name}</CardHeader>  
                  <CardImg src={this.props.location.image} alt="Card image cap" />
                  <CardBody className="text-center">
                      <CardSubtitle>{this.props.location.set} Pack</CardSubtitle>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
      </Container>
    );
  }
}

export default (DetailCard);
