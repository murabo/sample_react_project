import React, { ReactNode } from "react";

//style
import style from "./panel_layout.module.scss";

// img
import Logo from "../../../assets/logo.svg";
import ImgPr from "../../../assets/img_pr.svg";
import { Box } from "@material-ui/core";

export interface Props {
	children: ReactNode
}

const PanelLayout: React.FC<Props> = ({children}) => {

	return (
		<div className={style.root}>
			<Box className={style.frame}>
				<div className={style.side}>
					<img src={Logo} className={style.logo}/>
					<img src={ImgPr} className={style.mainImg}/>
				</div>
				<div className={style.main}>
					{children}
				</div>
			</Box>
		</div>
	);
}
export default PanelLayout;



