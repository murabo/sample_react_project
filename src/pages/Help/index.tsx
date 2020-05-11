import React from "react";
import {Route, RouteComponentProps, Switch} from "react-router-dom";

import Menu from "../../components/Help/Menu";
import Start from "../../components/Help/Start";
import List from "../../components/Help/List";
import PressRelease from "../../components/Help/PressRelease";
import Send from "../../components/Help/Send";
import Media from "../../components/Help/Media";
import Member from "../../components/Help/Member";
import Flow from "../../components/Help/Flow";
import PressKit from "../../components/Help/PressKit";
import {makeStyles} from "@material-ui/styles";
import {Box, Theme, Typography} from "@material-ui/core";

interface Props extends RouteComponentProps<void> {
}

const Help: React.FC<Props> = () => {

    return (
        <>
            <Switch>
                <Menu>
                    <Route exact={true} path="/help/" component={List}/>
                    <Route exact={true} path="/help/start" component={Start}/>
                    <Route exact={true} path="/help/flow" component={Flow}/>
                    <Route exact={true} path="/help/press_release" component={PressRelease}/>
                    <Route exact={true} path="/help/send" component={Send}/>
                    <Route exact={true} path="/help/press_kit" component={PressKit}/>
                    <Route exact={true} path="/help/media" component={Media}/>
                    <Route exact={true} path="/help/member" component={Member}/>
                </Menu>
            </Switch>
        </>
    );
}

export default Help;
