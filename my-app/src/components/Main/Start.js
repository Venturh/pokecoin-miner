import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                <h1>Willkomen {this.props.user.username}</h1>
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