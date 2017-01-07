var fh = {};

function gotFS(fs) {
	fs.root.getFile(FILENAME, {create: true, exclusive: false}, gotFileEntry, null);
}
function gotFileEntry(fileEntry) {
	fh.entry = fileEntry;
	fileEntry.createWriter(gotFileWriter, null);
}
function gotFileWriter(fileWriter) {
	fh.writer = fileWriter;
}
function saveText(val, callback) {
	fh.writer.onwriteend = function (evt) {
		fh.writer.seek(0);
        if (callback) {
            callback();
        }
	}
	fh.writer.write(val);
}
function readText(callback) {
	if (fh.entry) {
		fh.entry.file(function (file) {
			var reader = new FileReader();
			reader.onloadend = function (evt) {
				t = evt.target.result;
				callback(t);
			}
			reader.readAsText(file);
		}, null);
	}
	return false;
}
function clearText() {
	fh.writer.truncate(0);
}