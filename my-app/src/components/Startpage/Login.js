import React, { Component } from 'react';
import './login.css';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';


import { userActions } from '../../actions/UserAction';
import { cookies } from '../../constants/Cookie';

class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.onSubmitRegister = this.onSubmitRegister.bind(this);

    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onSubmitLogin(e) {
      
        e.preventDefault();
        const { username, password } = this.state;
        this.props.login(username, password);
    }

    onSubmitRegister(e) {
      
      e.preventDefault();
      const { username, password } = this.state;
      this.props.register(username, password);
  }

      render() {
        const { username, password } = this.state;
        const alert = this.props.message.error
        return (

          <div className="login">
          <h1>Pokecoin</h1>
  
            <Form className="login_form">
              <FormGroup>
                  <Label>Username</Label>
                  <Input name="username" value={username} onChange={this.handleChange}></Input>
              </FormGroup>

              <FormGroup>
                  <Label>Password</Label>
                  <Input type="password" name="password" value={password} onChange={this.handleChange} ></Input>
              </FormGroup>

              <FormGroup>
                <Button color="primary" size="lg" block onClick={this.onSubmitLogin}>Login</Button>
                <Button color="info" size="lg" block onClick={this.onSubmitRegister}>Register</Button>
               </FormGroup>

               <div className="alert">
             { alert && 
             <Alert color="danger">
                {this.props.message.error}
              </Alert> }
            </div>
            </Form>
    
        </div>
        );
      }
}

function mapState(state) {
  const { message, user } = state;
  return { message, user };
}

const actionCreators = {
  login: userActions.login, 
  register: userActions.register
};

export default connect(mapState, actionCreators)(Login);
