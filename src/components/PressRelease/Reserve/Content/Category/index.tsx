import React, { useEffect } from "react";

// component
import { Button, Chip, FormControl, makeStyles, Select, Typography } from "@material-ui/core/";

import { pressReleaseType } from "../../../../../config/press_release_type";
import { pressReleaseTag } from "../../../../../config/press_release_tag";
import { useSelector } from "react-redux";

import { RootState } from "../../../../../reducers";
import DoneIcon from "@material-ui/core/SvgIcon/SvgIcon";
import style from "../../../Common/CategoryDialog/share_dialog.module.scss";
import AppDialog from "../../../../Common/AppDialog";
import { ListModel } from "../../../../../model/ListModel";
const pressReleaseReserveSelector = (state: RootState) => state.pressReleaseReserve;
const pressReleaseSelector = (state: RootState) => state.pressRelease;

const useStyles = makeStyles({
	root: {
		display: "flex",
		alignItems: "center",
		marginBottom: 10
	},
	label: {
		padding: 10,
		background: "#fff",
		borderRadius: 3,
		border: "1px solid #ddd"
	},
	category: {
		padding: 10,
		display: 'flex'
	},
	chip: {
		margin: 5
	}
});


interface IProps {
	handleOpenDialog
}


const Category: React.FC<IProps> = ({handleOpenDialog}) => {
	const classes = useStyles();
	const reserve = useSelector(pressReleaseReserveSelector);
	const pressRelease = useSelector(pressReleaseSelector);
	const [type, setType] = React.useState('');
	const [dialog, setDialog] = React.useState(false);

	useEffect(() => {
		const data = pressReleaseType.map( (category, num) => {
			category.sub.map(item => {
				if (item.id === Number(reserve.data.type)) {
					setType(item.label)
					return item
				}
			})
		});
	}, [reserve.data.fetched, reserve.data.type]);

	return (
		<div className={classes.root}>

			{reserve.data.type &&
				<Typography variant="h6" className={classes.label}>
					{type}
				</Typography>
			}

			{reserve.data.categories.length > 0 &&
				<ul className={classes.category}>
					{reserve.data.categories.map((tag, index) => {
						const target = pressReleaseTag.filter(item => item.id === Number(tag))
						return <li key={index} className={classes.chip}>
							{target.length &&
							<Chip
								variant={"outlined"}
								color={"primary"}
								label={target[0].label}
							/>
							}
						</li>

					})}
				</ul>
			}

			{!type &&
				<>
					<Button variant="contained" color="primary" size={"small"} onClick={() => handleOpenDialog()}>
						設定
					</Button>
					<Typography color={"error"}>カテゴリ・種別を設定してください。</Typography>
				</>
			}

			{pressRelease.detail.status < 8 && type &&
				<Button variant="outlined" color="primary" size={"small"} onClick={() => setDialog(true)}>
					設定
				</Button>
			}

			<AppDialog isOpen={dialog} closeHandle={()=>setDialog(false)} mainHandle={()=>{
				setDialog(false)
				handleOpenDialog()
			}} text='自動選定送信先が変更になりますがよろしいですか？' ButtonText="再設定"/>
		</div>
	);
};
export default Category;
