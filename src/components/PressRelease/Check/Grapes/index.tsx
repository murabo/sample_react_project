// @flow
import React, {useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";

import GrapesJS from "grapesjs";

// action
import * as ActionCreators from "../../../../actions/PressReleaseAI/AIActionCreator";

// state
import {RootState} from "../../../../reducers";

// conf
import { CommandsAICheck, CommandsCommentHighLight } from "../../../Common/Editor/Manager/Command";
import {config} from "../../../Common/Editor/init";

const pressReleaseSelector = (state: RootState) => state.pressRelease;
const pressReleaseAISelector = (state: RootState) => state.pressReleaseAI;

const GEditor: React.FC= () => {

    const dispatch = useDispatch();
    const id = "grapesjs-react-editor";
    const pressRelease = useSelector(pressReleaseSelector);
    const pressReleaseAI = useSelector(pressReleaseAISelector);
    const [editor, setEditor] = useState<any>(null);
    const [before, setBefore] = useState<any>(null);

    const { component, html, style }  = pressRelease.detail.body

    useEffect(() => {
        if (editor && pressRelease.detail.fetched === true) {

            const delimiter =(/\r\n|。|\n/);

            if (html !== editor.getHtml()) {
                editor.setComponents(component);
                editor.setStyle(style);

                let request:any = []
                let list:any = []
                editor.getWrapper().findType('text').map((item) => {
                    const target:any = item
                    const text:[] = target.toHTML().split(delimiter);
                    text.map(item=>{
                        list.push({
                            id: target.getId(),
                            text: item
                        })
                    })
                    request = request.concat(text)
                });
                setBefore(list)

                dispatch(ActionCreators.postPressReleaseCheck.request(request));
                dispatch(ActionCreators.postPressReleaseTitleSuggest.request());
            }

        }
    }, [pressRelease.detail.fetched]);

    useEffect(() => {
        if (editor && pressReleaseAI.check.fetched === true) {
            editor.Commands.run('app:AICheck', {before: before, after: pressReleaseAI.check.result})
        }
    }, [pressReleaseAI.check.fetched]);

    //　ハイライト
    useEffect(() => {
        if (editor) {
            CommandsCommentHighLight(editor, pressRelease.comment.select.id);
        }
    }, [pressRelease.comment.select.id]);

    useEffect(() => {

            if (!editor) {
                let editor = GrapesJS.init({ ...config })
                CommandsAICheck(editor)
                setEditor(editor);
                editor.Commands.run('core:preview')
                const frame = document.querySelector(".gjs-frame") as HTMLElement;
                frame.style.paddingBottom = "10px";
                frame.style.background = "#fff";
                frame.style.height = "100%";
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
            }
        },
        [],
    );
    return <div id={id}></div>;
};

export default GEditor;

(window as any).GrapesJS = GrapesJS;
(window as any).grapesjs = GrapesJS;
