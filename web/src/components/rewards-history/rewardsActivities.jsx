import React from 'react'
import { withRouter } from 'react-router';

import { Link } from 'react-router-dom';
import AppliedRoute from '../AppliedRoute';

import ReceivedHistory from './received-history.jsx'
import SentHistory from './sent-history.jsx'
import ApprovalsRejectionsHistory from './approvals-rejections-history.jsx'

import '../../styles/history.css'
import '../../styles/rewards-activities.css'
import '../../styles/tab-controls.css'

/*
Notes to Maddie:
- we will have to change state or something with the buttons (make prettier later) to filter which table shows
- we need to determine best way to get the actual employee name rather than the ID in the reward table. I don't know solution yet.
- I did not start the approvals table
*/

class RewardsActivities extends React.Component {
    componentDidMount(){
        if(!this.props.isAuthenticated){
            alert('Login In');
            this.props.history.push("/login");
        }
    }

    render() {
        const { location, rewards: { approvals, sent, received } } = this.props;
        
        return (
            <div className="Rewards_Activities">
                <h1>Rewards Activities</h1>
                <div className="TabControls">
                    <ul>
                        <li className={location.pathname === '/rewards_activities/received' ? 'active': ''}>
                            <Link to={`/rewards_activities/received`}>Received</Link>
                        </li>
                        <li className={location.pathname === '/rewards_activities/sent' ? 'active': ''}>
                            <Link to={`/rewards_activities/sent`}>Sent</Link>
                        </li>
                        <li className={location.pathname === '/rewards_activities/approvals_rejections' ? 'active': ''}>
                            <Link to={`/rewards_activities/approvals_rejections`}>Approvals &amp; Rejections</Link>
                        </li>
                    </ul>
                </div>
                <div className="Sidebar-Content">
                    <AppliedRoute path='/rewards_activities/received' component={ReceivedHistory} props={{rewards: received}}/>
                    <AppliedRoute path='/rewards_activities/sent' component={SentHistory} props={{rewards: sent}}/>
                    <AppliedRoute path='/rewards_activities/approvals_rejections' component={ApprovalsRejectionsHistory} props={{rewards: approvals}}/>
                </div>
            </div>
        )
    }
}
export default withRouter(RewardsActivities)