import React, { useEffect, CSSProperties, HTMLAttributes } from "react";
import { ValueContainerProps } from 'react-select/src/components/containers';
import { ControlProps } from 'react-select/src/components/Control';
import { MenuProps, NoticeProps } from 'react-select/src/components/Menu';
import { MultiValueProps } from 'react-select/src/components/MultiValue';
import { OptionProps } from 'react-select/src/components/Option';
import { PlaceholderProps } from 'react-select/src/components/Placeholder';
import { SingleValueProps } from 'react-select/src/components/SingleValue';
import { ValueType } from 'react-select/src/types';

import { WithContext as ReactTags } from 'react-tag-input';

// style
import "./invitedialog_select.module.scss";

//action
import * as MemberActionCreators from "../../../actions/Member/ActionCreator";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers";

const memberSelector = (state: RootState) => state.member;

const KeyCodes = {
	comma: 188,
	enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

interface SuggestType {
	id: string;
	text: string;
}


interface SelectUserProps {
	handleSelect
}


const UserTagInput: React.FC<SelectUserProps> = ({ handleSelect }) => {

	const dispatch = useDispatch();
	const member = useSelector(memberSelector);
	const [tags, setTags] = React.useState<any>([]);
	const [suggestions, setSuggestions] = React.useState<SuggestType[]>([]);

	useEffect(() => {
		const list:SuggestType[] = []
		member.searchUsers.map((items) => {
			list.push({id: items.user_id, text: `${items.name}`})
		})
		setSuggestions(list)
	}, [member.searchUsers]);

	const handleDelete = (i)  => {
		const list = tags.filter((tag, index) => index !== i)
		setTags(list);
		formatUser(list)
	};

	const handleAddition = (tag) => {
		const list = [...tags, tag]
		setTags(list);
		formatUser(list)
	};

	const formatUser = (list)  => {
		const uuid:string[] = []
		const email:string[] = []
		list.map( (item) => {
			if (item.text === item.id ) {
				email.push(item.text)
			} else {
				uuid.push(item.id)
			}
		})
		handleSelect({uuid, email})
	}

	const handleInputChange = (value) => {
		dispatch(MemberActionCreators.getMemberSearch.request(value));
	};

	return (
		<>
			<ReactTags tags={tags}
					   placeholder="名前、カナ、メールアドレス"
					   suggestions={suggestions}
					   handleDelete={handleDelete}
					   handleInputChange={handleInputChange}
					   handleAddition={handleAddition}
					   delimiters={delimiters} />
		</>
	);
};

export default UserTagInput;
