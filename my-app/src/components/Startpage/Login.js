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
        const { history } = this.props;
        const { username, password } = this.state;
        this.props.login(username, password);
    }

      render() {
        const { username, password } = this.state;
        return (
          <div>
            <form onSubmit={this.onSubmit}>
              
              <p>{this.props.message.error}</p>
                        
              
              <input type="text" name="username" value={username} onChange={this.handleChange}/>
              <input type="text" name="password" value={password} onChange={this.handleChange}/>
              <button type="submit">OK</button>
              <div>
              <p></p>
              {this.props.message.request &&
                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }
              </div>
            </form>
        </div>
        );
      }
}

function mapState(state) {
  const { message, user } = state;
  return { message, user };
}

const actionCreators = {
  login: userActions.login
};

export default connect(mapState, actionCreators

  )(Login);
