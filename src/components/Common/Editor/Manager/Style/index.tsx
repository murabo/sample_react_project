export const StyleManagerInit = (editor) => {
	const styleManager = editor.StyleManager;

	// スタイル-------------------
	styleManager.removeSector("extra");
	styleManager.removeSector("decorations");
	styleManager.removeSector("general");
	styleManager.removeSector("typography");
	styleManager.removeSector("layout");

	const cc = editor.CssComposer;

	var sm = editor.SelectorManager;

	cc.setRule('body', {
		"font-size": "14px",
		color: "#333",
		"font-family": `-apple-system, BlinkMacSystemFont, "Helvetica Neue", YuGothic, "ヒラギノ角ゴ ProN W3", Hiragino Kaku Gothic ProN, Arial, "メイリオ", Meiryo, sans-serif;`
	});

	cc.setRule('a:link,a:visited,a:hover,a:active', {color: "inherit"});

	cc.setRule('.gjs-row .gjs-row', {
		"flex-wrap": "nowrap !important;",
	}, {
		atRuleType: 'media',
		atRuleParams: '(max-width: 768px)',
	});

	cc.setRule('.gjs-cell', {
		"min-height": "55px !important;",
	});

	// コマンド監視
	editor.on("component:selected", (commandId: any) => {

		const layout = document.getElementById('gjs-sm-all') as HTMLElement;
		const img = document.getElementById('gjs-sm-img') as HTMLElement;
		const text = document.getElementById('gjs-sm-text') as HTMLElement;
		const hr = document.getElementById('gjs-sm-hr') as HTMLElement;

		const component = editor.getSelected();
		const type = component.attributes.type

		switch (type) {
			case 'hr':
				hr.setAttribute('style','height:auto;overflow:visible;');
				text.setAttribute('style','height:0;overflow:hidden;');
				layout.setAttribute('style','height:0;overflow:hidden;');
				img.setAttribute('style','height:0;overflow:hidden;');
				break;
			case 'text':
				hr.setAttribute('style','height:0;overflow:hidden;');
				text.setAttribute('style','height:auto;overflow:visible;');
				layout.setAttribute('style','height:0;overflow:hidden;');
				img.setAttribute('style','height:0;overflow:hidden;');
		        break;
			case 'image':
			case 'video':
			case 'link':
				hr.setAttribute('style','height:0;overflow:hidden;');
				text.setAttribute('style','height:0;overflow:hidden;');
				layout.setAttribute('style','height:0;overflow:hidden;');
				img.setAttribute('style','height:auto;overflow:visible;');
				break;
		    default:
				hr.setAttribute('style','height:0;overflow:hidden;');
				text.setAttribute('style','height:0;overflow:hidden;');
				layout.setAttribute('style','height:0;overflow:visible;');
				img.setAttribute('style','height:0;overflow:hidden;');
		}
	});

};
