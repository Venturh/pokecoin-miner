import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Badge } from 'reactstrap';

import { blockchainActions } from '../actions/BlockchainAction';
import { UsersApi } from '../server';
import { cookies } from '../constants/Cookie';
import NavigationBar from './NavigationBar';




class CardPackages extends Component{
    constructor(props){
        super(props);

        this.state = {

        };
        this.usersAPI = new UsersApi();
        this.usersAPI.apiClient.authentications.token.apiKey = cookies.get('token');

        
    }


      render() {
        return (
          <div >
            <NavigationBar/>
            <h1>CardPackages</h1>
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

export default connect(mapState, actionCreators)(CardPackages);
