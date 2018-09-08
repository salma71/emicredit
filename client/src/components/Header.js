import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'

class Header extends Component {
  // console.log(this.props)
  renderContent () {
    switch (this.props.auth) {
      case null:
        return
      case false:
        return <li><a href='/auth/google'>Login With Google</a></li>
      default:
        return [
          <li><Payments /></li>,
          <li><a href='/api/logout'>Logout</a></li>
        ]
    }
  }
  render () {
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link
            // if the user is logged in then go to serveys page
            // otherwise go to the landing page
            to={this.props.auth ? '/surveys' : '/'}
            className='left brand-logo'
          >
            Emicredit
          </Link>
          <ul className='right'>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps ({ auth }) {
  return { auth }
}
export default connect(mapStateToProps)(Header)
