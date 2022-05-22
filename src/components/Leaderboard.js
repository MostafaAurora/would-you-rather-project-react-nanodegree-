import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'

class Leaderboard extends Component {
    render() {
        const {users} = this.props
        const SortedUsers = users.sort( (a, b) => b.totalScore - a.totalScore)

        return (
            <ul className="Leaderboard-list">
            {SortedUsers.map((user) => (
                <li key={user.id}>
                  <Card variant="Success" style={{width:"90%", borderRadius:"15px"}}>
                    <Card.Header>
                    <Card.Title>{user.name}</Card.Title>
                    </Card.Header>
                    <Card.Img variant="top" src={`/${user.avatarURL}`} />
                    <Card.Body>
                    <Card.Title>Total score: {user.totalScore}</Card.Title>
                    <Card.Title>Answered questions: {Object.keys(user.answers).length}</Card.Title>
                    <Card.Title>Authored questions: {user.questions.length}</Card.Title>                       
                    </Card.Body>                      
                  </Card>                   
                </li>
            ))}
            </ul>
        )
    }
}

function mapStateToProps( { users }) {
    const usersList = Object.values(users)
    usersList.map( (user) => user.totalScore = Object.keys(user.answers).length + user.questions.length )
    return {
        users: usersList
    }
}

export default connect(mapStateToProps)(Leaderboard);