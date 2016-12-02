
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect } from 'react-router';
import jQuery from 'jquery';

import Layout from './layout/layout';
import Survivor from './components/survivor';
import SurvivorListPage from './pages/survivor-list';


const app = (
	<Router>
		<Redirect from="/" to="/list" />
		<Route path="/" component={Layout} >
			<Route path="list" component={SurvivorListPage} />
		</Route>
	</Router>
)

jQuery(function() {
	ReactDOM.render(
		app,
		document.getElementById('zssn-app')
	)
})
