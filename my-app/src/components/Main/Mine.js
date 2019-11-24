import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button  } from 'reactstrap';
import NavigationBar from './NavigationBar';
import { blockchainActions } from '../../actions/BlockchainAction';
import { BlockchainApi } from '../../server';


class Mine extends Component{

    constructor(props){
        super(props);

        this.state = {
            prevHash:'',
            timestamp:'1574450651656',
            data:'hallo',
            nonce:''

        };
        this.mine = this.mine.bind(this);
    }

    getlatestBlock(){
        this.props.getLastBlock();

    }


    mine(){
        //this.props.blocks();
        const blockchainApi = new BlockchainApi();
        blockchainApi.blockchainLastBlockGet().
        then(function(response){
            this.setState({ prevHash: response.hash });
        }.bind(this))
        .then(function(){
            console.log("State ", this.state);
        }.bind(this))
        
        
    }

    render(){
        
        return(
            <div>
                <NavigationBar/>
                <h1 className="display-1 text-center ">Mining</h1>
                <Button color="info" size="lg"  onClick={this.mine}>Mine</Button>
            </div>
        )
    }
}
function mapState(state) {
    const {blockchain } = state;
    return { blockchain };
  }
  
  const actionCreators = {
      getLastBlock: blockchainActions.getLastBlock,
      blocks: blockchainActions.mine,
    
  };
  
  export default connect(mapState, actionCreators)(Mine);