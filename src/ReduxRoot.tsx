import * as React from "react";
import { Provider } from "react-redux";
import App from "./App";
import configureStore, { history } from './configureStore'

export const appStore = configureStore();

function ReduxRoot() {
	return (
		<Provider store={appStore}>
			<App/>
		</Provider>
	);
}

export default ReduxRoot;
