import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Alert, Spinner  } from 'reactstrap';



import NavigationBar from './NavigationBar';
import { blockchainActions } from '../actions/BlockchainAction';
import { BlockchainApi, AddBlockBody, UsersApi } from '../server';
import { cookies } from '../constants/Cookie';

import worker from 'workerize-loader!../worker'; // eslint-disable-line import/no-webpack-loader-syntax


class Mining extends Component{

    constructor(props){
        super(props);

        this.state = {
            prevHash:'',
            data:'',
            timestamp: Math.floor(Date.now() / 1000),
            nonce: 0,
            difficulty: 0,
            mining: false,
            coins: 0,
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
        document.title = "Gefarmte Coins: " + this.state.coins;
    }

    componentDidMount(){
        this.timer = setInterval(() => this.fetch(), 20000);
        this.fetch();

    }

    componentWillUnmount() {
        this.workerInstance.terminate();

    }

    checkActiveTab(){
        if (document.visibilityState === 'hidden') {
            //this.stopMine();
          }
    }

    handleChange(e) {
        const { value } = e.target;
        this.setState({ data: value });
    }

    fetch(){
        this.blockchainApi.blockchainLastBlockGet().then((response) =>{
            if(this.state.mining == true && response.hash != this.state.prevHash){
                console.log("Neuer Hash von wem anderen:",response.hash, "Alter hash", this.state.prevHash)
                this.workerInstance.terminate();
                this.setState({ prevHash: response.hash });
                this.mine();
            }
            this.setState({ prevHash: response.hash });
            //console.log("lastblock", this.state.prevHash)
        }).then(() =>{
            this.blockchainApi.blockchainCurrentDifficultyGet().then((diff) => {
                this.setState({ difficulty: diff }); 
                //console.log("diff", this.state.difficulty)
            })
        })
    }

    mine(){
        this.workerInstance = worker();
        this.setState({ mining: true});
        this.workerInstance.calculateBlock(this.state.prevHash, Date.now(), this.state.data, 0, this.state.difficulty)

        this.workerInstance.addEventListener('message', (message) => {
            switch (message.data.type) {
                case "info":
                    console.log("Info", message.data)
                    break;

                case "blockfound":
                    console.log("BlockFound", message.data)
                    this.setState({nonce: message.data.nonce, timestamp: message.data.timestamp});
                    const addBlockBody = new AddBlockBody(this.state.prevHash, this.state.data, this.state.timestamp, this.state.nonce)
                    console.log("Blockbody:",addBlockBody)
                    this.blockchainApi.blockchainBlocksPost(addBlockBody).then((response)=>{
                        console.log(response)
                    })
                    this.setState({ coins: this.state.coins+=1 });
                    document.title = "Gefarmte Coins: " + this.state.coins
                default:
                console.log("Defaulktmessage", message.data)
                
            }
        })
    }


    stopMine(){
        this.setState({ mining: false});
        console.log("Stopped mining");
        this.workerInstance.terminate();
    }


    render(){
        let data = this.state.data;
        let mining = this.state.mining;

        
        
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
                        {[...Array(this.state.coins)].map((e, i) => <img key={i} src="data:image/jpeg;base64,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" className="img-fluid" alt="Responsive image"/>)}
                    </div>
                </Form>
                </div>
            </div>
        )
    }
}

  
  export default (Mining);