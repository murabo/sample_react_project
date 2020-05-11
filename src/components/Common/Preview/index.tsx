import React from "react";

// model
import { PressReleaseBodyModel } from "../../../model/PressReleaseModel";
import { PDF_HTML } from "../../../util/template/PDF_HTML";
import {CONTACT_CLOSED, CONTACT_LABEL} from "../../../config/contact";
import {makeStyles} from "@material-ui/core/styles";

interface IProps {
    body: PressReleaseBodyModel ,
    isCard?: boolean,
    src?: string
}

const useStyles = makeStyles({
    root: {
        height: "calc( 100vh - 68px );",
        maxWidth: 780,
        margin: "auto",
        width: "100%",
        fontSize: 14,
        color: "#333",
    }
});

const Preview: React.FC<IProps> = ({ body, isCard }) => {

    const classes = useStyles();
    const { html, css }  = body

    let　data = PDF_HTML.replace(/{{HTML}}/g, html as string)
    data = data.replace(/{{style}}/g, `#wrapper {max-width: 790px; margin: auto} ${css}`)

    const htmlString = `<style>${css}</style>${html}`
    if (isCard) {
        return <div dangerouslySetInnerHTML={{__html :htmlString}}/>
    }

    return (
        <div className={classes.root}>
            <div dangerouslySetInnerHTML={{__html : htmlString}}/>
        </div>
    );
};

export default Preview;
