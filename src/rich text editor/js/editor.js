/**get frame object as a global variable*/
var editor = document.getElementById('editor');

/**color for font*/
var fontColor = 'black';

function setBold() {
	editor.contentDocument.execCommand('Bold', false, null);
}

function setItalic() {
	editor.contentDocument.execCommand('italic', false, null);
}

function setUnderline() {
	editor.contentDocument.execCommand('Underline', false, null);
}

function setColor() {
	editor.contentDocument.execCommand('forecolor', false, fontColor);
}

function chooseColor(color) {
	fontColor = color;
	document.getElementById('colorBar').style.background = color;
}

function setDeleteLine() {
	editor.contentDocument.execCommand('strikethrough', false, null);
}

function setOrderList() {
	editor.contentDocument.execCommand('InsertOrderedList', false, null);
}

function setNoOrderList() {
	editor.contentDocument.execCommand('insertunorderedlist', false, null);
}

function setIndent() {
	editor.contentDocument.execCommand('indent', false, null);	
}

function setOutdent() {
	editor.contentDocument.execCommand('outdent', false, null);		
}

function setHorizontalLine() {
	editor.contentDocument.execCommand('inserthorizontalrule', false, null);	
}

function setJustifyLeft() {
	editor.contentDocument.execCommand('justifyleft', false, null);		
}

function setJustifyCenter() {
	editor.contentDocument.execCommand('justifycenter', false, null);		
}

function setJustifyRight() {
	editor.contentDocument.execCommand('justifyright', false, null);		
}

function setAnchor() {
	var url = prompt("please input url");
	editor.contentDocument.execCommand('createlink', false, url);	
}

function deleteAnchor() {
	editor.contentDocument.execCommand('unlink', false, null);		
}

function removeformat() {
	editor.contentDocument.execCommand('removeformat', false, null);	
}

function filePath() {

	//点击file元素查找文件目录
	var file = document.getElementById("file");
	file.click();
}

function insertImage(file) {

	//FF files对象
	var files = file.files,
		url;

	window.URL = window.URL || window.webkitURL;

	if (files.length) {
		for (var i=0; i<files.length; i++)
		//FF获取文件绝对路径，加密的。。。
		url = window.URL.createObjectURL(files[i]);
		editor.contentDocument.execCommand('insertimage', false, url);
		window.URL.revokeObjectURL(url);
	}
}
