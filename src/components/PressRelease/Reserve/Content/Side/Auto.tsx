import React from "react";
import { useDispatch, useSelector } from "react-redux";

// component
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Divider, IconButton, Menu, MenuItem, Checkbox, makeStyles, DialogContent } from "@material-ui/core";

// action
import * as ActionCreators from "../../../../../actions/PressReleaseReserve/ActionCreator";

// state
import {RootState} from "../../../../../reducers";
const pressReleaseReserveSelector = (state: RootState) => state.pressReleaseReserve;


const useStyles = makeStyles({
	text: {
		fontSize: 16,
		fontWeight: 'bold'
	}
});


const Side: React.FC = () => {

	const classes = useStyles();
	const dispatch = useDispatch();
    const reserve = useSelector(pressReleaseReserveSelector);

    const handleListItemClick = () => {
        dispatch(ActionCreators.setPressReleaseReserveActive.request(String(0)));
    };

    const handleChangeSend = () => {
        dispatch(ActionCreators.setPressReleaseReserveAuto.request({is_send: !reserve.data.auto.is_send}));
        // 自動選定on
        if (!reserve.data.auto.is_send) {
			dispatch(ActionCreators.postPressReleaseMediaRecommend.request({categories: reserve.data.categories, type: reserve.data.type}));
		}
    };

    return (
    	<>
			<ListItem
				selected={reserve.active === '0'}
				onClick={handleListItemClick}>
				<ListItemText
					classes={{ primary: classes.text, secondary:  classes.text}}
					primary="自動選定"
					secondary={`${reserve.data.auto.id_list.length}件`}
				/>
				<ListItemSecondaryAction>
					<Checkbox
						onChange={handleChangeSend}
						checked={Boolean(reserve.data.auto.is_send)}
						color="primary"
					/>
				</ListItemSecondaryAction>
			</ListItem>
			<Divider/>
		</>
	);
}

export default Side;


