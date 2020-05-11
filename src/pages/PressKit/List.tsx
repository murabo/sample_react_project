import React from "react";
import { RouteComponentProps } from "react-router-dom";

// components
import AppLayout from "../../components/Layout/App";
import PressKitList from "../../components/PressKit/List";
import CreateDialog from "../../components/PressKit/Create/CreateDialog";
import style from "../../components/Menu/menu.module.scss";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
const companySelector = (state: RootState) => state.company;

type PageProps = {} & RouteComponentProps<{}>;

const PressKitCreatePage: React.FC<PageProps> = props => {

	const company = useSelector(companySelector);

    return (
		<AppLayout>
            <PressKitList/>
		</AppLayout>
    );
}

export default PressKitCreatePage;
