export const PanelManagerInit = (editor, isEditor) => {
	const panelManager = editor.Panels;
	panelManager.removeButton("views", "open-layers");

	panelManager.removeButton("views", "commands");

	panelManager.removeButton("options", "preview");
	panelManager.removeButton("options", "fullscreen");
	panelManager.removeButton("options", "canvas-clear");
	panelManager.removeButton("options", "export-template");
	panelManager.removeButton("options", "canvas-clear");
	panelManager.removeButton("options", "gjs-open-import-webpage");

 	if (!isEditor) {
        panelManager.removePanel("views-container");
        panelManager.removePanel("views");
        panelManager.removePanel("options");
        panelManager.removeButton("views", "open-tm");
        panelManager.removeButton("views", "open-sm");
		panelManager.removePanel("devices-c");
		// block manager 非表示
		editor.on("run:core:open-blocks", () => {
			const views = document.querySelector(".gjs-blocks-cs") as HTMLElement
			if (views) views.style.display = 'none'
		});
	}

	//list1.appendChild(hoge);
	// // ブロックビュー表示タイミングでtabを追加
	// editor.on("run:core:open-blocks", () => {
	// 	if (document.getElementById("panelTab") === null) {
	// 		const panelView = document.querySelector(".gjs-blocks-cs") as HTMLElement || null;
	// 		const parent = (panelView as HTMLInputElement).parentNode;
	// 		if (parent) {
	// 			const subRoot = document.createElement("div");
	// 			subRoot.style.height = "100%";
	// 			parent.insertBefore(subRoot, panelView);
	// 			ReactDOM.render(component, subRoot);
	//
	// 			if (panelView) panelView.style.display = "none";
	// 		}
	// 	}
	// });

}

