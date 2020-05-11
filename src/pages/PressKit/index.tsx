import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

// components
import PressKitListPage from "./List";
import PressKitCretePage from "./Create";
import PressKitEditPage from "./Edit";
import PressKitDetailPage from "./Detail";
import PressKitArchivePage from "./Archive";

type PageProps = {} & RouteComponentProps<{}>;

const PressKitPage: React.FC<PageProps> = props => {

    return (
        <>
            <Switch>
                <Route exact={true} path="/press_kit/" component={PressKitListPage} />
                <Route exact={true} path="/press_kit/:group/create/" component={PressKitCretePage} />
                <Route exact={true} path="/press_kit/:group/detail/:id/" component={PressKitDetailPage} />
                <Route exact={true} path="/press_kit/:group/detail/:id/edit/" component={PressKitEditPage} />
                <Route exact={true} path="/press_kit/:groupId/archive/" component={PressKitArchivePage} />
            </Switch>
         </>
    );
}

export default PressKitPage;
