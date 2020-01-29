import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Alert, Spinner  } from 'reactstrap';



import NavigationBar from './NavigationBar';
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
        clearInterval(this.timer)
    }

    checkActiveTab(){
        if (document.visibilityState === 'hidden') {
            this.stopMine();
          }
    }

    handleChange(e) {
        const { value } = e.target;
        this.setState({ data: value });
    }

    fetch(){
        this.blockchainApi.blockchainLastBlockGet().then((response) =>{
            if(this.state.mining == true && response.hash != this.state.prevHash){
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
                        {this.state.mining && <Button color="primary" size="lg" block onClick={this.stopMine}>Stop</Button>}
                    </FormGroup>
                </Form>
            </div>
            <div  className="text-center">
                {[...Array(this.state.coins)].map((e, i) =>  <img style={{width: 50}} key={i} src="https://img.icons8.com/color/48/000000/pokecoin.png" className="img-fluid" alt="Responsive image"/>)}
            </div>
            </div>
        )
    }
}

export default (Mining);