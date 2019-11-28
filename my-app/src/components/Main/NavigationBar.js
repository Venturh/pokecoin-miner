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
    NavbarText
  } from 'reactstrap';
import { userActions } from '../../actions/UserAction';
import { blockchainActions } from '../../actions/BlockchainAction';

class NavigationBar extends Component{

    constructor(props){
        super(props);

        this.state = {

        };
    }

    render(){
        return(
            <div>
                <Navbar color="light" light expand="sm">

                             <Nav className="ml-auto" navbar>
                                <NavItem>
                                <NavLink tag={RRNavLink} exact to="/start">PokeCoin</NavLink>v 
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} exact to="/mine">Farm</NavLink>
                                </NavItem>
                                <NavItem>
                                    <Button outline color="dark" onClick={this.props.logout, this.props.stopMine}>Logout</Button>
                                </NavItem>
                            </Nav>
                        
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