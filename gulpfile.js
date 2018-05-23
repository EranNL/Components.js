// const elixir = require('laravel-elixir');
//
// require('laravel-elixir-vue-2');
//
// /*
//  |--------------------------------------------------------------------------
//  | Elixir Asset Management
//  |--------------------------------------------------------------------------
//  |
//  | Elixir provides a clean, fluent API for defining some basic Gulp tasks
//  | for your Laravel application. By default, we are compiling the Sass
//  | file for your application as well as publishing vendor resources.
//  |
//  */
//
// elixir((mix) => {
//     mix.browserify('app.js');
// });
var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var chalk = require('chalk');
var sass = require('gulp-sass');

gulp.task('javascript', function () {
    //Order: Base files, Extendable files, other files.
    return gulp.src([
        'src/javascript/*.js',
        'src/javascript/**/*.js',
        //'resources/assets/js/components/Node.js',
        //'resources/assets/js/events/Event.js',
        //'resources/assets/js/events/*.js',
        //'resources/assets/js/components/*.js'
    ])
    .pipe(babel({
        presets: ['es2015']
    }).on('error', logError))
        .pipe('bundle.js')
    .pipe(gulp.dest('build'));
});

gulp.task('sass', function () {
    return gulp.src([
        'src/sass/**/*.scss',
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'));
})

gulp.task('watch', function () {
    gulp.watch('src/javascript/**/*', ['javascript']);
    gulp.watch('src/sass/**/*', ['sass']);
})

gulp.task('default', ['watch']);

function logError(err) {
    console.log(
    chalk.red(
      err.fileName +
      (
          err.loc ?
          '(' + err.loc.line + ',' + err.loc.column + '): ' :
          ': '
      )
    ) +
    'error Babel: ' + err.message + '\n' +
    err.codeFrame
  );

  this.emit('end')
}
