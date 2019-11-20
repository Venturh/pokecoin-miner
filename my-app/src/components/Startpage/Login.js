import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../actions/UserAction';

class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;
        this.props.login(username, password);
    }

      render() {
        const { username, password } = this.state;
        let {isLoginPending, isLoginSuccess, loginError} = this.props;
        return (
          <div>
            <form onSubmit={this.onSubmit}>
              <input type="text" name="username" value={username} onChange={this.handleChange}/>
              <input type="text" name="password" value={password} onChange={this.handleChange}/>
              <button type="submit">OK</button>
            </form>

            <div className="message">
              { isLoginPending && <div>Please wait...</div> }
              { isLoginSuccess && <div>Success.</div> }
              { loginError && <div>{loginError.message}</div> }
          </div>
        </div>
        );
      }
}



export default connect(
    (state) => { return {} },
    (dispatch) => {
      return {
        login: (username, password) => { dispatch(userActions.login(username, password)) }
      }
    }
  )(Login);
