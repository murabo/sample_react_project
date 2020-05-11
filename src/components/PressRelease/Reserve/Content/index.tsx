import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

// component
import {Box, Typography, Chip, Button, DialogContent} from "@material-ui/core/";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from '@material-ui/core/Divider';
import List from "@material-ui/core/List";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CustomMain from "./Main/Custom";
import CustomSide from "./Side/Custom";
import AutoMain from "./Main/Auto";
import AutoSide from "./Side/Auto";
import Category from "./Category";
import Publish from "./Publish";

// style
import style from "./conent.module.scss";

import * as ActionCreators from "../../../../actions/PressReleaseReserve/ActionCreator";

// state
import {RootState} from "../../../../reducers";
import DatePicker from "../../../Common/DatePicker";
import IconClock from "../../../../assets/icon_clock.svg";
import CategoryDialog from "../../Common/CategoryDialog";
import {makeStyles} from "@material-ui/core/styles";

const pressReleaseSelector = (state: RootState) => state.pressRelease;
const pressReleaseReserveSelector = (state: RootState) => state.pressReleaseReserve;

const useStyles = makeStyles({
    title: {
        width: 240,
        marginBottom: 10
    }
});


const Index: React.FC = () => {

    const classes = useStyles();
    const reserve = useSelector(pressReleaseReserveSelector);
    const pressRelease = useSelector(pressReleaseSelector);
    const [categoryDialog, setCategoryDialog] = React.useState(false);
    const [allOpen, setAllOpen] = React.useState<boolean>(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (pressRelease.detail.press_id) {
            dispatch(ActionCreators.getPressReleaseReserve.request({press_id: pressRelease.detail.press_id}));
        }
    }, [pressRelease.detail]);

    // useEffect(() => {
    //     if (reserve.data.fetched && reserve.data.auto.is_send) {
    //         if (!reserve.data.categories.length || !reserve.data.auto.id_list.length) {
    //             setCategoryDialog(true);
    //         }
    //     }
    // }, [reserve.data.fetched, reserve.data.auto.is_send]);

    const handleChangeDatetime = (m) => {
        if (m) dispatch(ActionCreators.setPressReleaseReserveDatetime.request(m[0]));
    };

    const customSendList = reserve.data.custom.filter(item => item.is_send === true);
    const sendFlag = reserve.data.auto.is_send === true || customSendList.length > 0;

    return (
        <>
            <div className={style.root}>
                <Box className={style.item}>
                    <div>
                        <Typography variant="h6" className={classes.title}>1.配信予約時間</Typography>
                    </div>
                    <DatePicker datetime={reserve.data.released_at}
                                edit={true}
                                isReserve={true}
                                handleChangeDatetime={handleChangeDatetime}/>
                </Box>
                <Divider/>
                <Box className={style.item}>
                    <div>
                        <Typography variant="h6" className={classes.title}>
                            2.webでの公開
                        </Typography>
                    </div>
                    <Publish/>
                </Box>
                <Divider/>
                <Box className={style.item}>
                    <div>
                        <Typography variant="h6" className={classes.title}>
                           3.カテゴリ・種別
                        </Typography>
                    </div>
                    <Category handleOpenDialog={() => setCategoryDialog(true)}/>
                </Box>
                <Divider/>
                <Box className={style.item}>
                    <div>
                        <Typography variant="h6" className={classes.title}>
                            4.配信メール作成
                        </Typography>
                    </div>
                    <div className={style.allopen}>
                        <FormControlLabel
                            value="start"
                            checked={allOpen}
                            onChange={() => setAllOpen(!allOpen)}
                            control={<Checkbox color="primary"/>}
                            label="全てのメールを開く"
                            labelPlacement="start"
                        />
                    </div>
                </Box>
                <div className={style.content}>
                    <Box className={style.side}>
                        <h4 className={style.title}>
                            送信メディアリスト
                        </h4>
                        <List>
                            {reserve.data.auto.is_send && <AutoSide/>}
                            {customSendList.map((item, index) => (
                                <CustomSide item={item} key={index}/>
                            ))}
                        </List>
                        <h4 className={style.title}>
                            未送信メディアリスト
                        </h4>
                        <List>
                            {!reserve.data.auto.is_send && <AutoSide/>}
                            {reserve.data.custom.filter(item => !item.is_send).map((item, index) => (
                                <CustomSide item={item} key={index}/>
                            ))}
                        </List>
                    </Box>

                    <div className={style.main}>
                        <div>
                            {reserve.data.auto.is_send && <AutoMain isAllOpen={allOpen}/>}
                            {reserve.data.custom.filter(item => item.is_send).map((item, index) => (
                                <CustomMain item={item} key={index} isAllOpen={allOpen}/>
                            ))}
                        </div>
                    </div>
                </div>

                <CategoryDialog
                    isOpen={categoryDialog}
                    closeHandle={() => setCategoryDialog(false)}
                />
            </div>
        </>
    );
};

export default Index;

