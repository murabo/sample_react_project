import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";

// component
import SettingTitle from "../../Common/SettingTitle";

//model
import { GroupListModel, GroupModel } from "../../../model/GroupModel";

//style
import style from "./group.module.scss";

// state
import { RootState } from "../../../reducers";
import CreateDialog from "./CreateDialog";
import * as GroupActionCreators from "../../../actions/Group/ActionCreator";
import TextField from "@material-ui/core/TextField";

const pressGroupSelector = (state: RootState) => state.group;


const ListLayout: React.FC = () => {

    const dispatch = useDispatch();
    const group = useSelector(pressGroupSelector);
    const [createDialog, setCreateDialog] = useState(false);

    const handleSave = (name) => {
        dispatch(GroupActionCreators.postGroup.request({name}))
        setCreateDialog(false)
    }

    return (
        <>
            <div className={style.action}>
                {/*<Button variant="outlined" size="large" color="primary" className={style.button} onClick={()=>setCreateDialog(true)}>*/}
                {/*    <img src={IconGroupAdd} />新規グループ作成*/}
                {/*</Button>*/}
            </div>
            <SettingTitle text="グループ一覧"/>
            <ul>
                {group.results.map( (item, index) => (
                    <ListLayoutItem
                        item={item}
                        key={index}/>
                ))}
            </ul>
        </>
    );
}
export default ListLayout;


interface ListLayoutItemProps {
    item: GroupListModel,
}

const ListLayoutItem: React.FC<ListLayoutItemProps> = ({ item }) => {

    const dispatch = useDispatch();
    const [form, setForm] = React.useState(false);
    const [name, setName] = React.useState(item.name);

    const handleSave = () => {
        dispatch(GroupActionCreators.patchGroup.request({uuid: item.uuid, name: name}))
        setForm(false)
    };

    return (
        <li className={style.list}>
            <div className={style.inner}>
                {form ?
                    <>
                        <div className={style.title}>
                            <TextField multiline
                                       placeholder="グループ名"
                                       value={name}
                                       variant="outlined"
                                       onChange={(e)=>setName(e.target.value)}
                            />
                        </div>
                        <div className={style.menu}>
                            <Button variant="contained" size="large" color="primary" onClick={handleSave} disabled={!name}>
                                保存
                            </Button>
                        </div>
                    </>
                    :
                    <>
                        <div className={style.title}>
                            {item.name}
                        </div>
                        <div className={style.menu}>
                            <Button variant="outlined" size="large" color="primary" onClick={()=>setForm(true)}>
                                編集
                            </Button>
                        </div>
                    </>
                }
            </div>
        </li>
    );
}
