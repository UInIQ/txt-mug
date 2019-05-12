import React, { Component } from 'react';
import ImageStatusChart from './imageStatusChart.jsx';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = { updateFreq: 5 };
        this.handleFreqChange = this.handleFreqChange.bind(this);
    }

    render() {
        return (
            <div>
                Update Frequency: <select value={this.state.updateFreq} onChange={this.handleFreqChange}>
                    <option value='5'>5 seconds</option>
                    <option value='10'>10 seconds</option>
                    <option value='60'>60 seconds</option>
                </select>
                <ImageStatusChart updateFreq={this.state.updateFreq} apiroot={this.props.apiroot}/>
            </div>
        )
    }


    handleFreqChange(event) {
        this.setState(
            {updateFreq : event.target.value}
        );
    }
}
export default Dashboard;