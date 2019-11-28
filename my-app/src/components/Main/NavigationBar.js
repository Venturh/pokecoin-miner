import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink as RRNavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Row,
    Col,
  } from 'reactstrap';
import { userActions } from '../../actions/UserAction';
import { blockchainActions } from '../../actions/BlockchainAction';
import Balance from '../Mining/Balance';

class NavigationBar extends Component{

    constructor(props){
        super(props);

        this.state = {

        };
    }

    render(){
        return(
            <div>
                <Navbar color="primary" light expand="sm">
                    <Row className="ml-auto">
                        <Nav  navbar>
                            <Col xs="auto"> 
                                <NavItem>
                                    <NavLink tag={RRNavLink} exact to="/start">PokeCoin</NavLink>
                                </NavItem>
                            </Col>
                            <Col xs="auto">
                                <NavItem>
                                    <NavLink tag={RRNavLink} exact to="/mine">Farm</NavLink>
                                </NavItem>
                            </Col>
                            <Col xs="auto" >
                                <NavItem>
                                    <NavLink><Balance/></NavLink>
                                    </NavItem>
                            </Col>
                            <Col xs="auto">
                                <NavItem>
                                <Button outline color="dark" onClick={this.props.logout}>Logout</Button>
                                </NavItem>
                            </Col>
                        </Nav>
                    </Row>  
                </Navbar>
            </div>
        )
    }
}
function mapState(state) {
    const {  } = state;
    return {  };
  }
  
  const actionCreators = {
    logout: userActions.logout,
    stopMine: blockchainActions.stop,
    
  };
  
  export default connect(mapState, actionCreators
  
    )(NavigationBar);