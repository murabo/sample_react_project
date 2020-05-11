import React, {useEffect, useState} from "react";

import { RouteComponentProps } from "react-router-dom";

// components
import AppLayout from "../../components/Layout/App";
import List from "../../components/PressKit/List/";

type PageProps = {} & RouteComponentProps<{}>;

const ArchivePage: React.FC<PageProps> = props => {

    return (
		<AppLayout>
            <List archive={true}/>
		</AppLayout>
    );
}


export default ArchivePage;
