import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Card, CardImg, } from 'reactstrap';






class Carde extends Component{
    constructor(props){
        super(props);
    }


      render() {
        return (
          <div >
              <Card>
                  <CardImg top height="10%" width="10%" src={this.props.imageurl} alt="Card image cap" />
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

export default connect(mapState, actionCreators)(Carde);
