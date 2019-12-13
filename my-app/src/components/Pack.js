import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, CardImg,
    CardTitle, Button, Col, Row, Modal, ModalHeader, ModalBody} from 'reactstrap';

import { UsersApi, CardsApi } from '../server';
import { cookies } from '../constants/Cookie';
import { balanceAction } from '../actions/BalanceAction';
import UserCard from './Card';



class Pack extends Component{
    constructor(props){
        super(props);
        this.state = {
          success: false,
          cards: [],
          modal: false
        }
        this.usersAPI = new UsersApi();
        this.cardsApi = new CardsApi();
        this.usersAPI.apiClient.authentications.token.apiKey = cookies.get('token');
    }

    buyPackage(name){
      this.setState({success: false})
      console.log("Gekauft", name);
      this.cardsApi.cardsPackagesCardPackNameBuyDefaultPackageGet(name).then((response) => {
        this.setState({success: true, cards: response.cards})
        console.log(this.state.cards, this.state.success);
        this.props.getBalance()
        this.toggleModal();
        
      })
    }
    toggleModal(){
      this.setState({modal: !this.state.modal})
    }
      render() {
        return (
          <div >
            <Container>
                <Card style={{ width: '18rem' }}>
                    <CardImg top src={this.props.imageurl ? this.props.imageurl:"https://i.ebayimg.com/images/g/gsYAAOSwt9FdQogP/s-l1600.png"}
                      alt="fail" />
                    <Container className="text-center">
                      <CardTitle><h1>{this.props.name}</h1></CardTitle>
                      <Button color="primary" size="lg" onClick={()=>this.buyPackage(this.props.name)}>Buy</Button>
                      <Modal className="d-flex justify-content-center" isOpen={this.state.modal} toggle={()=>this.toggleModal()} >
                        <ModalHeader toggle={()=>this.toggleModal()}>Your new cards!</ModalHeader>
                        <ModalBody>
                          <Row>
                            {this.state.success &&  this.state.cards.map(item =>(
                            <Col xs="5" key={item.id}>
                              <UserCard key={item.id}
                              imageurl={item.imageUrl} 
                              imageUrlHiRes={item.imageUrlHiRes} 
                              name={item.name}
                              cardId={item.id}
                              set={item.set}/>
                            </Col>
                            ))}
                          </Row>
                        </ModalBody>
                      </Modal>
                    </Container>
                </Card>
              </Container>
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

export default connect(mapState, actionCreators)(Pack);
