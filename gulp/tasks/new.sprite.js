'use strict';


// new task sprite

module.exports = function() {

	$.gulp.task('new.sprite', function () {
	  return $.gulp.src('./IMAGES-NEW/*.png')
	  	.pipe($.gp.spritesmith({
		    imgName: 'sprite.png',
		    cssName: 'sprite.css'
	  }))
	  .pipe($.gulp.dest('./APP/sprite/'))
	});

};


