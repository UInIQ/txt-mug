import React from 'react';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    render() {
        return(
            <div>
            <div>Settings Page</div>
            <div>Change Password:<br />
            <form onSubmit={this.handleSubmit.bind(this)}>
            Current password:<input type="password" id="old_password"></input>
            New Password:<input type="password" id="password"></input>
            Re-enter:<input type="password" id="password2"></input>
            <input type="submit"/>
            </form></div>
            </div>
        );
    }

    handleSubmit(event) {
        console.log(event)
        event.preventDefault();
        //FIX: add password structure requirements validation
        if (event.target.elements.namedItem('password').value != event.target.elements.namedItem('password2').value) {
            alert('password values must match');
            event.target.elements.namedItem('password').value='';
            event.target.elements.namedItem('password2').value='';
        } else {
            let data = {}
            data.password = event.target.elements.namedItem('password').value;
            data.old_password = event.target.elements.namedItem('old_password').value;

            let xhttp = new XMLHttpRequest();
            xhttp.open("PUT", "/password", true);
            xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
            
            xhttp.onload = function(e) {
                if (xhttp.readyState ===4 && xhttp.status === 200) {
                    console.log('password update success');
                    this.props.history.push('/dashboard')
                } else if (xhttp.readyState ===4 && xhttp.status === 400) {
                    alert('bad data entered. try again.')
                    event.target.elements.namedItem('old_password').value='';
                    event.target.elements.namedItem('password').value='';
                    event.target.elements.namedItem('password2').value='';
                }
            }.bind(this);

            xhttp.onerror = function(e) {
                console.error(xhttp.statusText)
            }.bind(this);

            xhttp.send(JSON.stringify(data));
        }
        event.persist();
        event.preventDefault();
    }
}
export default Settings;