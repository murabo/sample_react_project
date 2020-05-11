import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// actions
import * as MemberActionCreators from "../../actions/Member/ActionCreator";
// models
import { MemberModel } from "../../model/MemberModel";

// component
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";

// state
import { RootState } from "../../reducers";
import Avatar from "../Common/Avatar";

import { Divider, Menu, MenuItem } from "@material-ui/core";
import ImageEllipsis from "../../assets/icon_ellipsis.svg";
import AppDialog from "../Common/AppDialog";
import Pagination from "../Common/Pagination";
import PermissionSelect from "../Common/PermissionSelect";

const memberSelector = (state: RootState) => state.member;
const pressGroupSelector = (state: RootState) => state.group;

const CompanyDetail: React.FC = () => {

	const dispatch = useDispatch();
	const member = useSelector(memberSelector);
	const group = useSelector(pressGroupSelector);

	useEffect(() => {
		if (group.selectedId) dispatch(MemberActionCreators.getMemberList.request({offset: 0}));
	}, [group.selectedId]);

	return (
		<div>
			<TableList member={member}/>
		</div>
	);
};

export default CompanyDetail;

const TableList = ({ member }) => {

	const dispatch = useDispatch();
	const handlePageChange = (pageNumber) => {
		dispatch(MemberActionCreators.getMemberList.request({offset: pageNumber}))
	}

	return (
		<section>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell style={{ width: "40px" }}></TableCell>
						<TableCell>名前</TableCell>
						<TableCell>部署</TableCell>
						<TableCell>メールアドレス</TableCell>
						<TableCell>電話番号</TableCell>
						<TableCell>権限</TableCell>
						<TableCell></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{member.list.results.map((row, index) => (
						<List key={index} row={row}/>
					))}
				</TableBody>
			</Table>
			<div>
				{member.list.results.length ?
					<Pagination
						activePage={member.list.offset}
						totalCount={member.list.count}
						handlePageChange={handlePageChange}
					/>
				: null}
			</div>
		</section>
	);
};


interface ListProps {
	row: MemberModel,
}

const List: React.FC<ListProps> = ({ row }) => {

	const dispatch = useDispatch();
	const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDelete = () => {
		dispatch(MemberActionCreators.deleteMember.request(row.uuid));
		setDeleteDialog(false)
	};

	const handleChangePermission = (permission) => {
		dispatch(MemberActionCreators.patchMember.request({uuid: row.uuid, permission: permission}))
	}

	return (
		<>
			<TableRow>
				<TableCell>
					<Avatar src={row.img} name={row.last_name} size="medium" color={row.color_cd}/>
				</TableCell>
				<TableCell component="th" scope="row">
					<p>{row.last_name_kana} {row.first_name_kana}</p>
					<p>{row.last_name} {row.first_name}</p>
				</TableCell>
				<TableCell>
					{row.department}
				</TableCell>
				<TableCell>
					{row.email}
				</TableCell>
				<TableCell>
					{row.tel}
				</TableCell>
				<TableCell>
					<PermissionSelect permission={row.permission} handleChange={handleChangePermission}/>
				</TableCell>

				<TableCell>
					{/*<IconButton onClick={(e)=>setAnchorEl(e.currentTarget)}>*/}
					{/*	<img src={ImageEllipsis}/>*/}
					{/*</IconButton>*/}
					<Menu
						elevation={1}
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem onClick={() => {
							setDeleteDialog(true)
							handleClose();
						}}>
							削除
						</MenuItem>
					</Menu>
				</TableCell>
			</TableRow>
			<AppDialog isOpen={deleteDialog}
					   closeHandle={()=>setDeleteDialog(false)}
					   mainHandle={handleDelete} text='削除しますか' ButtonText="削除"/>

		</>
	);
};
