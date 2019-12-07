import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Card, CardImg, Button } from 'reactstrap';






class UserCarde extends Component{
    constructor(props){
        super(props);
    }


      render() {
        return (
          <div >
              <button className="btn btn-link">
                <Card>
                    <CardImg top height="10%" width="10%" src={this.props.imageurl} alt="Card image cap" />
                </Card>
              </button>

          </div>

        );
      }
}
export default (UserCarde);
