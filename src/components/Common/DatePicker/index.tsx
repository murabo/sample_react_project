import React from "react";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { Japanese } from "flatpickr/dist/l10n/ja";
import dayjs from "dayjs";

import { Box, Typography } from "@material-ui/core/";

import "./datepicker.module.scss";
import {makeStyles} from "@material-ui/core/styles";


const now = new Date();
now.setDate(now.getHours() + 3);
now.setMinutes(0);

const tommorow = new Date();
tommorow.setDate(tommorow.getDate()+1);
tommorow.setMinutes(0);

const useStyles = makeStyles({
	error: {
		marginLeft: 10,
	},
});


const DatePickerSetting = ({ edit, datetime, handleChangeDatetime, isReserve }) => {
	const referenceDate = dayjs(datetime);
	const classes = useStyles();
	let minDate:any = isReserve? tommorow:now;
	minDate = dayjs(minDate).format('YYYY-MM-DD')

	return (
		<>
			{edit ?
				<>
					<Flatpickr data-enable-time
							   value={datetime}
							   options={{
							   	   defaultValue:{datetime},
								   static: true,
								   locale: Japanese,
								   minDate: minDate,
								   enableTime: true,
								   minuteIncrement: 30,
							   }}
							   onChange={handleChangeDatetime}
					/>
					{!datetime && <Typography color={"error"} className={classes.error}>日時を選択してください。</Typography>}
				</>
				: <Typography variant={"h6"}>{referenceDate.format("YYYY年MM月DD日 HH:mm")}</Typography>
			}
		</>
	);
};

export default DatePickerSetting;
