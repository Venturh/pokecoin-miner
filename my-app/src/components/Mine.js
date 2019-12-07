import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Alert, Spinner  } from 'reactstrap';



import NavigationBar from './NavigationBar';
import { blockchainActions } from '../actions/BlockchainAction';
import { BlockchainApi, AddBlockBody, UsersApi } from '../server';
import { cookies } from '../constants/Cookie';

import worker from 'workerize-loader!../worker'; // eslint-disable-line import/no-webpack-loader-syntax


class Mine extends Component{

    constructor(props){
        super(props);

        this.state = {
            prevHash:'',
            data:'',
            timestamp: Math.floor(Date.now() / 1000),
            nonce: 0,
            difficulty: 0,
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
        this.timer = setInterval(() => this.fetchPrev(), 20000);
        this.checkActiveTab = this.checkActiveTab.bind(this);
        document.addEventListener('visibilitychange', this.checkActiveTab);
    }

    componentWillUnmount() {
        this.workerInstance.terminate();

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

    fetchPrev(){
        this.blockchainApi.blockchainLastBlockGet().then(function(response){
            this.setState({ prevHash: response.hash });
            console.log("lastblock")
        })
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
            console.log("lastblock")
        }.bind(this))
        .then(function(){
            this.blockchainApi.blockchainCurrentDifficultyGet().then(function(diff){
                this.setState({ difficulty: diff }); 
                console.log("diff", this.state.difficulty)
            }.bind(this))
            .then(function(){
                console.log("worker")
                this.workerInstance.calculateBlock(this.state.prevHash, Math.floor(Date.now() / 1000), this.state.data, 0, this.state.difficulty)
            }.bind(this))
        }.bind(this))



        this.workerInstance.addEventListener('message', (message) => {
            if(message.data.type != "RPC"){
                if(message.data.length == 2){
                    console.log('New Message 2: ', message.data)
                    this.setState({ nonce: message.data[0], timestamp: message.data[1]});
                } else {
                    console.log('New Message else: ', message.data)
                    this.sendBlock(message.data[0], message.data[1]);
                    //this.mine();
                }

            } else {
                console.log("fertig nichts gefunden");
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
                <Button color="primary" size="lg" block onClick={()=>this.workerInstance.postMessage("Hello World")}>PostMessage</Button>
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