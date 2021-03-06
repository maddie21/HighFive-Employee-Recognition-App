import React, { Component } from 'react';
import { withRouter, Switch, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import AppliedRoute from '../AppliedRoute';
import {Container, Row, Col} from 'react-bootstrap';

import Profile from './profile'
import RecentRewards from './recent-rewards'
import Approvals from './approvals'

import '../../styles/overview.css'
import '../../styles/tab-controls.css'

class Overview extends Component {
  componentDidMount(){
    if(!this.props.isAuthenticated){
      alert('Login In');
      this.props.history.push("/login");
    }
    this.props.setCurrentPage('overview');
  }
  render() {
    const { location, rewards: { pending, approved }, approve_request, reject_request, employeeId, pointsAvailable, imgUrl, firstName, lastName, title, department } = this.props;
    return (
      <Container className="overview-container">
        <Row>
          <Col lg={2}></Col>
          <Col lg={3}>
            <Profile employeeId={employeeId} pointsAvailable={pointsAvailable} imgUrl={imgUrl} firstName={firstName} lastName={lastName} title={title} department={department} />
          </Col>
          <Col lg={5} className="Sidebar">
            <div className="TabControls">
              <ul>
                  <li className={location.pathname === '/overview/recent-rewards' ? 'active': ''}>
                      <Link to={`/overview/recent-rewards`}>Recent Rewards</Link>
                  </li>
                  {this.props.isManager &&
                  <li className={location.pathname === '/overview/approval' ? 'active': ''}>
                    <Link to={`/overview/approval`}>Approvals</Link>
                  </li>
                  }
              </ul>
            </div>
            <div className="Sidebar-Content">
              <Switch>
                <AppliedRoute path='/overview/recent-rewards' component={RecentRewards} props={{rewards: approved, employeeId, history: this.props.history, toggleShowConfetti: this.props.toggleShowConfetti, showConfetti: this.props.showConfetti}}/>
                {
                  this.props.isManager &&
                  <AppliedRoute path='/overview/approval' component={Approvals} props={{rewards: pending, approve_request, reject_request}}/>
                }
                <Redirect from="/overview" to="/overview/recent-rewards"/>
              </Switch>
            </div>
            </Col>
            <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Overview);
