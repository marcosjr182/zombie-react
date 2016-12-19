import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux'
import jQuery from 'jquery';

import Layout from './layout/layout';
import SurvivorListPage from './pages/survivor-list';
import ReportsPage from './pages/reports';
import SurvivorPage from './pages/survivor';
import TradePage from './pages/trade';
import store from './store';

const history = syncHistoryWithStore(hashHistory, store);

const app = (
	<Provider store={store}>
		<Router history={history}>
			<Redirect from="/" to="/list" />
			<Route path="/" component={Layout}>
				<Route path="list" component={SurvivorListPage} />
				<Route path="reports" component={ReportsPage} />
				<Route path="survivor/:id" component={SurvivorPage} />
				<Route path="trade/:id" component={TradePage} />
			</Route>
		</Router>
	</Provider>
)

jQuery(function() {
	ReactDOM.render(
		app,
		document.getElementById('zssn-app')
	)
})
