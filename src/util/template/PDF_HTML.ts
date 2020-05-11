export const PDF_HTML = `
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>HARVEST</title>
<meta name="viewport" content="width=device-width">
<meta name="keywords" content="">
<meta name="description" content="">
</head>
<link href="https://fonts.googleapis.com/css?family=Kosugi|Kosugi+Maru|M+PLUS+1p|M+PLUS+Rounded+1c|Noto+Sans+JP|Noto+Serif+JP|Sawarabi+Gothic|Sawarabi+Mincho&display=swap" rel="stylesheet">
<style>
	html{box-sizing:border-box;-webkit-text-size-adjust:100%;word-break:break-word;-moz-tab-size:4;tab-size:4}*,:after,:before{background-repeat:no-repeat;box-sizing:inherit}:after,:before{text-decoration:inherit;vertical-align:inherit}*{padding:0;margin:0}hr{overflow:visible;height:0}details,main{display:block}summary{display:list-item}small{font-size:80%}[hidden]{display:none}abbr[title]{border-bottom:0;text-decoration:underline;text-decoration:underline dotted}a{background-color:transparent}a:active,a:hover{outline-width:0}code,kbd,pre,samp{font-family:monospace}pre{font-size:1em}b,strong{font-weight:bolder}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}input{border-radius:0}[disabled]{cursor:default}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type="search"]::-webkit-search-decoration{-webkit-appearance:none}textarea{overflow:auto;resize:vertical}button,input,optgroup,select,textarea{font:inherit}optgroup{font-weight:700}button{overflow:visible}button,select{text-transform:none}[role=button],[type=button],[type=reset],[type=submit],button{cursor:pointer;color:inherit}[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner,button:-moz-focusring{outline:1px dotted ButtonText}[type=reset],[type=submit],button,html [type="button"]{-webkit-appearance:button}button,input,select,textarea{background-color:transparent;border-style:none}select{-moz-appearance:none;-webkit-appearance:none}select::-ms-expand{display:none}select::-ms-value{color:currentColor}legend{border:0;color:inherit;display:table;white-space:normal;max-width:100%}::-webkit-file-upload-button{-webkit-appearance:button;color:inherit;font:inherit}img{border-style:none}progress{vertical-align:baseline}svg:not([fill]){fill:currentColor}@media screen{[hidden~=screen]{display:inherit}[hidden~="screen"]:not(:active):not(:focus):not(:target){position:absolute!important;clip:rect(0 0 0 0)!important}}[aria-busy=true]{cursor:progress}[aria-controls]{cursor:pointer}[aria-disabled]{cursor:default}
</style>
<style>
{{style}}
</style>
<body>
  <div id="contents">
	    {{HTML}}
	</div>
	</body>
</html>
`