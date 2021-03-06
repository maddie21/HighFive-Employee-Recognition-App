import React from 'react'
import { withRouter } from 'react-router';

import { Link, Switch, Redirect } from 'react-router-dom';
import AppliedRoute from '../AppliedRoute';

import ReceivedHistory from './received-history.jsx'
import SentHistory from './sent-history.jsx'
import ApprovalsRejectionsHistory from './approvals-rejections-history.jsx'

import {Container} from 'react-bootstrap';

import '../../styles/history.css'
import '../../styles/rewards-activities.css'
import '../../styles/tab-controls.css'

class RewardsActivities extends React.Component {
    componentDidMount(){
        if(!this.props.isAuthenticated){
            alert('Login In');
            this.props.history.push("/login");
        }
        this.props.setCurrentPage('rewards_activities');
    }


    render() {
        const { location, rewards: { approvals, sent, received } } = this.props;
        
        return (
            <Container className="rewards-container">
                <div className="TabControls">
                    <ul>
                        <li className={location.pathname === '/rewards_activities/received' ? 'active': ''}>
                            <Link to={`/rewards_activities/received`}>Received</Link>
                        </li>
                        <li className={location.pathname === '/rewards_activities/sent' ? 'active': ''}>
                            <Link to={`/rewards_activities/sent`}>Sent</Link>
                        </li>
                        {
                            this.props.isManager &&
                            <li className={location.pathname === '/rewards_activities/approvals_rejections' ? 'active': ''}>
                                <Link to={`/rewards_activities/approvals_rejections`}>Approvals &amp; Rejections</Link>
                            </li>
                        }
                    </ul>
                </div>
                <div className="Sidebar-Content">
                    <Switch>
                        <AppliedRoute path='/rewards_activities/received' component={ReceivedHistory} props={{rewards: received}}/>
                        <AppliedRoute path='/rewards_activities/sent' component={SentHistory} props={{rewards: sent}}/>
                        {this.props.isManager &&
                            <AppliedRoute path='/rewards_activities/approvals_rejections' component={ApprovalsRejectionsHistory} props={{rewards: approvals}}/>
                        }
                        <Redirect from="/rewards_activities" to="/rewards_activities/received"/>
                    </Switch>
                </div>
            </Container>
        )
    }
}
export default withRouter(RewardsActivities)