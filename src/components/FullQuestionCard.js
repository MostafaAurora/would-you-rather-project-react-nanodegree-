import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleAddAnswer } from '../actions/questions'
import { Redirect } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import FormCheck from 'react-bootstrap/FormCheck'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Media from 'react-bootstrap/Media'


class FullQuestionCard extends Component {
    state = {
        ChosenAnswer: ''
    }
    SaveChoice(e) {
        e.preventDefault()

        const { dispatch, authedUser, id  } = this.props
        const { ChosenAnswer } = this.state
    
        dispatch(handleAddAnswer({
          qid:id,
          authedUser,
          answer: ChosenAnswer,
        }))
    }
    chooseAnswer(answer) {
        this.setState((prevState) => {
            return {ChosenAnswer: answer}
        })
    }
    render() {

        const { question, ChoiceOne, ChoiceTwo, author, authedUser, answered, answer, ChoiceOneVotes, ChoiceTwoVotes, TotalVotes, ChoiceOnePercentage, ChoiceTwoPercentage } = this.props;
        const { selectedAnswer } = this.state;

        if (!question) {
            return <Redirect to="/404"/>
        }
        
        return (
           <> <>
            {answered ? (
                <><Card style={{width:"70%",borderRadius:"15px"}}>  
                <Card.Header>
                <Media>
                    <img
                    width={"15%"}
                    height={"15%"}
                    className="align-self-start mr-3"
                    src={`/${author.avatarURL}`}
                    alt="Generic placeholder"/> 
                </Media>
                <Card.Title>{author.name} Asks</Card.Title></Card.Header>
                <Card.Body>
                <Card.Title>would you rather</Card.Title>
                    {ChoiceOne.votes.includes(authedUser) ?
                        (<><Card.Text>
                                {ChoiceOne.text} (your choice)
                            </Card.Text>
                            <Card.Text className="text-muted">
									Your choice was chosen by {ChoiceOneVotes} out of {TotalVotes}{' '} users
							</Card.Text>
                            <ProgressBar
                            now={ChoiceOnePercentage}
							label={`${ChoiceOnePercentage}%`}
							variant="info"
                            />
                            <Card.Text>
                                {ChoiceTwo.text}
                            </Card.Text>
                            <Card.Text className="text-muted">
									chosen by {ChoiceTwoVotes} out of {TotalVotes}{' '}
									users
								</Card.Text>
                            <ProgressBar
                              now={ChoiceTwoPercentage}
                              label={`${ChoiceTwoPercentage}%`}
                              variant="info"
                            />                            
                            </>                       
                        )
                        :
                        <>
                          <Card.Text>
                              {ChoiceOne.text}
                          </Card.Text>
                          <ProgressBar
                          now={ChoiceOnePercentage}
                          label={`${ChoiceOnePercentage}%`}
                          variant="info"
                          />
                          <Card.Text>
                              {ChoiceTwo.text} (your choice)
                          </Card.Text>
                          <ProgressBar
                              now={ChoiceTwoPercentage}
                              label={`${ChoiceTwoPercentage}%`}
                              variant="info"
                           />           
                        </>}
                    </Card.Body>                    
                    </Card>
                    </>
                    ) 
                    : 
                    (
                    <Card style={{width:"70%",borderRadius:'15px'}}>
                        <Card.Header>
                        <Media>
                        <img
                        width={"15%"}
                        height={"15%"}
                        className="align-self-start mr-3"
                        src={`/${author.avatarURL}`}
                        alt="Generic placeholder"/> 
                        </Media><Card.Title>{author.name} Asks</Card.Title>
                        </Card.Header>
                        <Card.Body style={{}}>
                            <Card.Title>would you rather:</Card.Title>
                            <Form style={{}} onSubmit={(e) => this.SaveChoice(e)}
								ref={(f) => (this.form = f)}
                            >
                            <Form.Check
                                custom
                                type="radio"
                                id="ChoiceOne"
                                label={ChoiceOne.text}
                                value="optionOne" 
                                name="answer"
                                className="mb-2"
                                onClick={(e) => { this.chooseAnswer('optionOne')}}
                            />
                            <Form.Check
                                custom
                                type="radio"
                                id="ChoiceTwo"
                                label={ChoiceTwo.text}
                                value="optionTwo"
                                name="answer"
                                className="mb-2"
                                onClick={(e) => { this.chooseAnswer('optionTwo')}}
                            />
                            <Button type="submit" variant="primary">
                                submit choice
                            </Button>
                            </Form>
                        </Card.Body>

                    </Card>
                )}</>
                </>
            
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, { match }) {
    const { id } = match.params
    const question = questions[id]
    const ChoiceOne = question ? question.optionOne : null
    const ChoiceTwo = question ? question.optionTwo : null
    const author = question ? users[question.author] : null
    const answered = question ? (ChoiceOne.votes.indexOf(authedUser) > -1 || ChoiceTwo.votes.indexOf(authedUser) > -1) : false
    const ChoiceOneVotes = (question && ChoiceOne.votes) ? ChoiceOne.votes.length : 0
    const ChoiceTwoVotes = (question && ChoiceTwo.votes) ? ChoiceTwo.votes.length : 0
    const TotalVotes = ChoiceOneVotes + ChoiceTwoVotes
    const ChoiceOnePercentage = ((ChoiceOneVotes / TotalVotes)*100).toFixed(1)
    const ChoiceTwoPercentage = ((ChoiceTwoVotes / TotalVotes)*100).toFixed(1)
    const answer = users[authedUser].answers[id]
  
    return {
        id,
        authedUser,
        question,
        ChoiceOne,
        ChoiceTwo,
        author,
        authedUser,
        answered,
        answer,
        ChoiceOneVotes,
        ChoiceTwoVotes,
        TotalVotes,
        ChoiceOnePercentage,
        ChoiceTwoPercentage
    }
}

export default connect(mapStateToProps)(FullQuestionCard);