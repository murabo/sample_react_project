import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Select, FormControl, Chip, Typography, DialogActions } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {pressReleaseType} from "../../../../config/press_release_type";
import {pressReleaseTag} from "../../../../config/press_release_tag";
import DoneIcon from '@material-ui/icons/Done';
import Button from "@material-ui/core/Button";

import style from "./share_dialog.module.scss";

// component
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";

//action
import * as ActionCreators from "../../../../actions/PressReleaseReserve/ActionCreator";

interface ShareDialogProps {
    isOpen: boolean,
    closeHandle,
}

const useStyles = makeStyles({
    content: {
        width: 540,
        height: 300,
        paddingTop: 20,
        backgroundColor: '#F3F7F4',
    },
    close: {
        position: 'absolute',
        right: '1rem',
        top: '0',
    },
    chip: {
        float: "left",
        margin: "0 8px 8px 0"
    }
});

const CategoryDialog: React.FC<ShareDialogProps> = ({ isOpen, closeHandle }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [categories, setCategories] = React.useState('');
    const [type, setType] = React.useState<number>(0);

    const handleChangeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
        setType(event.target.value as number);
    };

    const handleChangeTag = (id:number) => {
        let list:any = categories.split(',')

            const index = list.indexOf(String(id))
            if (index >= 0) {
                list = list.filter( item => item !== String(id));
            }else {
                if (list.length <= 2) {
                    list.push(id)
                }
            }
            setCategories(list.join(','));
    };

    const handlePostCategory = () => {
        const list = categories.split(',').filter(v => v)
        dispatch(ActionCreators.postPressReleaseMediaRecommend.request({categories: list, type: type}));
        closeHandle()
    };

    return (
        <Dialog
            open={isOpen}
        >
            <DialogTitle>
                リリースの種類とタグを選択してください
                <Typography variant="caption" color={"error"} display={"block"}>配信先の自動選定にも使用されます</Typography>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <section className={style.item}>
                    <p className={style.subTitle}>種類</p>
                    <FormControl variant="outlined" className={style.form}>
                        <Select
                            native
                            id="demo-customized-select-native"
                            value={type}
                            onChange={handleChangeCategory}
                        >
                            <option label="選択してください。" value=""></option>
                            {pressReleaseType.map( (category, num) => (
                                <optgroup key={num} label={category.label}>
                                    {category.sub.map( (item, index) => (
                                        <option key={index} label={item.label} value={item.id}></option>
                                    ))}
                                </optgroup>
                            ))}
                        </Select>
                    </FormControl>
                </section>
                <section className={style.item}>
                    <p className={style.subTitle}>カテゴリ<br/>(2つまで)</p>
                    <ul className={style.form}>
                        {pressReleaseTag.map( (tag, index) => {
                            const list = categories.split(',')
                            return <li key={index} className={classes.chip}>
                                {list.indexOf(String(tag.id)) >= 0 ?
                                    <Chip
                                        color="primary"
                                        label={tag.label}
                                        onClick={() => handleChangeTag(tag.id)}
                                        deleteIcon={<DoneIcon/>}
                                    />
                                    :
                                    <Chip
                                        label={tag.label}
                                        onClick={() => handleChangeTag(tag.id)}
                                    />
                                }
                            </li>
                        })}
                    </ul>
                </section>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" size="large" color="primary" onClick={handlePostCategory} disabled={!type || !categories.length}>
                    設定する
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CategoryDialog

