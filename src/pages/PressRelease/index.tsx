import React, { useEffect } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

// components
import PressReleaseListPage from "./List";
import PressReleaseCretePage from "./Create";
import PressReleaseEditPage from "./Edit";
import PressReleaseDiffPage from "./Diff";
import PressReleaseCheckPage from "./Check";
import PressReleaseReviewPage from "./Review";
import PressReleaseDetailPage from "./Detail";
import PressReleasePublicPage from "./Public";
import PressReleaseReservePage from "./Reserve";
import PressReleaseArchivePage from "./Archive";

type PageProps = {} & RouteComponentProps<{}>;

const PressReleasePage: React.FC<PageProps> = props => {

    return (
        <>
            <Switch>
                <Route exact={true} path="/press_release/" component={PressReleaseListPage} />
                <Route exact={true} path="/press_release/:groupId/create/" component={PressReleaseCretePage} />
                <Route exact={true} path="/press_release/:groupId/detail/:pressReleaseId/" component={PressReleaseDetailPage} />
                <Route exact={true} path="/press_release/:groupId/detail/:pressReleaseId/edit/" component={PressReleaseEditPage} />
                <Route exact={true} path="/press_release/:groupId/detail/:pressReleaseId/review/" component={PressReleaseReviewPage} />
                <Route exact={true} path="/press_release/:groupId/detail/:pressReleaseId/check/" component={PressReleaseCheckPage} />
                <Route exact={true} path="/press_release/:groupId/diff/:pressReleaseId/:historyId/" component={PressReleaseDiffPage} />
                <Route exact={true} path="/press_release/:groupId/reserve/:pressReleaseId/" component={PressReleaseReservePage} />
                <Route exact={true} path="/press_release/:groupId/archive/" component={PressReleaseArchivePage} />
                <Route exact={true} path="/press_release/:groupId/public/" component={PressReleasePublicPage} />
            </Switch>
         </>
    );
}

export default PressReleasePage;
