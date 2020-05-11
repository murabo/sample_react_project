const TlbDelete = {
    attributes: {class: "toolbarButton toolbarDelete"},
    command: "tlb-delete",
    label: '<span class="tooltip"><span class="text">削除</span></span>',
}

const TlbSave = {
    attributes: {class: "toolbarButton toolbarParts"},
    command: "app:partsSave",
    label: '<span class="tooltip"><span class="text">パーツ登録</span></span>',
}
const TlbClone = {
    attributes: {class: "toolbarButton toolbarClone"},
    command: "tlb-clone",
    label: '<span class="tooltip"><span class="text">複製</span></span>',
}

const TlbMove = {
    attributes: {class: "toolbarButton toolbarMove"},
    command: "tlb-move",
    label: '<span class="tooltip"><span class="text">移動</span></span>',
}
const TlbImage = {
    attributes: {class: "toolbarButton toolbarImage"},
    command: "tui-image-editor",
    label: '<span class="tooltip"><span class="text">画像編集</span></span>',
}

const TlbImageUpload = {
    attributes: {class: "toolbarButton toolbarCloud"},
    command: "app:image",
    label: '<span class="tooltip"><span class="text">画像アップロード</span></span>',
}

const TlbMovieUpload = {
    attributes: {class: "toolbarButton toolbarCloud"},
    command: "app:movie",
    label: '<span class="tooltip"><span class="text">動画アップロード</span></span>',
}


const TlbLink = {
    attributes: {class: "toolbarButton toolbarLink"},
    command: "app:link",
    label: '<span class="tooltip"><span class="text">リンク</span></span>',
}

const TlbColumn = {
    attributes: {class: "toolbarButton toolbarClone"},
    command: "tlb-clone",
    label: '<span class="tooltip"><span class="text">行追加</span></span>',
}

const TlbLine = {
    attributes: {class: "toolbarButton toolbarClone"},
    command: "table-insert-row-above",
    label: '<span class="tooltip"><span class="text">列追加</span></span>',
}

const TlbComment = {
    attributes: {class: "toolbarButtonComment toolbarComment"},
    command: "app:comment",
    label: ''
}



const TlbDiffAccept = {
    attributes: {class: "toolbarTextButton"},
    command: "app:accept",
    label: '承諾する'
}

const TlbDiffReject = {
    attributes: {class: "toolbarTextButton"},
    command: "app:reject",
    label: '承諾しない'
}


export const DomComponentsInit = (editor, loadImage, loadMovie, isPartsSave) => {

    const domc = editor.DomComponents;
    const types: any = domc.getTypes()

    const defaultModel = domc.getType('default').model;

    const imageModel = domc.getType('image').model;
    const imageView = domc.getType('image').view;

    domc.addType('image', {
        view: imageView.extend( {
            events: Object.assign( {}, imageView.prototype.events, {
                dblclick: 'doStuff',
            }),
            doStuff(ev) {
                loadImage()
                ev && ev.stopPropagation();
                const em = this.opts.config.em;
                const editor = em ? em.get('Editor') : '';

                if (editor && this.model.get('editable')) {
                    editor.runCommand('open-assets', {
                        target: this.model,
                        types: ['image'],
                        accept: 'image/*',
                        onSelect() {
                            editor.Modal.close();
                            editor.AssetManager.setTarget(null);
                        }
                    });
                }
            }
        }),
        model: imageModel.extend({
            defaults: Object.assign( {}, imageModel.prototype.defaults, {
                resizable: true,
                editable: true,
                hoverable: false
            }),
            initToolbar() {
                imageModel.prototype.initToolbar.apply(this, arguments);
                const target: any = this
                let list = [
                    TlbMove,
                    TlbDelete,
                    TlbImageUpload
                ];
                if (isPartsSave) list.push(TlbSave);
                target.set('toolbar', list);
            }
        })
    });

    const videoModel = domc.getType('video').model;
    const videoView = domc.getType('video').view;
    domc.addType('video', {
        model: videoModel.extend({
                defaults: Object.assign({}, videoModel.prototype.defaults, {
                    removable: true,
                    resizable: true,
                    editable: true
                }),
                initToolbar() {
                    videoModel.prototype.initToolbar.apply(this, arguments);
                    const target: any = this
                    let list = [
                        TlbMove,
                        TlbDelete,
                        TlbMovieUpload
                    ];
                    if (isPartsSave) list.push(TlbSave);
                    target.set('toolbar', list);
                }
            }
        ),
        view: videoView.extend( {
            events: Object.assign( {}, videoView.prototype.events, {
                dblclick: 'doStuff',
            }),
            doStuff(ev) {
                ev && ev.stopPropagation();
                const em = this.opts.config.em;
                const editor = em ? em.get('Editor') : '';

                if (editor && this.model.get('editable')) {
                    loadMovie();
                    editor.runCommand('open-assets', {
                        target: this.model,
                        types: ['video'],
                        accept: 'video/*',
                        onSelect() {
                            editor.Modal.close();
                            editor.AssetManager.setTarget(null);
                        }
                    });
                }
            }
        })
    });

    // toolbar
    types.forEach((type: any) => {
        const targetModel = domc.getType(type.id).model;
        const targetView = domc.getType(type.id).view;

        if (type.id == 'text' ) {
            domc.addType('text', {
                view: targetView.extend( {
                    events: Object.assign( {}, targetView.prototype.events, {
                        click: 'onActive',
                        dblclick: '',
                    })
                }),
                model: targetModel.extend({
                    defaults: Object.assign( {}, targetModel.prototype.defaults, {
                        removable: true,
                        editable: true,
                        attributes: {'width': '100%', 'data-mytext': 'MyText'},
                    }),
                    initToolbar() {
                        defaultModel.prototype.initToolbar.apply(this, arguments);
                        const target: any = this
                        let list = [
                            TlbMove,
                            TlbDelete
                        ];
                        if (isPartsSave) list.push(TlbSave);
                        target.set('toolbar', list);
                    }
                },
                {
                    isComponent: function ( el ) {
                        if (el.tagName === 'DIV' && el.getAttribute('data-mytext') === 'MyText') {
                            return { type: 'text', name: 'MyText', content: el.innerHTML, components: [] }
                        }
                    }
                })
            })
        }

        if (type.id == 'link' ) {
            domc.addType('link', {
                view: targetView,
                model: targetModel.extend({
                    defaults: Object.assign( {}, targetModel.prototype.defaults, {
                            traits: [
                                { type: 'text', label: 'URL', name: 'href' },
                                {
                                    type: 'select',
                                    label: 'ターゲット',
                                    name: 'target',
                                    options: [
                                        { value: '_blank', name: '新規のウィンドウ' },
                                        { value: '_self', name: '現在のウィンドウ' }
                                    ]
                                },
                            ]
                        }),
                        initToolbar() {
                            targetModel.prototype.initToolbar.apply(this, arguments);
                            const target: any = this
                            let list = [
                                TlbMove,
                                TlbDelete
                            ];
                            target.set('toolbar', list);
                        }
                    })
            })
        }

        if (type.id !== 'video' && type.id !== 'image' && type.id !== 'text' && type.id !== 'link') {
            domc.addType(type.id, {
                view: targetView,
                model: targetModel.extend({
                    defaults: Object.assign( {}, targetModel.prototype.defaults, {
                        removable: true,
                        resizable: true,
                        editable: true,
                    }),
                    initToolbar() {
                        targetModel.prototype.initToolbar.apply(this, arguments);
                        const target: any = this
                        let list = [
                            TlbMove,
                        ];
                        const {defaults} = targetModel.prototype;

                        if (defaults.removable) list.push(TlbDelete);
                        if (defaults.copyable) list.push(TlbClone);
                        if (isPartsSave) list.push(TlbSave);

                        switch (type.id) {
                            case 'cell':
                                list = [TlbColumn, TlbLine, TlbDelete];
                                break;
                            default:
                        }
                        target.set('toolbar', list);
                    }
                })
            })
        }
    });

    // h1タグの場合は、toolbarはmoveアイコンのみ表示
    editor.on("component:selected", (component: any, argument: any) => {
        const attributes =  component.attributes

        // divTag以外のtype=textはselectさせない
        if(attributes.tagName !== 'div' && attributes.type === 'text'){
            const parent = component.closest('div');
            editor.select(parent)
        }

        if(attributes.type === 'text'){
            const parent = component.parent();
            if (parent.attributes && parent.attributes.tagName === 'td') {
                editor.select(parent)
            }
        }

        if(attributes.type === 'image'){
            component.setStyle(Object.assign(component.getStyle(),{ height: 'auto' }));
        }
    });

    // 空のクラス追加
    editor.on('component:add', (component) => {
        checkEmptyComponents(component)
    });

    editor.on('run:core:component-delete', (component) => {
        checkEmptyComponents(component)
    });

    editor.on('component:deselected', (component) => {
        checkEmptyComponents(component)
    });

    editor.on('sorter:drag:end', (component) => {
        checkEmptyComponents()
    });

    //　empty class の追加削除
    const checkEmptyComponents = (component?:any) => {

        const wrap = editor.getWrapper();

        const allText = wrap.findType('text');
        allText.map((text)=> {
            if ( (text.attributes.tagName !== 'div' && text.attributes.type === 'text')) {
                text.set({highlightable: false, hoverable:false});
            }
        });

        const allDefault = wrap.findType('default');
        allDefault.map((child)=> {
            //console.log(child.attributes.tagName)
            if ( (child.attributes.tagName !== 'div')) {
                child.set({highlightable: false, hoverable: false});
            }
        });

        const row = wrap.find('.gjs-row');
        row.map((child) => {
            const hadChildren = child.components()
            if (!hadChildren.length) {
                child.remove()
            }
        });

        const cell = wrap.find('.gjs-cell');
        cell.map((child) => {
            const hadChildren = child.components()
            const style = child.getStyle()
            if (hadChildren.length) {
                child.setStyle(Object.assign(style, { 'background': 'none', "min-height": "auto"}), {
                    atRuleType: 'media',
                    atRuleParams: '(min-width: all)',
                })
            }else {
                child.setStyle(Object.assign(style, { "max-width": "100%;", "min-height": "50px", 'background': '#e3f5ea url(/no-empty.svg) no-repeat center center;'})
                    , {
                    atRuleType: 'media',
                    atRuleParams: '(min-width: all)',
                })
            }
        })

        const link = wrap.findType('link');
        link.map((child) => {
            const hadChildren = child.components()
            const style = child.getStyle()
            if (hadChildren.length) {
                child.setStyle(Object.assign(style, { 'background': 'none'}))
            }else {
                child.setStyle(Object.assign(style, { 'width': '100%', 'background': '#ffca6f9c url(/no-empty.svg) no-repeat center center;'}))
            }
        });
    };
}


export const DomComponentsReview = (editor, ...str) => {

    const domc = editor.DomComponents;
    const types: any = domc.getTypes()

    // toolbar
    types.forEach((type: any) => {
        const targetModel = domc.getType(type.id).model;
        const targetView = domc.getType(type.id).view;
        const defaultModel = domc.getType('default').model;

        if (type.id === "text") {
            domc.addType(type.id, {
                view: targetView.extend( {
                    events: Object.assign( {}, targetView.prototype.events, {
                        click: 'onActive',
                        dblclick: '',
                    })
                }),
                model: targetModel.extend({
                    initToolbar() {
                        targetModel.prototype.initToolbar.apply(this, arguments);
                        const target: any = this
                        target.set('toolbar', [TlbComment]);
                    },
                })
            })
        } else {
            domc.addType(type.id, {
                view: targetView,
                model: targetModel.extend({
                    defaults: Object.assign( {}, targetModel.prototype.defaults, {
                        removable: false,
                        resizable: false,
                        editable: false,
                        hoverable: true,
                        draggable: false,
                        selectable: true
                    }),
                    initToolbar() {
                        targetModel.prototype.initToolbar.apply(this, arguments);
                        const target: any = this
                        let list = [
                            TlbComment,
                        ];
                        target.set('toolbar', list);
                    }
                })
            })
        }
    });

    // 画像と動画の変更を禁止
    editor.on("component:selected", (target: any, argument: any) => {
        if(target && (target.getName() === 'Video' || target.getName() === 'Image')){
            target.set({editable: false, resizable: false});
        }
    });

    const wrap = editor.getWrapper();
    let diff = wrap.find('.diffmod, .diffdel, .diffins');

};


export const DomComponentsDiff = (editor) => {

    const domc = editor.DomComponents;
    const types: any = domc.getTypes()

    // toolbar
    types.forEach((type: any) => {
        const targetModel = domc.getType(type.id).model;
        const targetView = domc.getType(type.id).view;
        const defaultModel = domc.getType('default').model;


        domc.addType(type.id, {
            view: targetView,
            model: targetModel.extend({
                defaults: Object.assign( {}, defaultModel.prototype.defaults, {
                    editable: false,
                    hoverable: false,
                    selectable: false,
                    highlightable: false
                }),
                initToolbar() {
                    targetModel.prototype.initToolbar.apply(this, arguments);
                    const target: any = this
                    target.set('toolbar', []);
                }
            })
        })

        // if (type.id == 'text' ) {
        //     domc.addType('text', {
        //         view: targetView,
        //         model: targetModel.extend({
        //                 defaults: Object.assign( {}, defaultModel.prototype.defaults, {
        //                     removable: false,
        //                     resizable: false,
        //                     hoverable: false,
        //                     editable: false,
        //                 }),
        //                 initToolbar() {
        //                     targetModel.prototype.initToolbar.apply(this, arguments);
        //                     const target: any = this
        //                     let list = [
        //                         TlbDiffAccept,
        //                         TlbDiffReject
        //                     ];
        //                     target.set('toolbar', list);
        //                 }
        //             },
        //             {
        //                 isComponent: function ( el ) {
        //                     if (el.tagName === 'INS' ||el.tagName === 'DEL') {
        //                         return { type: 'text', content: el.innerHTML, components: [] }
        //                     }
        //                 }
        //             })
        //     })
        // }
    });


};


