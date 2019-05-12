//ImageStatusChart component

import React, { Component } from 'react';
import ReactInterval from 'react-interval';

class ImageStatusChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            enabled: false,
            timeout: this.props.updateFreq*1000,
            count: 0
        }
    }

    componentWillMount(){
        this.fetchData();
        if (this.state.timeout > 0) {
            this.setState ({
                enabled: true
            })
        }
    }
    
    componentDidMount() {
        //this.interval = setInterval(() => this.fetchData(), (this.props.updateFreq * 1000));
    }

    componentWillUnmount() {
        //clearInterval(this.interval);
    }

    fetchData() {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", this.props.apiroot + '/images/counts', true);
        xhttp.onload = function(e) {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                const count = this.state.count + 1
                this.setState({
                    imageCounts: xhttp.response,
                    isLoaded: true,
                    count: count
                })
            } else {
                this.setState({
                    isLoaded: false
                })
            }
        }.bind(this)
        
        xhttp.onerror = function(e) {
            console.error(xhttp.statusText);
        }.bind(this)

        xhttp.responseType = 'json';
        xhttp.send(null);
    }

    render() {
        const {enabled, count} = this.state;
        
        if (this.state.isLoaded===true) {

            let labels=[];
            let values=[];

            this.state.imageCounts.map((obj) => {
                labels.push(obj.status);
                values.push(obj.count);
            })

            return (
            <div>
                <div>
                    <h3>Image Status Counts</h3>
                    Data:<br/>
                    Labels: {labels.toString()}<br/>
                    Values: {values.toString()}
                </div>
                <div>
                    <ReactInterval 
                        timeout={this.props.updateFreq*1000}
                        enabled={this.state.enabled}
                        callback={() => this.fetchData()} />
                </div>
            </div>)

        } else {
            return (
                <div>didn't work</div>
            )
        }
    }
}

export default ImageStatusChart;