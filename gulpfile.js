var gulp = require('gulp');
var gutil = require('gulp-util');
var NwBuilder = require('node-webkit-builder');
var bower = require('bower');
var requirejsOptimize = require('gulp-requirejs-optimize');

gulp.task('copyindexhtml', function () {
    gulp.src('src/index.html')
        .pipe(gulp.dest('nwapp/'));
});

gulp.task('copypackagejson', function () {
    gulp.src('./package.json')
        .pipe(gulp.dest('nwapp/'));
});

gulp.task('installbowerdeps', function (done) {
    bower.commands.install([], {save: true}, {})
        .on('end', function(installed){
            done();
        });
});

gulp.task('copybowerdeps', ['installbowerdeps'], function () {
    gulp.src('./src/bower_components/**')
        .pipe(gulp.dest('nwapp/bower_components/'));
});

gulp.task('optimise', function () {
    return gulp.src('src/js/Application.js')
        .pipe(requirejsOptimize({
            name: 'Application'
        }))
        .pipe(gulp.dest('nwapp/js/'));
});

gulp.task('build', ['copyindexhtml', 'copypackagejson', 'copybowerdeps', 'optimise']);

gulp.task('nw', ['build'], function () {
    var nw = new NwBuilder({
        version: '0.12.2',
        files: './nwapp/**',
        platforms: ['win32', 'win64']
    });

    return nw.build().catch(function (err) {
        gutil.log('node-webkit-builder', err);
    });
});

gulp.task('default', ['nw']);
