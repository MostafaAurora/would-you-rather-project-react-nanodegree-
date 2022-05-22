import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Media from 'react-bootstrap/Media'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

class QuestionOverviewCard extends Component {
    render() {
        const { question, author, id } = this.props;
        return (           
                <Card style={{width:"90%",borderRadius:"15px"}}>
                <Card.Header>                   
                    {author.name} asks</Card.Header>
                    <Card.Body>
                    <Media>
                        <img
                        width={"15%"}
                        height={"15%"}
                        className="align-self-start mr-3"
                        src={`/${author.avatarURL}`}
                        alt="Generic placeholder"/> 
                        </Media>
                    <Card.Title>Would you rather</Card.Title>
                    <Card.Text>{question.optionOne.text}...</Card.Text>
                    <Link to={`question/${id}`}>
                    <Button variant= "primary">view full question</Button>    
                    </Link>
                    </Card.Body>
                </Card>   
            )
    }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
    const question = questions[id]
    const author = question ? users[question.author] : null
  
    return {
        authedUser,
        question,
        author
    }
}

export default connect(mapStateToProps)(QuestionOverviewCard);