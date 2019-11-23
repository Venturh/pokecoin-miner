import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavigationBar from './NavigationBar';

class Mine extends Component{

    constructor(props){
        super(props);

        this.state = {
        };
    }

    render(){
        return(
            <div>
                <NavigationBar/>
                <h1>Mining</h1>
            </div>
        )
    }
}
function mapState(state) {
    const { } = state;
    return {  };
  }
  
  const actionCreators = {
    
  };
  
  export default connect(mapState, actionCreators)(Mine);