import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Card, CardImg,
    CardTitle, Button } from 'reactstrap';



class Pack extends Component{
    constructor(props){
        super(props);
    }


      render() {
        return (
          <div >
              <Card>
                  <CardImg top src={this.props.imageurl ? this.props.imageurl:"https://i.ebayimg.com/images/g/gsYAAOSwt9FdQogP/s-l1600.png"}  alt="https://i.ebayimg.com/images/g/gsYAAOSwt9FdQogP/s-l1600.png" />
                  <Container className="text-center">
                    <CardTitle><h1>{this.props.name}</h1></CardTitle>
                    <Button color="primary" size="lg">Buy</Button>
                  </Container> 
              </Card>

          </div>

        );
      }
}

function mapState(state) {
  const {  } = state;
  return {   };
}

const actionCreators = {


};

export default connect(mapState, actionCreators)(Pack);
