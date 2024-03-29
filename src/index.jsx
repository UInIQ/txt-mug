"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app.jsx';
import * as serviceWorker from './serviceWorker';
import { strict } from 'assert';

ReactDOM.render(<App {...(app.dataset)}/>, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();