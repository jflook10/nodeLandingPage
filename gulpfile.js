var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create(); 


gulp.task("styles", function(){
	gulp.src("./sass/main.scss") //source file entering compiler
	.pipe(sass().on('error', sass.logError))//pipe file into module
	.pipe(gulp.dest("./css")) //destination folder
	.pipe(browserSync.reload({stream: true})); //tell browerSync to reload
});


//serve up directory
gulp.task("serve", function(){
	browserSync.init({
		server:{
			baseDir: "./"
		}
	});

	gulp.watch("./sass/*.scss", ["styles"]); //run styles task on each change in scss
	gulp.watch("./**/*.html").on("change", browserSync.reload); //reload browswerSync if any html page is changed

});

//task when call gulp, compile sass then serve up files 
gulp.task("default", ["styles", "serve"])