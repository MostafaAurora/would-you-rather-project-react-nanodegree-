import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from 'react-bootstrap/Nav';
import Media from 'react-bootstrap/Media'

    
class NavigationBar extends Component {
    render() {
        const { user, authedUser } = this.props
        const avatar = user ? user.avatarURL : 'placeholder.png'
        const name = user ? user.name : ''
        return (
        <Navbar bg="light" variant="light" style={{fontStyle:"italic",fontWeight:"bold"}}>
            <Nav className="mr-auto">
            <Container>
                    <Nav.Link as={NavLink} to='/dashboard' exact >
                    <Container>
                        Home
                        <Media>
                        <img
                        width={40}
                        height={40}
                        className="align-self-start mr-3"
                        src="https://www.rawshorts.com/freeicons/wp-content/uploads/2017/01/blue_repicthousebase_1484336386-1.png"
                        alt="Generic placeholder"
                        />   
                        </Media>
                        </Container>
                        
                    </Nav.Link>
                
                    <Nav.Link as={NavLink} to='/add' exact activeClassName='active'>
                        <Container>
                        New Question
                        <Media>
                        <img
                        width={40}
                        height={40}
                        className="align-self-start mr-3"
                        src="https://www.pngitem.com/pimgs/m/391-3914295_brain-light-bulb-png-transparent-png.png"
                        alt="Generic placeholder"
                        />   
                        </Media>
                        </Container>

                    </Nav.Link>
                
                    <Nav.Link as={NavLink} to='/leaderboard' exact activeClassName='active'>
                    <Container>
                        Leader Board
                        <Media>
                        <img
                        width={45}
                        height={45}
                        className="align-self-start mr-3"
                        src="https://w7.pngwing.com/pngs/442/579/png-transparent-yellow-trophy-material-design-polymer-mobile-app-android-leaderboard-hd-icon-miscellaneous-user-interface-design-logo-thumbnail.png"
                        alt="Generic placeholder"
                        />   
                        </Media>
                        </Container>
                    </Nav.Link>
                
                {
                    authedUser
                    &&                            
                    <div className="nav-user">
                        <span>Hello {name}</span>
                        <img
                        src={avatar}
                        alt={`Avatar of ${authedUser}`}
                        className='nav-avatar'
                        />
                        <Nav.Link as={NavLink} to='/' exact activeClassName='active'>
                        <Button variant="danger " style={{width:"150px"}}>Logout</Button>
                        </Nav.Link>
                    </div>        
                }
                </Container>
            </Nav>
            </Navbar>   
    )
    }
}

function mapStateToProps( { authedUser, users}, props) {
    return {
        authedUser,
        users,
        user: users[authedUser]
    }

}
export default connect(mapStateToProps)(NavigationBar)