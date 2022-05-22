import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import QuestionOverviewCard from './QuestionOverviewCard'

class Dashboard extends Component {
    state = {
        showAnsweredQuestions: false
    }
    filterQuestions = (showAnsweredQuestions) => {
        this.setState((state) => {
            return { showAnsweredQuestions: showAnsweredQuestions }
        })       
    }
    render() {
        const { showAnsweredQuestions } = this.state;
        const { questions, authedUser } = this.props
        const questionsList = Object.values(questions)
        const QuestionFilter = questionsList.filter(function(question) {
            const Includes = (
                question.optionOne.votes.indexOf(authedUser) > -1 ||
                question.optionTwo.votes.indexOf(authedUser) > -1
            );
            return showAnsweredQuestions ? Includes : !Includes;
        });
        const sortedQuestions = QuestionFilter.sort((a, b) => b.timestamp - a.timestamp);
        return (
            <div>
                <div className="btn-group">
                    <button className={ !showAnsweredQuestions ? 'actv-btn' : 'def-btn'} onClick={(e) => this.filterQuestions(false)}>Unanswered Questions</button>
                    <button className={ showAnsweredQuestions ? 'actv-btn' : 'def-btn'} onClick={(e) => this.filterQuestions(true)}>Answered Questions</button>
                </div>
                <ul className="questions-list">
                    {sortedQuestions.map((question) => (
                        <li key={question.id}>
                            
                            <QuestionOverviewCard id={question.id}/>
                            
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps( { questions, authedUser }) {
    return {
        authedUser,
        questions,
    }
}

export default connect(mapStateToProps)(Dashboard);