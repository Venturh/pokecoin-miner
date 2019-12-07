import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardTitle, CardText, CardSubtitle, CardBody, Button, Container, Row, Col } from 'reactstrap';
import NavigationBar from './NavigationBar';






class DetailCard extends Component{
    constructor(props){
        super(props);

        this.state = {
        };

    }

    componentDidMount() {
  }

  render() {
      console.log("props",this.props)
    return (
      <div>
          <NavigationBar/>
          <Container className="d-flex justify-content-center">
          <Row>
              <Col xs="auto">
            <CardImg src={this.props.location.image} alt="Card image cap" />
            <CardBody className="display-1 text-center">
                <CardTitle>{this.props.location.name}</CardTitle>
                <CardSubtitle>{this.props.location.set} Pack</CardSubtitle>
            </CardBody>
            </Col>
        </Row>

          </Container>


      </div>

    );
  }
}

export default (DetailCard);
