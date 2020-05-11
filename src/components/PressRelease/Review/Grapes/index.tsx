// @flow
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import React, { useEffect, useState, useRef } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import GrapesJS from "grapesjs";
import {theme} from "../../../../withRoot";
import * as ReactDOM from "react-dom";

import Panel from "../../Common/Panel";

// action
import * as PressReleaseActionCreators from "../../../../actions/PressRelease/ActionCreator";

import { DomComponentsReview } from "../../../Common/Editor/Manager/DomComponents";

// state
import {RootState} from "../../../../reducers";
import { appStore } from "../../../../ReduxRoot";

// conf
import {
	CommandsFetchState,
	CommandsComment,
	CommandsCommentHighLight
} from "../../../Common/Editor/Manager/Command";
import { RteManagerReview } from "../../../Common/Editor/Manager/RteManeger";
import { PanelManagerInit } from "../../../Common/Editor/Manager/Panel";
import {config} from "../../../Common/Editor/init";
import DoButtonGroup from "../../../Common/Editor/DoButtonGroup";
import { PAGE_REVIEW } from "../../../../config/page_type";


const pressReleaseSelector = (state: RootState) => state.pressRelease;
const assetSelector = (state: RootState) => state.asset;
const companySelector = (state: RootState) => state.company;

const GEditor: React.FC = () => {

	const dispatch = useDispatch();
	const id = "grapesjs-react-editor";
	const pressRelease = useSelector(pressReleaseSelector);
	const [editor, setEditor] = useState<any>(null);

	const { history } = pressRelease;
	const { component, html, style } = history.body;

	useEffect(() => {
		if (editor && history.fetched === true) {
			if (html !== editor.getHtml()) {
				editor.setComponents(component);
				editor.setStyle(style);
			}
		}
	}, [history.fetched]);

	useEffect(() => {
		if (editor) {
            // コマンド監視
            editor.on("component:deselected", (some: any, argument: any) => {
                dispatch(PressReleaseActionCreators.setPressReleaseCommentForm.request({
                    position: "",
                    quote: "",
                    isDisplayForm: false,
                }));
            });
		}
	}, [pressRelease.comment.list]);

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
				};

				const fetchStateComment = (value) => {
					dispatch(PressReleaseActionCreators.setPressReleaseCommentForm.request(value));
				};

				const handleHover = (value) => {
					dispatch(PressReleaseActionCreators.setPressReleaseCommentHover.request(value));
				};

				const handleComment = (position, text) => {
					dispatch(PressReleaseActionCreators.setPressReleaseCommentForm.request({
						position: position,
						quote: text,
						isDisplayForm: true,
					}));
				};

				// ブロックビュー表示タイミングでtabを追加
				editor.on("run:core:open-blocks", () => {
					if (document.getElementById("panelTab") === null) {
						const panelView = document.querySelector(".gjs-blocks-cs") as HTMLElement
						if (panelView) {
							const parent = (panelView as HTMLInputElement).parentNode
							if (parent) {
								const subRoot = document.createElement('div');
								subRoot.style.height = '100%'
								parent.insertBefore(subRoot, panelView);
								ReactDOM.render(<Provider store={appStore}>
									<MuiThemeProvider theme={theme}>
										<Panel editor={editor} pageType={PAGE_REVIEW}/>
									</MuiThemeProvider>
								</Provider>, subRoot);
								//if (panelView) panelView.style.display = 'none'
							}
						}
					}
				});

				editor.setComponents(component);
				editor.setStyle(style);
				setEditor(editor);
				RteManagerReview(editor, handleComment);
				DomComponentsReview(editor);
				CommandsFetchState(editor, fetchState);
				CommandsComment(editor, fetchStateComment, handleHover);
				PanelManagerInit(editor, false);

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
	return <section><div id={id}></div>><DoButtonGroup editor={editor} isGrid={false}/></section>;
};

export default GEditor;

(window as any).GrapesJS = GrapesJS;
(window as any).grapesjs = GrapesJS;
