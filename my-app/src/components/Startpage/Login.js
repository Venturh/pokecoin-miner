import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input, Alert, Spinner  } from 'reactstrap';


import { userActions } from '../../actions/UserAction';

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
        let login_loading = this.props.message.login_request
        let register_loading = this.props.message.register_request
        return (

          <div className="d-flex justify-content-center" >

            <Form>

              <h1 className="display-1 text-center">Pokecoin</h1>

              <FormGroup>
                  <Label>Username</Label>
                  <Input name="username" value={username} onChange={this.handleChange}></Input>
              </FormGroup>

              <FormGroup>
                  <Label>Password</Label>
                  <Input type="password" name="password" value={password} onChange={this.handleChange} ></Input>
              </FormGroup>

              <FormGroup>
                <Button color="primary" size="lg" block onClick={this.onSubmitLogin}>
                {login_loading && 
                  <Spinner className="spinner-grow spinner-grow-sm m-1" role="status" aria-hidden="true"/>}
                    Login
                </Button>

                <Button color="info" size="lg" block onClick={this.onSubmitRegister}>
                {register_loading &&
                  <Spinner className="spinner-grow spinner-grow-sm m-1" role="status" aria-hidden="true"/>}
                    Register
                </Button>
               </FormGroup>

               

              <div>
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
