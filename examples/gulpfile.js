"use strict";
// 引入 gulp
var gulp = require("gulp");
// 引入组件
var zip = require("../");
gulp.task("default", function() {
	return gulp.src("./src/*")
		.pipe(zip({
			name: "demo.zip",
			outpath: "./dist"
		}));
})