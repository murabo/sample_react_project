import { Switch, Route } from "react-router";
import * as React from "react";

// page
import AlertDialog from "./components/Common/AlertDialog";
import HelpLayout from "./components/Layout/Help";
import Help from "./pages/Help";
import Terms from "./pages/Terms";
import UnsubscribeMail from "./pages/UnsubscribeMail";

export default function Routes() {

	return (
		<>
			<HelpLayout>
				<AlertDialog/>
				<Switch>
					<Route path="/terms" component={Terms}/>
					<Route path="/help" component={Help}/>
					<Route path="/unsubscribe_mail" component={UnsubscribeMail}/>
				</Switch>
			</HelpLayout>
		</>
	);
}
