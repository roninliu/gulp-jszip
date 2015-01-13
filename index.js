'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var chalk = require('chalk');
var fs = require("fs-extra");
var jszip = require("jszip");
var zip = new jszip();

/**
 * [exports gulp 打包文件夹下面所有文件]
 * @param  {[options.name]}  [打包的文件zip名字，默认dist.zip]
 * @param  {[options.outpath]}  [打包文件输出位置，默认 gulpfile通缉的dist文件夹下]
 * @return {[null]}         [无]
 */
module.exports = function(options) {
	options = options || {};
	var _root = null;
	var _name = options.name || "dist.zip";
	var _outpath = options.outpath || "dist";
	var _getFileList = function(_path) {
		var _fileslist = [];
		var _files = fs.readdirSync(_path);
		_files.forEach(function(file) {
			var _pathname = _path + "/" + file;
			var _stat = fs.lstatSync(_pathname);
			if (!_stat.isDirectory()) {
				_fileslist.push(_pathname.replace(_root + "/", ""));
			} else {
				_fileslist = _fileslist.concat(_getFileList(_pathname));
			}
		})
		return _fileslist;
	}
	return through.obj(function(file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}
		if (file.isStream()) {
			cb(new gutil.PluginError(gutil.colors.red("[Error]"), gutil.colors.cyan("Streaming not supported")));
			return;
		}
		var _that = this;
		if (_root == null) {
			_root = file.path.replace(file.relative, "");
		}
		var _files = _getFileList(_root);
		if (_files != null && _files.length != 0) {
			for (var i = 0; i < _files.length; i++) {
				var content = fs.readFileSync(_root + "/" + _files[i]);
				zip.file(_files[i], content);
			};
		}
		var buffer = zip.generate({
			type: "nodebuffer"
		});
		fs.writeFile(_name, buffer, function() {
			fs.move(_name, _outpath + "/" + _name, {
				clobber: true
			}, function(error) {
				_that.push(null);
				cb();
			})
		});
	})
};