import ImageComment from "../../../../assets/editor/toolbar_comment.svg";
import ImageRemove from "../../../../assets/editor/toolbar_remove_format.svg";
import ImageBold from "../../../../assets/editor/toolbar_bold.svg";
import ImageItalic from "../../../../assets/editor/toolbar_italic.svg";
import ImageStrikethrough from "../../../../assets/editor/toolbar_strikethrough.svg";
import ImageUnderline from "../../../../assets/editor/toolbar_underline.svg";
import ImageLink from "../../../../assets/editor/toolbar_link.svg";
import ImageListUi from "../../../../assets/editor/toolbar_list-ul.svg";
import ImageListOl from "../../../../assets/editor/toolbar_list-ol.svg";

export const RteManagerReview = (editor, setForm) => {

    const rte = editor.RichTextEditor;
    rte.remove('bold');
    rte.remove('italic');
    rte.remove('underline');
    rte.remove('strikethrough');
    rte.remove('link');

    // TODO https://github.com/artf/grapesjs/blob/688faaaa2a5be891545a45c086a735571d1fb67a/src/rich_text_editor/model/RichTextEditor.js

    // const addComment = (editor)=>{
    //     const select = editor.getSelected()
    //     consle.log(editor)
    //     select.addClass('has-comment');
    //     select.addAttributes({'data-comment': position});
    // }

    if (!rte.get('comment')) {

        rte.add('comment', {
            icon: `<img src="${ImageComment}">`,
            // Bind the 'result' on 'change' listener
            event: 'click',
            result: (rte, action) => {
                const element = document.querySelector('.gjs-frame') as HTMLIFrameElement
                const iframe:any = element.contentDocument;
                const select = iframe.getSelection()
                const text = select.toString()
                const component = editor.getSelected()
                if (text.length && component) {
                    const id = component.getId()
                    setForm(id, text)
                }
            },
            // Reset the select on change
            update: (rte, action) => { action.btn.firstChild.value = "";}
        })
    }
};

export const RteManagerDiff = (editor) => {

    const rte = editor.RichTextEditor;
    rte.remove('bold');
    rte.remove('italic');
    rte.remove('underline');
    rte.remove('strikethrough');
    rte.remove('link');
    rte.remove('comment');
};
