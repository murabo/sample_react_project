export const AssetManagerInit = (editor, handleDeleteImage, handleDeleteMovie) => {

	const assetManager = editor.AssetManager;

	// image、videoモーダルの表示内容
    assetManager.addType('image', {
        view: {
            getPreview() {
                const that:any = this;
                const url = that.model.get('src');
                const name = getFileName(that.model.get('src'));
                if(isImages(name)) {
                    return `<div class="gjs-am-preview" style="background-image: url('${url}');"></div>`;
				} else {
                    return `<video src="${url}"></video>`;
				}
            },
            getInfo() {
                const that:any = this;
                return `<div>${getFileName(that.model.get('src'))}</div>`;
            },
            onRemove(e) {
                e.stopPropagation();
                const that:any = this;
                const meta = e.target.previousElementSibling
                if (isImages(meta.firstElementChild.textContent)) {
                    handleDeleteImage(that.model.get('category'))
                } else {
                    handleDeleteMovie(that.model.get('category'))
                }
            }
        }
    });

    function getFileName(url) {
        return url.match(".+/(.+?)([\?#;].*)?$")[1];
    }

     function isImages(url) {
        return url.match(/\.(jpeg|jpg|gif|png|svg|JPEG|PNG|jpen|ico)$/) != null;
     }

}
