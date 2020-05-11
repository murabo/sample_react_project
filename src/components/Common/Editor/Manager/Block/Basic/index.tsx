import {
    EDITOR_BASIC_TYPE,
	EDITOR_PARTS_TYPE
} from "../../../../../../config/editor_category_type";

import {
	CONTACT_CLOSED,
	CONTACT_PUBLIC,
	CONTACT_LABEL
} from "../../../../../../config/contact";

const isDevelop = window.location.hostname === "localhost" ? true : false;


const styleFooter = `
		.${CONTACT_LABEL} {
			margin-top: 10px;
			background: #484848;
			text-align: center;
			width: 100%;
			display: block;
			padding: 5px;
			color: #fff;
			border: 1px solid #333;
		}
		.contact {
			border: 1px solid #333;
			text-align: center;
		}
    	`;


export const BasicBlockManagerInit = (editor, isPressKit) => {

	const blockManager = editor.BlockManager;
	blockManager.remove("quote");
	blockManager.remove("image");
	blockManager.remove("video");
	blockManager.remove("map");
	blockManager.remove("flexbox");
	blockManager.remove("text-basic");
    blockManager.remove("radio");
    blockManager.remove("h-navbar");
    blockManager.remove("radio");
    blockManager.remove("countdown");
    blockManager.remove("form");
    blockManager.remove("input");
    blockManager.remove("textarea");
    blockManager.remove("select");
    blockManager.remove("button");
    blockManager.remove("label");
    blockManager.remove("checkbox");
    blockManager.remove("radio");
    blockManager.remove("text");


	const c:any = {};
	let bm = editor.BlockManager;
	let blocks = c.blocks || [];
	let stylePrefix = 'gjs-';
	const flexGrid = c.flexGrid;
	const basicStyle = c.addBasicStyle;
	const clsRow = `${stylePrefix}row`;
	const clsCell = `${stylePrefix}cell`;
	const styleRow = flexGrid ? `
    .${clsRow} {
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      flex-wrap: nowrap;
      padding: 10px;
    }
    @media (max-width: 768px) {
      .${clsRow} {
        flex-wrap: wrap;
      }
    }` : `
    .${clsRow} {
      display: table;
      padding: 10px;
      width: 100%;
    }
    @media (max-width: 768px) {
      .${stylePrefix}cell, .${stylePrefix}cell30, .${stylePrefix}cell70 {
        width: 100%;
        display: block;
      }
    }`;
	const styleClm = flexGrid ? `
    .${clsCell} {
      min-height: 75px;
      flex-grow: 1;
      flex-basis: 100%;
    }` : `
    .${clsCell} {
      width: 8%;
      display: table-cell;
      height: 75px;
    }`;
	const styleClm30 = `
  .${stylePrefix}cell30 {
    width: 30%;
  }`;
	const styleClm70 = `
  .${stylePrefix}cell70 {
    width: 70%;
  }`;

	const step = 0.2;
	const minDim = 1;
	const currentUnit = 1;
	const resizerBtm = { tl: 0, tc: 0, tr: 0, cl: 0, cr:0, bl:0, br: 0, minDim };
	const resizerRight:any = { ...resizerBtm, cr: 1, bc: 0, currentUnit, minDim, step };

	// Flex elements do not react on width style change therefore I use
	// 'flex-basis' as keyWidth for the resizer on columns
	if (flexGrid) {
		resizerRight.keyWidth = 'flex-basis';
	}

	const rowAttr = {
		class: clsRow,
		'data-gjs-droppable': `.${clsCell}`,
		'data-gjs-resizable': resizerBtm,
		'data-gjs-name': 'Row',
	};

	const colAttr = {
		class: clsCell,
		'data-gjs-draggable': `.${clsRow}`,
		'data-gjs-resizable': resizerRight,
		'data-gjs-name': 'Cell',
	};

	if (flexGrid) {
		colAttr['data-gjs-unstylable'] = ['width'];
		colAttr['data-gjs-stylable-require'] = ['flex-basis'];
	}

	// Make row and column classes private
	const privateCls = [`.${clsRow}`, `.${clsCell}`];
	editor.on('selector:add', selector =>
		privateCls.indexOf(selector.getFullName()) >= 0 && selector.set('private', 1))

	const attrsToString = attrs => {
		const result:any = [];

		for (let key in attrs) {
			let value = attrs[key];
			const toParse = value instanceof Array || value instanceof Object;
			value = toParse ? JSON.stringify(value) : value;
			result.push(`${key}=${toParse ? `'${value}'` : `"${value}"`}`);
		}
		return result.length ? ` ${result.join(' ')}` : '';
	};

	const attrsRow = attrsToString(rowAttr);
	const attrsCell = attrsToString(colAttr);

	blockManager.add("textBlock", {
        label: "テキスト",
        category: EDITOR_PARTS_TYPE,
        attributes: { class: "gjs-material-icon gjs-f-text" },
		content: `<div ${attrsRow}>
			<div ${attrsCell}>
				  <div style="padding: 10px">テキスト</div>
			</div>
		</div>`
    });

    blockManager.add("imageBlock", {
		label: "画像",
		category: EDITOR_PARTS_TYPE,
		attributes: { class: "gjs-material-icon gjs-icon-image" },
		content: `<div ${attrsRow}>
			<div ${attrsCell}>
				  <img src="" alt="Image" style="width: 100%; height: auto; flex-shrink: 0; align-self: flex-start; vertical-align: bottom;"/>
			</div>
		</div>`
	});

	blockManager.add("hr", {
		label: "仕切り線",
		type: 'hr',
		category: EDITOR_PARTS_TYPE,
		attributes: { class: "gjs-material-icon gjs-icon-hr" },
		content: {
			tagName: 'hr',
			activeOnRender: 1,
			type: "hr",
			style: {"margin": "5px 0", "border-bottom": "1px solid #333", "border-top": "none", "height": "1px", "background": "none"},
			removable: true,
			copyable: true,
			editable: true,
		},
	});

    if (isPressKit) {
		blockManager.add("videoBlock", {
		label: "動画",
		attributes: { class: "gjs-material-icon gjs-icon-video" },
			content: `<div ${attrsRow}>
							<div ${attrsCell}>
								  <video width="100%" src='https://storage.googleapis.com/harvest_press/movie/8b9b5f69473a45c5816d3124656d9875/harvest2.mov'></video>
							</div>
						</div>`,
			category: EDITOR_PARTS_TYPE,
		});
	}

	blockManager.add("table-block", {
		id: "table",
		label: "Table",
		category: EDITOR_PARTS_TYPE,
		attributes: { class: "gjs-material-icon gjs-icon-table" },
		content: `
		<div style="padding: 10px;">
			 <table width="100%" border="1" style="font-size: 14px;  table-layout: auto; border-collapse: collapse" cellpadding="15">
				  <tr>
					  <td style="padding: 10px; height: 100%;"><div style="padding: 5px;">text</div></td>
					  <td style="padding: 10px; height: 100%;"><div style="padding: 5px;">text</div></td>
					  <td style="padding: 10px; height: 100%;"><div style="padding: 5px;">text</div></td>
				  </tr>
				  <tr>
					  <td style="padding: 10px; height: 100%;"><div style="padding: 5px;">text</div></td>
					  <td style="padding: 10px; height: 100%;"><div style="padding: 5px;">text</div></td>
					  <td style="padding: 10px; height: 100%;"><div style="padding: 5px;">text</div></td>
				  </tr>
					<tr>
					  <td style="padding: 10px; height: 100%;"><div style="padding: 5px;">text</div></td>
					  <td style="padding: 10px; height: 100%;"><div style="padding: 5px;">text</div></td>
					  <td style="padding: 10px; height: 100%;"><div style="padding: 5px;">text</div></td>
				  </tr>
			  </table>
		  </div>`,
	});

    if (!isPressKit) {

		blockManager.add("contact", {
			label: "お問い合わせ(一般)",
			category: EDITOR_PARTS_TYPE,
			removable: false,
			copyable: false,
			editable: false,
			content: `<div class="gjs-row">
						<div style="padding: 10px; width: 100%; text-align: center">
							<span style="font-weight: bold; font-size: 16px">本件に関するお問い合わせ先</span><br/>
							株式会社〇〇 広報部<br/>
							info＠xxx.jp
						</div>
						</div>
						<style>
						${styleFooter}
						</style>`,
		});

		blockManager.add("contactMedia", {
			label: "お問い合わせ(メディア用)",
			category: EDITOR_PARTS_TYPE,
			removable: false,
			copyable: false,
			editable: false,
			content: `<div class="gjs-row">
						<div style="padding: 10px; width: 100%; text-align: center">
							<span style="font-weight: bold; font-size: 16px">本件に関するお問い合わせ先</span><br/>
							担当: 広報部 ハーベスト太郎<br/>
							携帯電話: xxx-xxx-xxx<br/>
							メールアドレス: xxx@malsb.jp<br/>
						</div>
						</div>
						<style>
						${styleFooter}
						</style>`,
		});
	}

	// blockManager.add("newPage", {
	// 	label: "PDF用改ページ",
	// 	attributes: { class: "gjs-material-icon gjs-icon-hr" },
	// 	content: {
	// 		activeOnRender: 1,
	// 		content: `<hr class='newPae'>
	// 					 <style>
	// 					${styleNewPage}
	// 					</style>`,
	// 	},
	// 	category: EDITOR_PARTS_TYPE,
	// });



	const link = blockManager.get('link-block');

	// // 開発用
	// blockManager.add("buttonLink", {
	// 	...link.attributes,
	// 	label: "リンク",
	// 	attributes: { class: "gjs-material-icon gjs-icon-link" },
	// 	category: EDITOR_PARTS_TYPE,
	// 	style: {
	// 		padding: "10px",
	// 		height: "100%",
	// 		width: "100%",
	// 	}
	// });

	// // 開発用
	// blockManager.add("buttonLink2", {
	// 	label: "リンクボタン",
	// 	style: {
	// 		padding: "10px",
	// 		height: "100%"
	// 	},
	// 	attributes: { class: "gjs-material-icon gjs-icon-button" },
	// 	removable: true,
	// 	copyable: true,
	// 	editable: true,
	// 	content: `<a class="row" style="width: 100%; display: inline-block; padding: 10px; background: orange; border-radius: 4px; font-size: 14px; color: #fff; text-align: center; font-weight: bold; margin: auto;">
	// 			  	リンク
	// 		  	  </a>`,
	// 	category: EDITOR_PARTS_TYPE,
	// });

	if (isDevelop) {
		// 開発用
		blockManager.add("contact", {
			label: "contact",
			category: EDITOR_PARTS_TYPE,
			removable: false,
			copyable: false,
			editable: false,
			content: `<label class="${CONTACT_LABEL}" data-gjs-removable="false" data-gjs-selectable="false" data-gjs-hightable="false">お問い合わせ(一般公開用PDFのみ表示されます)</label>
						<div id=${CONTACT_PUBLIC} class="gjs-row contact" data-gjs-removable="false" data-gjs-selectable="false" data-gjs-hightable="false">
							<div style="padding: 10px; width: 100%" data-gjs-removable="false">
								<span style="font-size: 16px; font-weight: bold">本件に関するお問い合わせ先</span><br/>
								株式会社〇〇 広報部<br/>
								info＠xxx.jp
							</div>
						</div>
						<label style="margin-top: 10px;" class="${CONTACT_LABEL}" data-gjs-removable="false" data-gjs-selectable="false" data-gjs-hightable="false">お問い合わせ(メディア専用PDFのみ表示されます)</label>
						<div id=${CONTACT_CLOSED} class="gjs-row contact" data-gjs-removable="false" data-gjs-selectable="false" data-gjs-hightable="false">
							<div style="padding: 10px; width: 100%" data-gjs-removable="false">
								<span style="font-size: 16px; font-weight: bold">本件に関するお問い合わせ先</span><br/>
								担当: 広報部 ハーベスト太郎<br/>
								携帯電話: xxx-xxx-xxx<br/>
								メールアドレス: xxx@malsb.jp<br/>
							</div>
						</div>
						<style>
						${styleFooter}
						</style>`,
		});

		// //開発用
		// blockManager.add("footer", {
		// 	label: "footer",
		// 	content: `<footer class="row" id="js-footer">
		// 		  <div class="cell">
		// 		  	<p>見出し</p>
		// 		  </div>
		// 		  <div class="cell">
		// 			<p>テキストを入力</p>
		// 		  </div>
		// 	  	  </footer>
		// 	  	  <style>
		// 			${styleFooter}
		// 		  </style>`,
		// 	category: EDITOR_PARTS_TYPE,
		// });
	}
};
