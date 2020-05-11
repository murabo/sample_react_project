export const  getMimeType = (header) => {
	'use strict';

	var retv = '';
	switch (true) {
		case header.startsWith('89504e47'):
			retv = 'image/png';
			break;
		case header.startsWith('424d'):
			retv = 'image/bmp';
			break;
		case header.startsWith('47494638'):
			retv = 'image/gif';
			break;
		case header.startsWith('ffd8ff'):
			retv = 'image/jpeg';
			break;
		case header.startsWith('25504446'):
			// こんな風に画像以外にも応用可能ですよ。
			retv = 'application/pdf';
			break;
		case header.startsWith('0'.repeat(128) + '4449434d'):
			// DICOMは先頭128byteのNULL文字のあと、DICMが来る。
			// …まあ、DICOMヘッダが無い
			// いわゆる規約違反のDICOMファイルもたまにあるんですけどね…
			retv = 'application/dicom';
			break;
		default:
			retv = 'unknown';
			break;
		// 他にもシグネチャに応じた対応は可能かと思いますので、
		// Wikipediaなど参考にされるのもよいのではないでしょか。
	}
	return retv;
}
