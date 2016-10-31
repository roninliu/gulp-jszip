Gulp.js: gulp-jszip
=================
gulp-jszip是一个打包指定文件夹下面所有的内容的gulp插件，在指定位置生成zip文件.


安装(Installation)
------------

    npm install --save gulp-jszip



使用(Usage)
-----

```javascript
var zip = require('gulp-jszip') 
```


参数(Methods)
-------

### name:String,生成的zip文件名，default:dist.zip
### outpath:String,生成的zip文件位置，default:dist(和gulpfile同级)

Examples(in gulpfile):

```javascript
// 引入 gulp
var gulp = require("gulp");
// 引入组件
var zip = require("gulp-jszip");
gulp.task("zip", function() {
    return gulp.src("./src/*")
        .pipe(zip({
            name: "demo.zip",
            outpath: "./dist"
        }));
})
```

Run:

```javascript
gulp zip
```



License
-------


Licensed under MIT

Copyright (c) 2014-2016 Roninliu




