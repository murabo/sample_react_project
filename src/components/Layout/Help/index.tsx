import React, { ReactNode } from "react";

//style
import style from "./help_layout.module.scss";

// img
import Logo from "../../../assets/logo.svg";
import LogoPowerdBy from "../../../assets/logo_powerdby.svg";
import { NavLink } from "react-router-dom";

export interface Props {
	children: ReactNode
}

const HelpLayout: React.FC<Props> = ({ children }) => {

	return (
		<>
			<header className={style.header}>
				<div className={style.inner}>
					<NavLink exact to={`/`}>
						<div className={style.inner}>
							<img src={Logo} className={style.logo}/>
						</div>
					</NavLink>
				</div>
			</header>
			<div className={style.contents}>
				<div className={style.inner}>
					{children}
				</div>
			</div>
			<footer className={style.footer}>
				<img src={LogoPowerdBy}/>
			</footer>
		</>
	);
};
export default HelpLayout;



