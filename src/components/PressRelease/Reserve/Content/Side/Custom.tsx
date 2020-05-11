import React from "react";
import { useDispatch, useSelector } from "react-redux";

// component
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Checkbox, Divider, Typography, IconButton, makeStyles, Menu, MenuItem } from "@material-ui/core";

//img
import ImageEllipsis from "../../../../../assets/icon_ellipsis.svg";

// style
import style from "./side.module.scss";

// modell
import { ReserveCustomModel } from "../../../../../model/PressReleaseReserveModel";

// action
import * as ActionCreators from "../../../../../actions/PressReleaseReserve/ActionCreator";

// state
import {RootState} from "../../../../../reducers";
const pressReleaseReserveSelector = (state: RootState) => state.pressReleaseReserve;

interface ContentsProps {
	item: ReserveCustomModel,
}


const Side: React.FC<ContentsProps> = ({item}) => {

	const dispatch = useDispatch();
    const reserve = useSelector(pressReleaseReserveSelector);

    const handleListItemClick = () => {
        if (item.id) dispatch(ActionCreators.setPressReleaseReserveActive.request(item.id));
    };

    const handleChangeSend = () => {
        dispatch(ActionCreators.setPressReleaseReserveCustom.request({id:item.id, is_send: !item.is_send}));
    };

    return (
    	<>
			<ListItem
				selected={reserve.active === item.id}
				onClick={handleListItemClick}>
				<ListItemText
					primary={<React.Fragment>
									<Typography component="span" variant="h6">
										{item.name}
									</Typography>
								</React.Fragment>}
					secondary={`${item.last_name || ""} ${item.first_name || ""}`}
				/>
				<ListItemSecondaryAction>
					<Checkbox
						onChange={handleChangeSend}
						checked={Boolean(item.is_send)}
						color="primary"
					/>
				</ListItemSecondaryAction>
			</ListItem>
			<Divider/>
		</>
	);
}

export default Side;


