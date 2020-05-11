import React, { ReactNode } from "react";
import Progress from "../../../components/Common/Progress";

//style
import style from "./panel_page_layout.module.scss";
import { Box } from "@material-ui/core";
import Logo from "../../../assets/logo_white.svg";

export interface Props {
	children: ReactNode
}

const PanelPageLayout: React.FC<Props> = ({children}) => {

	return (
		<div className={style.root}>
			<Progress/>
			<Box className={style.frame}>
				<img src={Logo} className={style.logo}/>
				<div className={style.main}>
					{children}
				</div>
			</Box>
		</div>
	);
}
export default PanelPageLayout;
