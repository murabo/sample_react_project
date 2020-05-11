// @flow
import React, {useEffect, useState, useRef} from "react";
import {Provider, useDispatch, useSelector} from "react-redux";
import HtmlDiff from 'htmldiff-js';
import "grapesjs/dist/css/grapes.min.css";
import "../../../Common/Editor/grapes.module.scss";

import GrapesJS from "grapesjs";

// action
import * as PressReleaseActionCreators from "../../../../actions/PressRelease/ActionCreator";

// state
import {RootState} from "../../../../reducers";

import { DomComponentsDiff } from "../../../Common/Editor/Manager/DomComponents";
import {
    CommandsDiff,
    CommandsFetchState, CommandsCommentHighLight,
} from "../../../Common/Editor/Manager/Command";
import {RteManagerDiff} from "../../../Common/Editor/Manager/RteManeger";
import { PanelManagerInit } from "../../../Common/Editor/Manager/Panel";
import {config} from "../../../Common/Editor/init";
import * as ReactDOM from "react-dom";
import { appStore } from "../../../../ReduxRoot";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "../../../../withRoot";
import Panel from "../../Common/Panel";
import { PAGE_DIFF } from "../../../../config/page_type";
import DoButtonGroup from "../../../Common/Editor/DoButtonGroup";

const pressReleaseSelector = (state: RootState) => state.pressRelease;

const createDiff = (before, after) => {
  　return HtmlDiff.execute(before, after)
};

const GEditor: React.FC = () => {

    const dispatch = useDispatch();
    const id = "grapesjs-react-editor";
    const pressRelease = useSelector(pressReleaseSelector);
    const [editor, setEditor] = useState<any>(null);
    const { detail } = pressRelease;
    const { component, style } = detail.body;

    useEffect(()=> {
        if (editor) {
            if (pressRelease.diff.fetched === true && pressRelease.detail.fetched === true) {
                const diff = createDiff(pressRelease.detail.body.html, pressRelease.diff.body.html)
                editor.setComponents(diff);
                editor.setStyle(pressRelease.diff.body.style);
                setEditor(editor);
                CommandsDiff(editor);
            }
        }
    }, [pressRelease.diff.fetched, pressRelease.detail.fetched]);


    //　ハイライト
    useEffect(() => {
        if (editor) {
            CommandsCommentHighLight(editor, pressRelease.comment.select.id);
        }
    }, [pressRelease.comment.select.id]);

    useEffect(() => {
            if (!editor) {

                let editor = GrapesJS.init({ ...config })

                const fetchState = (value) => {
                    dispatch(PressReleaseActionCreators.setPressReleaseDetails.request(value));
                }

                // ブロックビュー表示タイミングでtabを追加
                editor.on("run:core:open-blocks", () => {
                    if (document.getElementById("panelTab") === null) {
                        const panelView = document.querySelector(".gjs-blocks-cs") as HTMLElement
                        const parent = (panelView as HTMLInputElement).parentNode
                        if (parent) {
                            const subRoot = document.createElement('div');
                            subRoot.style.height = '100%'
                            parent.insertBefore(subRoot, panelView);
                            ReactDOM.render(<Provider store={appStore}>
                                <MuiThemeProvider theme={theme}>
                                    <Panel editor={editor} pageType={PAGE_DIFF}/>
                                </MuiThemeProvider>
                            </Provider>, subRoot);
                            //if (panelView) panelView.style.display = 'none'
                        }
                    }
                });

                setEditor(editor)
                RteManagerDiff(editor)
                CommandsFetchState(editor, fetchState)
                PanelManagerInit(editor, false)
                DomComponentsDiff(editor)

                const frame = document.querySelector(".gjs-frame") as HTMLElement;
                frame.style.paddingRight = "300px";
                frame.style.background = "#fff";

            } else {
                if (document) {
                    const target = document.getElementById(id);
                    if (target && editor) {
                        target.append(editor.render());
                    }
                }
            }

            return function cleanup() {
                if (editor) {
                    editor.destroy();
                    GrapesJS.editors = GrapesJS.editors.filter((e: KeyboardEvent) => e !== editor);
                }
            };
        },
        [],
    );
    return  <div id={id}></div>;
};

export default GEditor;

(window as any).GrapesJS = GrapesJS;
(window as any).grapesjs = GrapesJS;
