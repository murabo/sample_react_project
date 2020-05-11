import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';

import {LAYOUT_TYPE_CARD, LAYOUT_TYPE_LIST } from '../../../../config/layout_type'

//img
import IconListOff from "../../../../assets/switch/icon_list_off.svg";
import IconListOn from  "../../../../assets/switch/icon_list_on.svg";
import IconCardOff from"../../../../assets/switch/icon_card_off.svg";
import IconCardOn from  "../../../../assets/switch/icon_card_on.svg";

import { block } from "../../../../reducers/Block";

const useStyles = makeStyles({
    root: {
        display: 'block'
    }
});

export default function SwitchLayoutRadios({type, handleChange}) {
    const classes = useStyles();
    return (
        <FormControl>
            <RadioGroup defaultValue="female" aria-label="" name="customized-radios" className={classes.root}>
                <Radio
                    checked={type === LAYOUT_TYPE_LIST}
                    onChange={handleChange}
                    value={LAYOUT_TYPE_LIST}
                    color="default"
                    name="layout"
                    icon={<img src={IconListOff}/>}
                    checkedIcon={<img src={IconListOn}/>}
                />
                <Radio
                    checked={type === LAYOUT_TYPE_CARD}
                    onChange={handleChange}
                    value={LAYOUT_TYPE_CARD}
                    color="default"
                    name="layout"
                    icon={<img src={IconCardOff}/>}
                    checkedIcon={<img src={IconCardOn}/>}
                />
            </RadioGroup>
        </FormControl>
    );
}

