import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Button, Spinner } from 'reactstrap';






class Loading extends Component{
    constructor(props){
        super(props);
    }


      render() {
        return (
          <div className="d-flex justify-content-center">
              <Spinner style={{width: 200, height: 200}} type="grow" color="info" />
          </div>

        );
      }
}
export default (Loading);