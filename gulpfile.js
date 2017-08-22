/* eslint-disable no-console */
const gulp = require('gulp')
const eslint = require('gulp-eslint')
const merge = require('merge-stream')
const gulpIf = require('gulp-if')

// Has ESLint fixed the file contents?
// See: https://stackoverflow.com/questions/37107999/how-to-fix-files-with-gulp-eslint
function isFixed(file) {
  console.log(' --------- file eslint?', file.eslint && Object.keys(file.eslint))
  return file.eslint != null && file.eslint.fixed
}

gulp.task('lint', () =>
  merge(
    gulp
      .src(['**/*.js', '!node_modules/**'])
      .pipe(eslint({ configFile: './.eslintrc', fix: true }))
      .pipe(eslint.format())
      .pipe(gulpIf(isFixed, gulp.dest('./')))
      .pipe(eslint.failAfterError()),
    gulp
      .src(['**/*.hbs', '!node_modules/**'])
      .pipe(eslint({ configFile: './.eslintrc-script-tag', fix: true }))
      .pipe(eslint.format())
      .pipe(gulpIf(isFixed, gulp.dest('./')))
      .pipe(eslint.failAfterError()),
  ),
)
