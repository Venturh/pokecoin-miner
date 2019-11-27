import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Alert, Spinner  } from 'reactstrap';



import NavigationBar from './NavigationBar';
import { blockchainActions } from '../../actions/BlockchainAction';
import { BlockchainApi, AddBlockBody, UsersApi } from '../../server';
import { cookies } from '../../constants/Cookie';

import worker from 'workerize-loader!../../worker'; // eslint-disable-line import/no-webpack-loader-syntax


class Mine extends Component{

    constructor(props){
        super(props);

        this.state = {
            prevHash:'',
            data:'',
            timestamp: Math.floor(Date.now() / 1000),
            nonce: 0,
            mining: true,
            visibility: true

        };
        this.usersAPI = new UsersApi();
        this.blockchainApi = new BlockchainApi();
        this.usersAPI.apiClient.authentications.token.apiKey = cookies.get('token');
        this.workerInstance = worker();
        this.mine = this.mine.bind(this);
        this.stopMine = this.stopMine.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkActiveTab = this.checkActiveTab.bind(this);
        document.addEventListener('visibilitychange', this.checkActiveTab);
    }

    checkActiveTab(){
        if (document.visibilityState === 'hidden') {
            document.title = '😴';
            this.stopMine();
          }
    }

    handleChange(e) {
        const { value } = e.target;
        this.setState({ data: value });
    }

    sendBlock(timestamp, data){
        this.setState({timestamp: timestamp, nonce:data });
        const addBlockBody = new AddBlockBody(this.state.prevHash, this.state.data, this.state.timestamp, this.state.nonce)
        console.log("bla", this.state)
        this.props.blocks(addBlockBody);
    }

    mine(){
        this.workerInstance = worker();
        this.props.blockrequest();
        
        this.blockchainApi.blockchainLastBlockGet().then(function(response){
            this.setState({ prevHash: response.hash });
        }.bind(this))
        .then(function(response){
            console.log("Stare mining", this.state)
        }.bind(this)).then(function(){
            this.workerInstance.calculatePrimes(this.state.prevHash, this.state.timestamp, this.state.data, this.state.nonce)
        }.bind(this))


        this.workerInstance.addEventListener('message', (message) => {
            
            if(message.data.type != "RPC"){
                console.log('New Message: ', message.data)
                this.sendBlock(message.data[0], message.data[1]);
            } else {
                console.log("fertig nichts gefunden")
            }
          })   
    }


    stopMine(){
        this.setState({ mining: false});
        console.log("Stopped mining");
        this.workerInstance.terminate();
        this.props.stop();
    }

    render(){
        let data = this.state.data;
        let mining = this.props.blockchain.loading

        
        
        return(
            <div>
                <NavigationBar/>
                <h1 className="display-3 text-center ">Start Mining</h1>

                <div className="d-flex justify-content-center">
                
                <Form >
                    <FormGroup>
                        <Label>Your Lucky Word:</Label>
                        <Input  value={data} onChange={this.handleChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" size="lg" block onClick={this.mine}>
                        {mining &&
                         <Spinner className="spinner-grow spinner-grow-sm m-1" role="status" aria-hidden="true"/>}
                            Mine
                            </Button>
                        <Button color="primary" size="lg" block onClick={this.stopMine}>Stop</Button>
                    </FormGroup>
                    <div>
                        {this.props.blockchain.blockfound && <p>You found a PokeCoin! Press mine again</p>}
                    </div>
                </Form>


                
                
                </div>
            </div>
        )
    }
}
function mapState(state) {
    const {blockchain } = state;
    return { blockchain };
  }
  
  const actionCreators = {
    blockrequest: blockchainActions.blockrequest,
    blocks: blockchainActions.mine,
    stop: blockchainActions.stop,
    
  };
  
  export default connect(mapState, actionCreators)(Mine);