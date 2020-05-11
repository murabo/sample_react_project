export const CommandsFetchState = (editor, fetchState) => {

    const fetchTargetsButton = document.getElementsByClassName('js-fetchStore');
    for(let i = 0; i < fetchTargetsButton.length; i++){
        fetchTargetsButton[i].addEventListener('click', () => {
            editor.Commands.run('app:save')
        }, false);
    }

    editor.Commands.add('app:save', {
        run(editor) {
            const document = editor.Canvas.getDocument()
            const wrap = editor.getWrapper();
            let diff = wrap.find('.diffmod, .diffdel, .diffins');

            while (diff.length > 0) {
                reject(diff[0])
                diff = wrap.find('.diffmod, .diffdel, .diffins');
            }

            const html = wrap.toHTML();
            const component = editor.getComponents();
            const style = editor.getStyle();
            const css = editor.getCss();

            fetchState({
                body: {
                    html,
                    css,
                    style,
                    component,
                }
            })
        }
    })
};

export const CommandsEditorInit = (editor, handleLoadImage, handleLoadMovie) => {

    // コンポーネント追加でidに乱数追加
    editor.on('component:add', function(model) {
        const random = Math.random();
        if(!model.getId()) model.addAttributes({ id: random});
    });

    editor.on("component:deselected", (some: any, argument: any) => {
        editor.Panels.getButton("views", "open-blocks").set("active", true);
    });

    editor.Commands.add('app:image', {
        run(editor) {
            handleLoadImage()
            editor.Commands.run("core:open-assets");
        }
    })

    editor.Commands.add('app:movie', {
        run(editor) {
            handleLoadMovie()
            editor.Commands.run("core:open-assets");
        }
    })

    const nowrap:any = document.getElementById('responsive-nowrap') as HTMLElement;
    const wrap:any = document.getElementById('responsive-wrap') as HTMLElement;

    // // レスポンシブの設定
    // const responsiveClass = 'gjs-responsive'
    // nowrap.addEventListener("click", (e) => {
    //     setResponsive()
    // }, false);
    // wrap.addEventListener("click", (e) => {
    //     setResponsive()
    // }, false);
    //
    // function setResponsive() {
    //     const target = editor.getSelected()
    //     if(target.getClasses(responsiveClass).indexOf(responsiveClass) > -1) {
    //         target.removeClass(responsiveClass)
    //         nowrap.checked = true;
    //         wrap.checked = false;
    //     } else {
    //         target.addClass(responsiveClass)
    //         wrap.checked = true;
    //         nowrap.checked = false;
    //     }
    // }

    editor.on("component:selected", (some: any, argument: any) => {
        const type:any = some.attributes.type

        editor.Panels.getButton("views", "open-sm").set("active", true);
        const sm = document.querySelector('.gjs-sm-sectors');
        const smChild = document.querySelector('.gjs-sm-sector');
        let tm = document.querySelector('.gjs-trt-traits');
        if (!tm) {
            // traits(setttingがない場合、activeにしてレンダリング後DOM再取得)
            editor.Panels.getButton("views", "open-tm").set("active", true);
            editor.Panels.getButton("views", "open-sm").set("active", true);
        }
        tm = document.querySelector('.gjs-trt-traits');
        const parent = (sm as HTMLInputElement)
        const tmEl = (tm as HTMLElement)
        const button = document.createElement("button");
        button.className = 'gjs-open-blocks';
        button.onclick= function() {
            editor.Panels.getButton("views", "open-blocks").set("active", true);
        };

        if (parent && tmEl) {
            parent.insertBefore(tmEl, smChild)
            parent.insertBefore(button, smChild)
        }

        if (type === 'video' || type === 'link') {
            tmEl.style.display="block";
        } else {
            tmEl.style.display="none";
        }

        if (type === "wrapper") {
            editor.Panels.getButton("views", "open-blocks").set("active", true);
        }

        // richTextEditorが2重で表示されるバグ回避
        if (type === "text") {
            const cke = document.querySelectorAll('.cke');
            cke.forEach(item => {
                const el = item as HTMLElement;
                el.style.display = "none"
            });
            const target = document.getElementById(`cke_${some.getId()}`) as HTMLElement;
            if (target) target.style.display = "block"
        }

        // // style manager レスポンシブ
        // if(some.getClasses(responsiveClass) > -1) {
        //     wrap.checked = true;
        // } else {
        //     nowrap.checked = true;
        // }

    });

    // table cellの追加TODO
    editor.Commands.add('table-insert-row-above', editor => {
        const selected = editor.getSelected();

        if (selected && selected.is('cell')) {
            const rowComponent = selected.parent();
            const rowIndex = rowComponent.collection.indexOf(rowComponent);
            const cells = rowComponent.components().length;
            const rowContainer = rowComponent.parent();

            rowContainer.components().add({
                type: 'row',
                components: [ ...Array(cells).keys() ].map(i => ({
                    type: 'cell',
                    components: {
                        type: 'text',
                        style: {
                            padding: "10px",
                            height: "100%"
                        },
                        content: 'insert text'
                    },
                }))
            }, { at: rowIndex });
        }
    });
};


export const CommandsPartsSave = (editor, handlePartsSave) => {

    const cssComposer =  editor.CssComposer
    const sm =  editor.SelectorManager;

    editor.Commands.add("app:partsSave", {
        run(editor: any) {
            const component = editor.getSelected();
            if (!component || !component.toHTML()) return
            const cssRule:any = []
            const sm = editor.SelectorManager;
            const html = component.toHTML({
                attributes(component, attributes) {
                    const classes = sm.add(component.getClasses());
                    const id = sm.add(component.getId());
                    classes.push(id)
                    const rule = cssComposer.add(classes)
                    cssRule.push(rule.toCSS());
                    return attributes;
                }
            });
            handlePartsSave(`${html}<style>${cssRule.join('\n')}</style>`);
        }
    });
};


export const CommandsAICheck = (editor) => {

    editor.Commands.add('app:AICheck', {
        run(editor, sender, data) {
            const document = editor.getWrapper()
            const {before, after} = data;

            // 表記揺れ
            after.variants_sentence.map( (target, index)  => {
                target.map(number => {
                    const {id, text } = before[number]
                    const component = document.find(`[id="${id}"]`);
                    component.map(j => {
                        const words = after.variants_word[index]
                        let html = j.toHTML();
                        words.map( key => {
                            html = html.replace(new RegExp(key,), `<span class="js-ai-variants">${key}</span>`)
                        })
                        j.replaceWith(html)
                    })
                })
            });

            after.zenkaku_sentence.map( (target, index)  => {
                target.map(number => {
                    const {id, text } = before[number];
                    const component = document.find(`[id="${id}"]`);
                    component.map(j => {
                        const words = after.zenkaku_word[index]
                        let html = j.toHTML();
                        words.map( key => {
                            html = html.replace(new RegExp(key,), `<span class="js-ai-zenkaku">${key}</span>`)
                        });
                        j.replaceWith(html)
                    })
                })
            });

            after.desumasu_sentence.map( (target, index)  => {
                target.map(number => {
                    const {id, text } = before[number];
                    const component = document.find(`[id="${id}"]`);
                    component.map(j => {
                        const words = after.desumasu_word[index]
                        let html = j.toHTML();
                        words.map( key => {
                            html = html.replace(new RegExp(key,), `<span class="js-ai-desumasu">${key}</span>`)
                        });
                        j.replaceWith(html)
                    })
                })
            });
        }
    });
};

export const CommandsComment = (editor, fetchState, handleHover) => {

    editor.Commands.add('app:comment', {
        run(editor, sender) {
            const select = editor.getSelected()
            const id = select.getId()
            fetchState({
                position: id,
                quote: '',
                isDisplayForm: true
            })

        }
    });
};

export const CommandsCommentHighLight = (editor, id) => {
    const wrapper = editor.DomComponents.getWrapper();
    const highlight = wrapper.find(".comment-highlight");
    highlight.map(model => {
        model.removeClass('comment-highlight');
    })
    if (id) {
        const components = editor.getWrapper()
        const target = components.find(`[id="${id}"]`);
        if (target.length) {
            target[0].addClass("comment-highlight");
            editor.Canvas.scrollTo(target[0], { behavior: 'smooth' });
        }
    }
};



export const CommandsLink = (editor) => {
    editor.Commands.add('app:link', {
        run(editor, sender) {
            const component = editor.getSelected();
            component.replaceWith(`<a href="" style="display: inherit;">${component.toHTML()}</a>`);
        }
    });
}


export const CommandsDiff = (editor) => {

    const selectDiff = () => {
        const wrap = editor.getWrapper();
        const dif = wrap.find('.diffmod, .diffdel, .diffins');
        dif.map((val) => {
            val.set({selectable: true});
        })
        editor.select(dif[0]);
    }

    // selectDiff()

    const  handleAccept = () => {
        const el = editor.getSelected();
        const coll = el.collection;
        const dom = el.getEl()
        const diffclss = el.getClasses()

        if (diffclss.indexOf("diffmod") >= 0){
            // 修正
            const index = coll.indexOf(el);
            const tag = dom.tagName
            if (tag === 'DEL') {
                const next = dom.nextElementSibling;
                const nextModel = coll.at(index + 1);
                nextModel.replaceWith(`${next.innerHTML}`);
                el.remove()
            } else {
                dom.replaceWith(`${dom.innerHTML}`);
                const previousModel = coll.at(index - 1);
                previousModel.remove()
            }

        } else if (diffclss.indexOf("diffdel") >= 0 ) {
            // 削除
            el.remove()
        } else if (diffclss.indexOf("diffins") >= 0) {
            // 追加
            dom.replaceWith(`${dom.innerHTML}`);
        }
        // selectDiff()
    }

    const  handleReject = () => {
        const target = editor.getSelected();
        reject(target)
        selectDiff()
    }

    editor.Commands.add('app:accept', {
        run(editor, sender) {
            handleAccept()
        }
    });

    editor.Commands.add('app:reject', {
        run(editor, sender) {
            handleReject()
        }
    });
};


const reject = (target) => {
    const dom = target.getEl()
    const coll = target.collection;
    const diffclss = target.getClasses()

    if (diffclss.indexOf("diffmod") >= 0){
        // 修正
        const index = coll.indexOf(target);
        const tag = dom.tagName
        if (tag === 'DEL') {
            dom.replaceWith(dom.innerHTML);
            const nextModel = coll.at(index + 1);
            nextModel.remove()
        } else {
            const prev = dom.previousElementSibling;
            const previousModel = coll.at(index - 1);
            previousModel.replaceWith(prev.innerHTML);
            target.remove()
        }
    } else if (diffclss.indexOf("diffdel") >= 0 ) {
        // 削除
        dom.replaceWith(`${dom.innerHTML}`);
    } else if (diffclss.indexOf("diffins") >= 0) {
        // 追加
        target.remove()
    }

}
