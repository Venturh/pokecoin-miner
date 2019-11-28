import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavigationBar from './NavigationBar';
import { cookies } from '../../constants/Cookie'


class Start extends Component{

    constructor(props){
        super(props);

        this.state = {
            user: '',
            token: ''
        };
    }

    render(){
        return(
            <div>
                <NavigationBar/>
                <h1>Willkomen {cookies.get('username')}</h1>
                <h2>{this.props.user.username}</h2>
            </div>
        )
    }
}
function mapState(state) {
    const { message, user } = state;
    return { message, user };
  }
  
  const actionCreators = {
    
  };
  
  export default connect(mapState, actionCreators
  
    )(Start);