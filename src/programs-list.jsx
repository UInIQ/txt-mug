//ProgramsList component

import React, { Component } from 'react';
//import { truncate } from 'fs';

class ProgramsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
                isLoaded: false,
                programs: null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", this.props.apiroot+'/programs', true);
        xhttp.onload = function(e) {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                this.setState({
                    isLoaded: true,
                    programs: xhttp.response
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

    handleChange(event) {
        if (event.target.value!='x') {
            this.props.setProgram(event.target.value);
            return;
        }
    }

    render() {
        if (this.state.isLoaded) {
            
            
            let programsOptions = this.state.programs.programs.map((program, idx) => {
                const fullProgName = program.year + '-' + program.name;
                return (
                    <option key={idx} value={program.id}>{fullProgName}</option>
                )
            });
            
            
            return(
                <div>
                    <div>Programs<br/>
                    Choose a program for the images you are uploading. (All images will be assigned to the same program.)</div>
                    <div>
                        <select onChange={this.handleChange}>
                        <option value='x'>Choose</option>
                            {programsOptions}
                        </select>
                    </div>
                </div>
            )
        }
        return null;
    }
}

export default ProgramsList;