// prettier-ignore
import React, { useEffect } from "react";
import ReactGA from 'react-ga';
import { withWidth } from "@material-ui/core";
import { connect, useDispatch, useSelector } from "react-redux";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { ConnectedRouter, push } from "connected-react-router";
import { history } from "./configureStore";

import Routes from "./Routes";
import AppRoutes from "./AppRoutes";
import withRoot from "./withRoot";
import SignInPage from "./pages/Sign/SignIn";
import SignUpPage from "./pages/Sign/SignUp";
import SignUpActivatePage from "./pages/Sign/SignUpActivate";
import SignUpTemporaryPage from "./pages/Sign/SignUpTemporary";
import HelpFab from "./components/Common/HelpFab";

import './app.module.scss';
import { RootState } from "./reducers";
import InitialSetting from "./pages/InitialSetting";
const routerSelector = (state: RootState) => state.router;


interface Props extends RouteComponentProps<void> {}
const App: React.FC<Props> = () => {

	const router = useSelector(routerSelector);
	const dispatch = useDispatch();
	useEffect(()=> {
		ReactGA.initialize('UA-156316749-3');
		ReactGA.pageview(window.location.pathname + window.location.search);
	}, [router.location]);

	return (
		<ConnectedRouter history={history}>
			<Switch>
				<Route exact={true} path="/sign_in" component={SignInPage}/>
				<Route exact={true} path="/sign_up" component={SignUpPage}/>
				<Route exact={true} path="/activate/:id" component={SignUpActivatePage}/>
				<Route exact={true} path="/sign_up/temporary/" component={SignUpTemporaryPage}/>
				<Route exact={true} path="/sign_up/invite/:id" component={SignUpTemporaryPage}/>
				<Route exact={true} path="/unsubscribe_mail" component={Routes}/>
				<Route exact={true} path="/terms" component={Routes}/>
				<Route path="/help" component={Routes}/>
				<Route path="/" component={AppRoutes}/>
			</Switch>
		</ConnectedRouter>
	);
}

export default connect(null)(withRoot(withWidth()(App)));
