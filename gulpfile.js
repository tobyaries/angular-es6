let gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    _ = gulpLoadPlugins(),
    argv = require('yargs').argv,
    paths = {
        index: ['src/index.html'],
        js: ['src/app.js', 'src/**/*.js'],
        sass: ['src/styles/reset.scss', 'src/styles/*.scss'],
        templates: 'src/templates.js',
        buildcss: ['./build/**/*.css'],
        dist: './dist/',
    };

//jshint task
gulp.task('jshint', () => {
    gulp.src(paths.js)
        .pipe(_.jshint())
        .pipe(_.jshint.reporter('default'))
        .pipe(_.jshint.reporter('fail'));
});

gulp.task('index', function () {
    var target = gulp.src(paths.index);
    var sources = gulp.src([paths.dist + '/*.js', paths.dist + '/*.css'], {
        read: false
    });
    return target.pipe(_.inject(sources, {
            ignorePath: 'dist'
        }))
        .pipe(_.htmlDependencies({
            dest: paths.dist, // The basedir of your application. default: path.dirname(file.path) 
            prefix: '/vendor', // The URL prefix. Default "/" 
        }))
        .pipe(gulp.dest(paths.dist));
});

//js task
gulp.task('js', function () {
    return gulp.src(paths.js)
        .pipe(_.sourcemaps.init())
        .pipe(_.babel({
            presets: ['es2015']
        }))
        .pipe(_.concat('app.js'))
        .pipe(_.if(argv.prod, _.uglify()))
        .pipe(_.if(argv.prod, _.rename({
            extname: '.min.js'
        })))
        .pipe(_.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dist))
        .pipe(_.connect.reload())
        .on('error', _.util.log)
});

//sass task
gulp.task('sass', () => {
    return gulp.src(paths.sass)
        .pipe(_.sass().on('error', _.sass.logError))
        .pipe(_.concat('app.css'))
        .pipe(gulp.dest(paths.dist))
        .pipe(_.connect.reload());
});

//clean task
gulp.task('clean', () => {
    return gulp.src([
            paths.dist
        ])
        .pipe(_.clean());
})

//build task
gulp.task('build', _.sequence('clean', 'jshint', 'js', 'sass', 'index'));
//start
gulp.task('start', _.sequence('build', 'serve'));

//server
gulp.task('serve', () => {
    let serveOpts = {
            root: 'dist',
            livereload: true,
            port: 3000
        },
        browserOpts = {
            uri: 'http://localhost:' + serveOpts.port,
            app: 'chrome'
        };
    _.connect.server(serveOpts);
    gulp.src(__filename)
        .pipe(_.open(browserOpts));
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.sass, ['sass'])
})