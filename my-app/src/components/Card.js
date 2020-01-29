import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, } from 'reactstrap';






class UserCard extends Component{
    constructor(props){
        super(props);
    }
    
      render() {
        const location = {
          pathname: "/cards/" + this.props.cardId,
      }
        return (
          <div >
            { this.props.link ? <Link to={location}>
              <Card>
                  <CardImg top height="10%" width="10%" src={this.props.imageurl} alt="Card image cap" />
              </Card>
            </Link>
            :
            <Card>
              <CardImg top height="10%" width="10%" src={this.props.imageurl} alt="Card image cap" />
            </Card>
          }
        </div>

        );
      }
}

export default (UserCard);
