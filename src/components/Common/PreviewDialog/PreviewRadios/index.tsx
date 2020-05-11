import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { PREVIEW_TYPE_DESKTOP, PREVIEW_TYPE_MOBILE, PREVIEW_TYPE_PDF } from "../../../../config/preview_type";

import { block } from "../../../../reducers/Block";
import {useDispatch, useSelector} from "react-redux";

import { RootState } from "../../../../reducers";
import * as PreviewActionCreators from "../../../../actions/Preview/ActionCreator";
const routerSelector = (state: RootState) => state.router;
const previewSelector = (state: RootState) => state.preview;

const useStyles = makeStyles({
    group: {
        display: 'block',
        margin: "auto"
    },
    media: {
        marginLeft: 10
    }
});

export default function SwitchLayoutRadios({isHistory}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const router = useSelector(routerSelector);
    const preview = useSelector(previewSelector);
    const isPressRelease = router.location.pathname.indexOf('press_release') > -1;

    const handleChange = (value) => {
        dispatch(PreviewActionCreators.setPreviewType.request(value));
    };

    return (
        <div>
            {/*<ToggleButtonGroup value={type} onChange={handleChange}>*/}
            {/*    <ToggleButton value={PREVIEW_TYPE_DESKTOP} onChange={handleChange}>*/}
            {/*        <img src={IconDesktopOff}/>*/}
            {/*    </ToggleButton>*/}
            {/*    <ToggleButton value={PREVIEW_TYPE_PDF} onChange={handleChange}>*/}
            {/*        <img src={IconPDFOff}/>*/}
            {/*    </ToggleButton>*/}
            {/*    <ToggleButton value={PREVIEW_TYPE_MOBILE} onChange={handleChange}>*/}
            {/*        <img src={IconMobileOff}/>*/}
            {/*    </ToggleButton>*/}
            {/*</ToggleButtonGroup>*/}

            <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
                <Button variant={ preview === PREVIEW_TYPE_DESKTOP ? "contained": "outlined"} onClick={()=>handleChange(PREVIEW_TYPE_DESKTOP)}>PC</Button>
                <Button variant={ preview === PREVIEW_TYPE_MOBILE ? "contained": "outlined"} onClick={() => handleChange(PREVIEW_TYPE_MOBILE)}>SP</Button>
                {isPressRelease &&
                    <Button variant={ preview === PREVIEW_TYPE_PDF ? "contained": "outlined"} onClick={() => handleChange(PREVIEW_TYPE_PDF)}>PDF</Button>
                }
            </ButtonGroup>
        </div>
    );
}

