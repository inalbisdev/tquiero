'use strict';

import plugins       from 'gulp-load-plugins';
import yargs         from 'yargs';
import browser       from 'browser-sync';
import gulp          from 'gulp';
import panini        from 'panini';
import rimraf        from 'rimraf';
import sherpa        from 'style-sherpa';
import yaml          from 'js-yaml';
import fs            from 'fs';
import sass          from 'gulp-sass';
import webpack       from 'webpack-stream';
import pixrem       from 'gulp-pixrem';
import uglify from 'gulp-uglify';
import concat from "gulp-concat";

import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

const critical = require('critical').stream; // Separa el CSS critico de la web y lo incrusta inline;
const htmlmin = require('gulp-htmlmin');
//import bulkSass from "gulp-sass-bulk-import"
import _ from "lodash";








// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

//Check for --filter flag for only compile one brand
const FILTER = !!(yargs.argv.filter);



// Load settings from settings.yml
const { COMPATIBILITY, PORT, PATHS,BUILDERS } = loadConfig();


function loadConfig() {
    let ymlFile = fs.readFileSync('config.yml', 'utf8');
    return yaml.load(ymlFile);
}

// Build the "dist" folder by running all of the below tasks
gulp.task('build',
    gulp.series(clean, gulp.parallel(pages, sassToCss, images, customScripts, typo, favicon)));


gulp.task('webpack', function() {
    return gulp.src('./src/assets/javascript/app.js')
        .pipe(webpack({
            entry: {
                bundle: "./src/assets/javascript/app.js"
            },
            output: {
                filename: "[name].js"
            },
            mode: 'production',
            devtool: 'source-map',
            rules: [
                {
                    test: /.js/,
                    enforce: 'pre',
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: `jshint-loader`,
                            options: {reporter: true}
                        }
                    ]
                }
            ],
            plugins:  new UglifyJsPlugin({
                sourceMap: false
            })

        }))
        .pipe(gulp.dest('dist/assets/javascript/'));
});

// Build the site, run the server, and watch for file changes
gulp.task('default',
    gulp.series('build', server ,watch));

gulp.task('clean',
    gulp.series(clean));

gulp.task('critical', function () {
    return gulp.src('dist/*.html')
        .pipe(critical({base: 'critical/', inline: true, css: ['dist/assets/css/main.css'], minify: true}))
        .pipe(gulp.dest('critical'));
});




function clean(done) {
    rimraf('dist/', done);
}

// Copy files out of the assets folder
// This task skips over the "images", "javascript", and "scss" folders, which are parsed separately
function copy() {
    return gulp.src(PATHS.assets)
        .pipe(gulp.dest(PATHS.dist + '/assets'));
}




function manifest(){
    return gulp.src(PATHS.manifest)
        .pipe(gulp.dest(PATHS.dist))
}
function typo(){
    return gulp.src(PATHS.typo)
        .pipe(gulp.dest(PATHS.dist + '/assets/typo'))
}

function favicon(){
    return gulp.src(PATHS.favicon)
        .pipe(gulp.dest(PATHS.dist))
}


function sw(){
    return gulp.src(PATHS.sw)
        .pipe(gulp.dest(PATHS.dist))
}




// Copy page templates into finished HTML files
function pages() {

    return gulp.src('src/pages/**/*.{html,hbs,handlebars}')
        .pipe(panini({
            root: 'src/pages/',
            layouts: 'src/layouts/',
            partials: 'src/partials/',
            data: 'src/data/',
            helpers: 'src/helpers/'
        }))
        .pipe(gulp.dest(PATHS.dist));
}

// Load updated HTML templates and partials into Panini
function resetPages(done) {
    panini.refresh();
    done();
}

// Generate a style guide from the Markdown content and HTML template in styleguide/
function styleGuide(done) {
    sherpa('src/styleguide/index.md', {
        output: PATHS.dist + '/styleguide.html',
        template: 'src/styleguide/template.html'
    }, done);
}


function demo() {

    let components = BUILDERS.components,
        paths = [],
        name  = [];

    _.forEach(components, function (component) {
        var name = component.id;

        _.forEach(component.brands, function (brand) {
            paths.push("src/assets/scss/builders/" + name + "/" + brand + '/main.scss');
        });
    });


    /*
    console.log(_.filter(components, function (c) {
        return _.includes(c.brands, 'iberojet');
    }));
    */
    console.log(paths);

    return gulp.src(paths, { base: './src/assets/scss' })
        .pipe(sass())
        .pipe(gulp.dest('./dist/assets/css'));

}



// Compile Sass into CSS
// In production, the CSS is compressed
function sassToCss() {
    return gulp.src('src/assets/scss/builders/main.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            includePaths: PATHS.sass
        })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: COMPATIBILITY
        }))

        // Comment in the pipe below to run UnCSS in production
        //.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
        .pipe($.if(PRODUCTION, $.cleanCss({ compatibility: 'ie9' })))
        .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
        .pipe(gulp.dest(PATHS.dist + '/assets/css'))
        .pipe(pixrem({ rootValue: '16px',replace: true }))
        .pipe(browser.reload({ stream: true }));
}







// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
    return gulp.src('src/assets/media/**/*')
    .pipe($.if(PRODUCTION, $.imagemin({
      progressive: true
    })))
    .pipe(gulp.dest(PATHS.dist + '/assets/media'));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
    browser.init({
        server: PATHS.dist, port: PORT
    });
    done();
}


function customScripts() {
    return gulp.src(
        [
            'src/assets/javascript/vendor/jquery-2.2.4.min.js',
            'src/assets/javascript/vendor/jquery-ui.min.js',
            'src/assets/javascript/vendor/lazysizes.js',
            'src/assets/javascript/vendor/slick.js',
            'src/assets/javascript/custom.js',
            'src/assets/javascript/validation.js'
        ]
    )
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/javascript/'));
}


// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {

    gulp.watch('src/pages/**/*.html').on('all', gulp.series(pages, browser.reload));
    gulp.watch('src/{layouts,partials}/**/*.html').on('all', gulp.series(resetPages, pages, browser.reload));
    gulp.watch('src/{data}/**/*.json').on('all', gulp.series(resetPages, pages, browser.reload));
    gulp.watch('src/assets/scss/**/*.scss').on('all', sassToCss);
    gulp.watch('src/assets/media/**/*').on('all', gulp.series(images, browser.reload,copy));
    gulp.watch('src/manifest.json').on('all', gulp.series(manifest, browser.reload));
    gulp.watch('src/sw.js').on('all', gulp.series(sw, browser.reload));
    gulp.watch('src/assets/javascript/custom.js').on('all', gulp.series(customScripts, browser.reload));


}
