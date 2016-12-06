import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, hashHistory } from 'react-router';
import jQuery from 'jquery';

import Layout from './layout/layout';
import SurvivorListPage from './pages/survivor-list';
import ReportsPage from './pages/reports';
import SurvivorPage from './pages/survivor';


const app = (
	<Router history={hashHistory}>
		<Redirect from="/" to="/list" />
		<Route path="/" component={Layout}>
			<Route path="list" component={SurvivorListPage} />
			<Route path="reports" component={ReportsPage} />
			<Route path="survivor/:id" component={SurvivorPage} />
		</Route>
	</Router>
)

jQuery(function() {
	ReactDOM.render(
		app,
		document.getElementById('zssn-app')
	)
})
