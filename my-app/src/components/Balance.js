import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Badge } from 'reactstrap';

import { balanceAction } from '../actions/BalanceAction';
import { UsersApi } from '../server';
import { cookies } from '../constants/Cookie';


import { userActions } from '../actions/UserAction';

class Balance extends Component{
    constructor(props){
        super(props);

        this.state = {
          

        };
        this.usersAPI = new UsersApi();
        this.usersAPI.apiClient.authentications.token.apiKey = cookies.get('token');

        
    }

    componentDidMount() {
      this.fetchUsers();
      this.timer = setInterval(() => this.fetchUsers(), 20000);
  }

    componentWillUnmount() {
      clearInterval(this.timer);
      this.timer = null;
  }



    fetchUsers(){
      this.props.getBalance();
    }

      render() {
        return (
          <div className="text-white">
            Coins:  <Badge color="info">{this.props.wallet.balance }</Badge>
          </div>

        );
      }
}

function mapState(state) {
  const { wallet } = state;
  return { wallet  };
}

const actionCreators = {
  getBalance: balanceAction.getBalance

};

export default connect(mapState, actionCreators)(Balance);
