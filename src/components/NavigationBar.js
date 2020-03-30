import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink as RRNavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
    Col,
  } from 'reactstrap';
import { userActions } from '../actions/UserAction';
import Balance from './Balance';

class NavigationBar extends Component{
    render(){
        return(
            <div >
                <Navbar color="primary" light expand="sm">
                   <Row>
                       <Col xs="auto">
                           <NavbarBrand  className="text-white"  tag={RRNavLink} exact to="/mine">PokeCoin</NavbarBrand >
                       </Col>
                   </Row>
                    <Row className="ml-auto">
                        <Nav navbar>
                            <Col xs="auto">
                                <NavItem>
                                    <NavLink className="text-white" tag={RRNavLink} exact to="/mine">Farm</NavLink>
                                </NavItem>
                            </Col>
                            <Col xs="auto">
                                <NavItem>
                                    <NavLink className="text-white" tag={RRNavLink} exact to="/cardpackages">CardPackages</NavLink>
                                </NavItem>
                            </Col>

                            <Col xs="auto">
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle className="text-white" nav caret>
                                        Cards
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                        <NavLink tag={RRNavLink} exact to="/mycards">My Cards</NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                        <NavLink tag={RRNavLink} exact to="/allcards">AllCards</NavLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Col>

                            <Col xs="auto">
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle className="text-white" nav caret>
                                        User
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <a className="text-muted" href="https://rocky-lowlands-35145.herokuapp.com/views/users" target="_blank">Users</a>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <a className="text-muted" href="https://rocky-lowlands-35145.herokuapp.com/views/blockchain" target="_blank">Blockchains</a>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            <NavLink className="text-muted" onClick={this.props.logout}>Logout</NavLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Col>
                            <Col xs="auto" >
                                <NavItem>
                                    <NavLink><Balance/></NavLink>
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
    const { user } = state;
    return { user };
  }
  
  const actionCreators = {
    logout: userActions.logout,
  };
  
  export default connect(mapState, actionCreators
  
    )(NavigationBar);