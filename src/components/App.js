import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard';
import Login from './Login'
import FullQuestionCard from './FullQuestionCard'
import Leaderboard from './Leaderboard'
import Navigation from './NavigationBar'
import '../App.css';
import CreateNewQuestion from './CreateNewQuestion';
import ProtectedRoute from './ProtectedRoute'
import PageNotFound from './PageNotFound'

class App extends Component {
  	componentDidMount() {
    	this.props.dispatch(handleInitialData())
	}

	render() {
		return (
			<Router>
			<Fragment>
			<div className='container'>
				<Navigation />
				<div className="main-content"> 
					<div className="main-after">
					<Switch>
					<Route path="/" exact component={Login}/>
						<ProtectedRoute path='/dashboard' exact component={Dashboard} />
						<ProtectedRoute path='/add' exact component={CreateNewQuestion} />
						<ProtectedRoute path='/question/:id' component={FullQuestionCard} />
						<ProtectedRoute path='/leaderboard' component={Leaderboard} />
						<ProtectedRoute path="/404" exact component={PageNotFound} />
					</Switch>
					</div>
				</div>							
		    </div>
			</Fragment>
			</Router>
		)
	}
}

export default connect()(App);
