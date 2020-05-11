import React from "react";
import { useSelector } from "react-redux";
// state
import {RootState} from "../../../../../reducers";
const pressReleaseSelector = (state: RootState) => state.pressRelease;
const groupSelector = (state: RootState) => state.group;

const Email: React.FC = () => {

    const pressRelease = useSelector(pressReleaseSelector);
    const group = useSelector(groupSelector);
    const { result } = pressRelease.check
    return (
        <>
            送信リスト一覧
        </>
    );
}

interface EmailItemProps {
    item: []
}

const EmailItem: React.FC<EmailItemProps> = ({item}) => {

    return (
        <li>
            {item.join(',')}
        </li>
    );
}

export default Email;
