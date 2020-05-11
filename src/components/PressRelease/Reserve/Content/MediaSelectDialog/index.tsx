import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

// component
import { Tabs, Tab, TextField, InputAdornment, Checkbox, Dialog, DialogActions,
    DialogContent, DialogTitle, FormControlLabel, Menu, MenuItem } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

// style
import style from "./media_select_dialog.module.scss";

//state
import { RootState } from "../../../../../reducers";
import * as ActionCreators from "../../../../../actions/PressReleaseReserve/ActionCreator";
const pressReleaseReserveSelector = (state: RootState) => state.pressReleaseReserve;
const mediaSelector = (state: RootState) => state.media;

interface MediaSelectDialogProps {
    isOpen: boolean,
    closeHandle,
}

const useStyles = makeStyles({
    root: {
        height: 600,
        paddingTop: 0
    },
    header: {
        position: 'absolute',
        backgroundColor: '#fff',
        zIndex: 1
    },
    tab: {
        minWidth: 100,
    }
});

const MediaSelectDialog: React.FC<MediaSelectDialogProps> = ({ isOpen, closeHandle}) => {

    const classes = useStyles();
    const reserve = useSelector(pressReleaseReserveSelector);
    const media = useSelector(mediaSelector);
    const [allMediaList, setAllMediaList] = useState<any>([]);
    const [mediaType, setMediaType] = useState<any>([]);
    const [tabindex, setTabindex] = useState<any>(0);
    const [search, setSearch] = useState<any>('');

    let target:any = {}

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
    });

    const handleOff = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [name]: event.target.checked });
    };

    const handleSearch = () => {
        if (search) {
            const list = allMediaList.filter(item => {
                return ~item.name.indexOf(search)
            })
            setAllMediaList(list)
        }
    };

    const handleChange = (e) => {
        setSearch(e.target.value)
        if (!e.target.value) {
            setAllMediaList(media.allList.results)
        }
    };

    const handleExclude = (e) => {
        console.log(e)
    };

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabindex(newValue);
        const list = media.allList.results[mediaType[newValue]]
        setAllMediaList(list)
    };

    useEffect(() => {
            const keys = Object.keys(media.allList.results)
            if (keys.length) {
                setMediaType(keys)
                const list = media.allList.results[keys[0]]
                setAllMediaList(list)
            }
    }, [media.allList.results]);

    return (
        <Dialog open={isOpen}>
            <DialogTitle>
                <p>マッチングメディア {reserve.data.auto.id_list.length}件</p>
            </DialogTitle>
            <DialogContent className={classes.root}>
                <div className={classes.header}>
                    {media.allList.fetched &&
                        <Tabs
                            value={tabindex}
                            onChange={handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            aria-label="full width tabs example">
                            {mediaType.map((label, key) => (
                                <Tab label={`${label}`} key={key} className={classes.tab}/>
                            ))}
                            <Tab label="除外リスト(coming soon)" color={"error"}/>
                        </Tabs>
                    }
                </div>
                <div className={style.form}>
                    <div className={style.input}>
                        <TextField
                            onChange={handleChange}
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                    <div className={style.button}>
                        <Button variant="outlined" color="primary" size={"large"} onClick={handleSearch}>
                            検索
                        </Button>
                    </div>
                </div>
                <ul className={style.list}>
                    {media.allList.fetched ?
                        allMediaList.map((media, index )=> (
                                <ListLayoutItem key={index} media={media}/>
                         ))
                    :
                        <div><LinearProgress color="primary" /></div>

                    }

                </ul>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" size="large" color="primary" onClick={closeHandle}>
                    閉じる
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MediaSelectDialog


interface ListLayoutItemProps {
    media
}

const ListLayoutItem: React.FC<ListLayoutItemProps> = ({ media }) => {

    const reserve = useSelector(pressReleaseReserveSelector);
    const list = reserve.data.auto.id_list
    const dispatch = useDispatch();
    const handleOff = () => {
        dispatch(ActionCreators.setPressReleaseReserveAutoMedia.request(media.id));
    };

    return (
        <li>
            <FormControlLabel
                // disabled
                // label={`${media.name} (除外リスト)`}
                control={
                    <Checkbox
                        checked={list.indexOf(media.id) >= 0}
                        onChange={handleOff}
                        value={media.id}
                        color="primary"
                    />
                }
                label={media.name}
            />
        </li>
    );
}

