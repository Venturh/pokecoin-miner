import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
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
                                <NavbarBrand href="/start">PokeCoin</NavbarBrand>
                                <NavItem>
                                    <NavLink href="/mine">Farm</NavLink>
                                </NavItem>
                                <NavItem>
                                    <Button outline color="dark" onClick={this.props.logout}>Logout</Button>
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
    
  };
  
  export default connect(mapState, actionCreators
  
    )(NavigationBar);