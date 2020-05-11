import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {push} from 'connected-react-router'
import {createPreview} from '../../../util/CreatePreview'

import style from "../Create/CreateDialog/template.module.scss";

//model
import { PressReleaseListModel, PressReleaseModel } from "../../../model/PressReleaseModel";

//action
import * as PressReleaseCreators from "../../../actions/PressRelease/ActionCreator";

// state
import {RootState} from "../../../reducers";
const pressGroupSelector = (state: RootState) => state.group;

const ListLayout: React.FC = () => {
    const [template, setTemplate] = useState([]);

    return (
        <section>
            <ul className={style.card}>
            {template.map( (item, index) => (
                <ListLayoutItems
                    item={item}
                    key={index}/>
            ))}
            </ul>
        </section>
    );
}
export default ListLayout;

interface ListLayoutItemsProps {
    item: PressReleaseModel
}

const ListLayoutItems: React.FC<ListLayoutItemsProps> = ({item}) => {

    const dispatch = useDispatch();
    const group = useSelector(pressGroupSelector);

    const handleClick = () => {
        dispatch(PressReleaseCreators.setPressReleaseDetails.request(item))
        dispatch(push(`/press_kit/${group.selectedId}/create/`))
    }

    return (
        <li className={style.list}>
            <div className={style.inner} onClick={handleClick}>
                <div className={style.overlay}>
                    {/*<NavLink exact to={`/press_release/${group.selectedId}/detail/${item.press_id}/`} className={style.open}>*/}
                        {/*開く*/}
                    {/*</NavLink>*/}
                </div>
                <div  className={style.bg}>
                    <iframe srcDoc={createPreview(item.body.html, item.body.css)}></iframe>
                </div>
                <div className={style.content}>
                    <p className={style.title}>タイトルタイトルタイトルタイトルタイトル</p>
                </div>
            </div>
        </li>
    );
}
