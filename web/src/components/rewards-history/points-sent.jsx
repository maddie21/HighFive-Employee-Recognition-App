import React from 'react';

class PointsSent extends React.Component {
        
    handlePointsSentRow = () => {
    
        return (
            
            <tr data-status="active">
                <td>{this.props.to.first_name + ' ' + this.props.to.last_name}</td>
                <td>{this.props.level.points}</td>
                <td><span className="label label-success">{this.props.status}</span></td>
                <td>{this.props.rewardMsg}</td>
                <td>{new Date(this.props.date).toDateString()}</td>
            </tr>
            
        )    
    }

    render () {
        return (
            <tbody>
                {this.handlePointsSentRow()}
            </tbody>    
        )
    }
    
}

export default PointsSent