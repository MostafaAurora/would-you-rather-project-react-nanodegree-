import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddQuestion } from  '../actions/questions'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreatNewQuestion extends Component {	
	state = {      
    	ChoiceOneText:'',
		ChoiceTwoText:'',
		toHome: false
	};
	
	handleInputChange = (event, Choice) => {
		const value = event.target.value;
		this.setState((state) => {
			return Choice === 'Choice1' ? {...state, ChoiceOneText: value} : {...state, ChoiceTwoText: value}
		});
	}
	
	handleSubmit = (event) => {   
    	event.preventDefault();
    	const { dispatch } = this.props
    	const { ChoiceOneText, ChoiceTwoText} = this.state  

    	dispatch(handleAddQuestion(
			ChoiceOneText,
			ChoiceTwoText
    	))
    	this.setState({
        	ChoiceOneText:'',
			ChoiceTwoText:'',
			toHome: true
      	})
  	}
 
	render() {
		const { toHome } = this.state;
		
		if (toHome) {			
			return <Redirect to='/dashboard' />
		}
		return (
			<><><Card style={{width:"70%",borderRadius:'15px',}}>
				<Card.Header><Card.Title>create a new question</Card.Title></Card.Header>
				<Card.Body style={{display:"-ms-flexbox", flexDirection:'column', alignItems:'center', justifyContent:"center"}}>
				<Card.Title>would you rather</Card.Title>
				<Form onSubmit={this.handleSubmit}>
				<Form.Group controlId="optionOne">
					<Form.Label>Choice One</Form.Label>
					<Form.Control
						type="text"
						name="optionOne"
						value={this.stateChoiceOneText}
						onChange={(event) => this.handleInputChange(event, 'Choice1')} 
					/>
				</Form.Group>
				<h4>OR</h4>
				<Form.Group controlId="optionTwo">
					<Form.Label>Choice Two</Form.Label>
					<Form.Control
					type="text"
					name="optionTwo"
					value={this.state.ChoiceTwoText}
					onChange={(event) => this.handleInputChange(event, 'Choice2')} 
					/>
				</Form.Group>
				<Button type="submit" variant="primary"	>Submit</Button>
			    </Form>
				</Card.Body>
			</Card></>
			</>
  		)
	}
}

export default connect()(CreatNewQuestion);