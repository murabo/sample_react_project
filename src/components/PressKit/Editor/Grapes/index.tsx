// @flow

import React, {useEffect, useState, useRef} from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Provider, useDispatch, useSelector } from "react-redux";
import * as ReactDOM from "react-dom";
import {theme} from "../../../../withRoot";

import GrapesJS from "grapesjs";
import "grapesjs-blocks-flexbox/dist/grapesjs-blocks-flexbox.min.js";

// action
import * as PressKitActionCreators from "../../../../actions/PressKit/ActionCreator";
import * as AssetActionCreators from "../../../../actions/Asset/ActionCreator";
import * as MovieActionCreators from "../../../../actions/Movie/ActionCreator";
import { PressKitModel } from "../../../../model/PressKitModel";

// state
import {RootState} from "../../../../reducers";
import { appStore } from "../../../../ReduxRoot";

// component
import Panel from "../Panel";
import DoButtonGroup from "../../../Common/Editor/DoButtonGroup";

// conf
import { PANEL_TYPE_EDITOR } from "../../../../config/panel_type";
import { StyleManagerInit } from "../../../Common/Editor/Manager/Style";
import { BasicBlockManagerInit } from "../../../Common/Editor/Manager/Block/Basic";
import { AssetManagerInit } from "../../../Common/Editor/Manager/Asset";
import { DomComponentsInit } from "../../../Common/Editor/Manager/DomComponents";
import {
    CommandsEditorInit,
    CommandsFetchState,
    CommandsLink,
} from "../../../Common/Editor/Manager/Command";
import { PanelManagerInit } from "../../../Common/Editor/Manager/Panel";
import { config } from "../../../Common/Editor/init";
import Pagination from "../../../Common/Pagination";

interface IProps {
    detail?: any
}

const assetSelector = (state: RootState) => state.asset;
const movieSelector = (state: RootState) => state.movie;


const GEditor: React.FC<IProps> = props => {

    const dispatch = useDispatch();
    const id = "grapesjs-react-editor";
    const assets = useSelector(assetSelector);
    const movie = useSelector(movieSelector);
    const [editor, setEditor] = useState<any>(null);

    const {
        detail
    } = props;

    const { component, html, style, css }  = detail.body

    const handleAssetPageChange = (pageNumber) => {
        dispatch(AssetActionCreators.getAsset.request({offset: pageNumber}))
    };

    const handleMoviePageChange = (pageNumber) => {
        dispatch(MovieActionCreators.getMovie.request({offset: pageNumber}))
    };

    useEffect(() => {
        if (editor) {
            editor.AssetManager.render(assets.results);
            editor.on("run:core:open-assets", () => {
                editor.AssetManager.render(assets.results);
            });
            // ブロックビュー表示タイミングでtabを追加
            const parent = document.querySelector(".gjs-am-assets-cont");
            const pagination:any = document.getElementById("assetPagination");
            if (parent) {
                if ( pagination ) pagination.parentNode.removeChild(pagination);
                const subRoot = document.createElement('div');
                parent.appendChild(subRoot);
                ReactDOM.render(<Provider store={appStore}>
                    <MuiThemeProvider theme={theme}>
                        <div id='assetPagination'>
                            <Pagination
                                activePage={assets.offset}
                                totalCount={assets.count}
                                handlePageChange={handleAssetPageChange}
                            />
                        </div>
                    </MuiThemeProvider>
                </Provider>, subRoot);
            }
        }
    }, [assets.results]);


    useEffect(() => {
        if (editor) {
            editor.AssetManager.render(movie.results);
            editor.on("run:core:open-assets", () => {
                editor.AssetManager.render(movie.results);
            });
            // ブロックビュー表示タイミングでtabを追加
            const parent = document.querySelector(".gjs-am-assets-cont");
            const pagination:any = document.getElementById("assetPagination");
            if (parent) {
                if ( pagination ) pagination.parentNode.removeChild(pagination);
                const subRoot = document.createElement('div');
                parent.appendChild(subRoot);
                ReactDOM.render(<Provider store={appStore}>
                    <MuiThemeProvider theme={theme}>
                        <div id='assetPagination'>
                            <Pagination
                                activePage={movie.offset}
                                totalCount={movie.count}
                                handlePageChange={handleMoviePageChange}
                            />
                        </div>
                    </MuiThemeProvider>
                </Provider>, subRoot);
            }
        }
    }, [movie.results]);

    useEffect(() => {
        if (editor && detail.fetched === true) {
            if (html !== editor.getHtml()) {
                editor.setComponents(component);
                editor.setStyle(style);
            }

        }
    }, [detail.fetched]);


    useEffect(() => {

            if (!editor) {

                let editor = GrapesJS.init(
                    {
                        ...config,
                        assetManager: {
                            ...config.assetManager,
                            uploadFile: function(e) {
                                const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
                                const target = e.target
                                if(target){
                                    const accept = target.getAttribute('accept');
                                    if ( accept.match(/image/)) {
                                        dispatch(AssetActionCreators.postAsset.request({ name: files[0].name, file: files[0]}));
                                    } else {
                                        dispatch(MovieActionCreators.postMovie.request({ name: files[0].name, file: files[0]}));
                                    }
                                }
                            }
                        },
                    }
                )

                const fetchState = (value) => {
                    dispatch(PressKitActionCreators.setPressKitDetails.request(value));
                };

                // Manager ---------------------------------------------------------
                const handleLoadMovie = function () {
                    dispatch(MovieActionCreators.getMovie.request({offset: 1}))
                };

                const handleLoadImage = function () {
                    dispatch(AssetActionCreators.getAsset.request({offset: 1}));
                };

                // AssetManager ---------------------------------------------------------
                const handleDeleteImage = (id) => {
                    dispatch(AssetActionCreators.deleteAsset.request({id}));
                };
                const handleDeleteMovie = function (id) {
                    dispatch(MovieActionCreators.deleteMovie.request({id}));
                };


                AssetManagerInit(editor, handleDeleteImage, handleDeleteMovie)
                PanelManagerInit(editor, true);
                DomComponentsInit(editor, handleLoadImage, handleLoadMovie, false)
                BasicBlockManagerInit(editor, true)
                StyleManagerInit(editor)

                CommandsEditorInit(editor, handleLoadImage, handleLoadMovie);
                CommandsFetchState(editor, fetchState);
                CommandsLink(editor);

                // ブロックビュー表示タイミングでtabを追加
                editor.on("run:core:open-blocks", () => {
                    if (document.getElementById("panelTab") === null) {
                        const panelView = document.querySelector(".gjs-blocks-cs");
                        const parent = (panelView as HTMLInputElement).parentNode
                        if (parent) {
                            const subRoot = document.createElement('div');
                            subRoot.style.height = '100%'
                            parent.insertBefore(subRoot, panelView);
                            ReactDOM.render(<Provider store={appStore}>
                                                <MuiThemeProvider theme={theme}>
                                                    <Panel editor={editor} isPreview={false} panelIndex={PANEL_TYPE_EDITOR}/>
                                                </MuiThemeProvider>
                                            </Provider>, subRoot);
                        }
                    }
                });


                editor.Panels.getButton("views", "open-blocks").set("active", true);

                editor.setComponents(component);
                editor.setStyle(style);
                setEditor(editor);


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
    return <><div id={id}></div>><DoButtonGroup editor={editor} isGrid={true}/></>;
};

export default GEditor;

(window as any).GrapesJS = GrapesJS;
(window as any).grapesjs = GrapesJS;
