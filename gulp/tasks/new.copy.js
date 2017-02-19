'use strict';


// new task copy

module.exports = function() {
	
	$.gulp.task('new.copy', function(){
	  return $.gulp.src('./IMAGES-NEW/*.png')
	    .pipe($.gulp.dest('./APP/img/'));
	});
};