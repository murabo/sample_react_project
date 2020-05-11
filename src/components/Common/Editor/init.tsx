import gjsBasicBlocks from "grapesjs-blocks-basic";
import gjsImageEditor from "grapesjs-tui-image-editor";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsBlockFlexbox from "grapesjs-blocks-flexbox";
import gjsCkeditor from "grapesjs-plugin-ckeditor";
import "grapesjs-blocks-flexbox/dist/grapesjs-blocks-flexbox.min.js";
import CKEDITOR from "ckeditor/ckeditor";
import canvasConfig from "./Manager/Canvas";
import styleManagerConfig from "./Manager/Style/styleManager.json";

export const id = "grapesjs-react-editor";

let plugins = [
	gjsBasicBlocks,
	gjsPresetWebpage,
	gjsBlockFlexbox,
	gjsCkeditor,
];


export const config = {
	container: `#${id}`,
	plugins,
	pluginsOpts: {
		[gjsBasicBlocks]: {
			blocks: ["column1", "column2", "column3", "column3-7"],
			labelColumn1: "1カラム",
			labelColumn2: "2カラム",
			labelColumn3: "3カラム",
			labelColumn37: "3-7カラム",
			flexGrid: true,
			category: "ブロック",
		},
		"grapesjs-tui-image-editor": {
			config: {
				includeUI: {
					initMenu: "filter",
				},
				labelImageEditor: "画像編集",
				icons: false,
			},
		},
		[gjsCkeditor]: {
			position: "center",
			options: {
				startupFocus: true,
				// Allows any class and any inline style
				extraAllowedContent: "*(*);*{*}",
				// Disable auto-formatting, class removing, etc.
				allowedContent: true,
				enterMode: CKEDITOR.ENTER_BR,
				extraPlugins: "colordialog,sharedspace,justify,colorbutton,panelbutton,font",
				toolbar: [
					{ name: "styles", items: ["Font", "FontSize"] },
					["Bold", "Italic", "Underline", "Strike"],
					{ name: "paragraph", items: ["NumberedList", "BulletedList"] },
					{ name: "links", items: ["Link", "Unlink"] },
					{ name: "colors", items: ["TextColor", "BGColor"] },
					{ name: 'insert', items: [ 'Table', 'HorizontalRule', 'CreateDiv', 'CodeSnippet', 'Code'] },
				],
				contentsCss:'//fonts.googleapis.com/css?family=Kosugi|Kosugi+Maru|M+PLUS+1p|M+PLUS+Rounded+1c|Noto+Sans+JP|Noto+Serif+JP|Sawarabi+Gothic|Sawarabi+Mincho&display=swap',
				font_names:"ＭＳ Ｐゴシック/MS PGothic;" +
					"ＭＳ ゴシック/MS Gothic;" +
					"ＭＳ Ｐ明朝/MS PMincho;" +
					"ＭＳ 明朝/MS Mincho;" +
					"メイリオ/Meiryo;" +
					"Meiryo UI/Meiryo UI;" +
					"游ゴシック/Yu Gothic;" +
					"游明朝/Yu Mincho;" +
					"ヒラギノ角ゴ Pro/Hiragino Kaku Gothic Pro; Hiragino Kaku Gothic ProN; HiraKakuProN-W3;" +
					"ヒラギノ丸ゴ Pro/Hiragino Maru Gothic Pro; Hiragino Maru Gothic ProN;" +
					"ヒラギノ明朝 Pro/Hiragino Mincho Pro; Hiragino Mincho ProN; HiraMinProN-W3;" +
					"Noto Serif JP/Noto Serif JP;" +
					"M PLUS Rounded 1c/M PLUS Rounded 1c;" +
					"Noto Sans JP/Noto Sans JP;" +
					"Sawarabi Gothic/Sawarabi Gothic;" +
					"Kosugi Maru/Kosugi Maru;" +
					"M PLUS 1p/M PLUS 1p;" +
					"Sawarabi Mincho/Sawarabi Mincho;" +
					"Kosugi/Kosugi;" +
					"Sawarabi Gothic/Sawarabi Gothic;" +
					"Helvetica/Helvetica;" +
					"Oswald/'Oswald', sans-serif;" +
					"sans-serif/sans-serif;" +
					"Times New Roman/Times New Roman;" +
					"Tahoma/Tahoma;" +
					"Verdana, Geneva, sans-serif/Verdana, Geneva, sans-serif;" +
					"Courier New Courier, monospace/Courier New Courier, monospace;" +
					"Lato/'Lato', sans-serif;" +
					"Montserrat/'Montserrat', sans-serif;" +
					"M PLUS Rounded 1/M PLUS Rounded 1c;" ,
				// // スペルチェック機能OFF
				scayt_autoStartup: false,
				// 自動で空白を挿入しないようにする
				fillEmptyBlocks: false,
				// テンプレート挿入時に編集中の内容と置き換えるデフォルトのチェックを外す。
				templates_replaceContent: false,
				removePlugins:'divarea',
				basicEntities : false,
				entities : false,
				dtd: {
					editable:  {
						span: true,
						a: true
					}
				}
			},
		},
	},
	fromElement: true,
	storageManager: { type: null },
	canvas: {
		...canvasConfig,
	},
	height:"100vh",
	noticeOnUnload: 0,
	styleManager: { ...styleManagerConfig },
	assetManager: {
		uploadText: "ファイルをドラック&ドロップしてくさい。",
		addBtnText: "ファイルを追加",
		modalTitle: "ファイルを選択",
		upload: 0,
	},
	devicePreviewMode: 0,
};

