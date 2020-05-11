import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// style
import style from "./create_dialog_design.module.scss";

const useStyles = makeStyles({
	button: {
		width: "16rem",
		height: "20.6rem",
		display: "block",
		borderRadius: "0.6rem",
	},
	active: {
		background: "#E3F5EA",
	},
});

const array:string[] = []

for (let i = 0; i < 8; i++) {
	array.push('')
}

export default function Design({ type, handleChange }) {
	const classes = useStyles();
	return (
		<>
			<ul className={style.actions}>
				{array.map(( value, index ) => {
					const img = require( `../../../../../assets/layout/img_design_${index}.svg`)
					return <li key={index}>
							<Button className={classNames(classes.button, type === index ? style.active : "")}
									onClick={() => handleChange(index)}>
								<img src={img} className={style.img}/>
							</Button>
							</li>
				})}
			</ul>
		</>
	);
}
