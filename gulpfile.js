var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    shell = require('gulp-shell'),
    livereload = require('gulp-livereload');


gulp.task('compass', shell.task([
  'compass compile'
]));


gulp.task('watch', function(){
  
  livereload.listen();
  
  gulp.watch('htdocs/scss/**/*.scss', function(event){
    gulp.run('compass');
  });
  
  gulp.watch([
    'htdocs/**/*.html',
    'htdocs/**/*.php',
    'htdocs/**/*.css',
    'htdocs/**/*.js'
  ]).on('change', livereload.changed);
  
});


gulp.task('default', ['watch']);



gulp.task('pull', shell.task([
  'git pull origin master'
]));

gulp.task('push', shell.task([
  'git add -A',
  'git commit -m "auto commit"',
  'git pull origin master',
  'git push origin master'
]));

