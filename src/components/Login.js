import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { setAuthedUser, clearAuthedUser } from '../actions/authedUser';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'



class Login extends Component {
	state = {
		userId: null,
		toHome: false,
	}

	handleChoice = function(event) {
		const userId = event.target.value;
		this.setState(function(previousState) {
		  return {
			...previousState,
			userId,
		  };
		});
	}
	
	handleLogin = function(event) {
		const { userId } = this.state;
		const { dispatch } = this.props;
		dispatch(setAuthedUser(userId));
	
		this.setState(function(previousState) {
		  return {
			...previousState,
			toHome: true,
		  };
		});
	}
	
	componentDidMount() {
		this.props.dispatch(clearAuthedUser())
	}

    render() {
		const { userId, toHome } = this.state;
		const { users } = this.props;
		const { from } = this.props.location.state || { from: { pathname: '/dashboard'}}
		const selected = userId ? userId : -1

		if(toHome) {
			return <Redirect to={from} />
		}
        return (
			<><div className="lgn"><Card>
				<Card.Header>Login</Card.Header>
				<Card.Img variant="top" src="https://png.pngtree.com/png-vector/20190919/ourmid/pngtree-user-login-or-authenticate-icon-on-gray-background-flat-icon-ve-png-image_1742031.jpg" />
				<Card.Body>
					<Card.Title>please select a user</Card.Title>
					<Form onSubmit={this.handleLogin}>					
					<Form.Group controlId="exampleForm.ControlSelect1">
						<Form.Label>select</Form.Label>
						<Form.Control as="select"  value={selected} onChange={(event) => this.handleChoice(event)}>
						<option value="-1" disabled>Select user...</option>
						{Object.keys(users).map(function(key) {
							return (
								<option value={users[key].id} key={key}>
									{users[key].name}
								</option>);})}
						</Form.Control>
					</Form.Group>
					</Form>
					<Button  type="submit" variant="success" disabled={userId === null}
					onClick={(event) => this.handleLogin(event)}>Login</Button>
				</Card.Body>				
			</Card>
			</div></>
		);  
    }
}

function mapStateToProps ({users}) {  
    return {
      users,
    };
  }

export default withRouter(connect(mapStateToProps)(Login));