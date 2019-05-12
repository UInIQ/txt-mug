import React from 'react';
import Dashboard from 'dashboard.jsx';
import AdminApp from 'admin-app.jsx';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Settings from 'settings.jsx';
import FileImporter from 'file-importer.jsx';

class Home extends React.Component {

    render() {
        return (
          <div>
            <h2>App Home</h2>
          </div>
        );
    }
}

class AdminLink extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isadmin=="True") {
            return(
                <li>
                <Link to="/admin">Admin Functions</Link>
                </li>
            )
        } else {
            return null;
        }
    }
}

class MainApp extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>React Nav Router
                <ul>
                    <li>
                    <Link to="/">Home</Link>
                    </li>
                    <li>
                    <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <AdminLink isadmin={this.props.isadmin} />
                    <li>
                    <Link to="/import">Import Images</Link>
                    </li>
                    <li>
                    <Link to="/settings">Settings</Link>
                    </li>
                    <li>
                    <Link to="/logout">Logout</Link>
                    </li>
                </ul>
                <hr />
                <Route exact path="/" component={Home} />
                <Route
                    path="/dashboard"
                    render={() => <Dashboard apiroot={this.props.apiroot} />}
                />
                <Route path="/admin" component={AdminApp} />
                <Route path="/logout" component={() => { window.location = '/logout'; return null;} }/>
                <Route path="/settings" component={Settings} />
                <Route
                    path="/import"
                    render={() => <FileImporter apiroot={this.props.apiroot} />}
                />
                </div>
            </Router>
        );
    }
}
  
export default MainApp;