/* global require */

var tag = require('moment')().format('YYYYMMDD.HHmmss.SSS') // 年月日.时分秒.毫秒
var version = require('./package.json').version
var build = './build/' + version

var gulp = require('gulp')
var through = require('through2')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var connect = require('gulp-connect')
var combo = require('connect-combo')
var shell = require('gulp-shell')


// https://github.com/AveVlad/gulp-connect
gulp.task('connect', function() {
    connect.server({
        port: 4242,
        middleware: function(connect, opt) {
            return [
                combo({}),
                // https://github.com/senchalabs/connect/#use-middleware
                function cors(req, res, next) {
                    res.setHeader('Access-Control-Allow-Origin', '*')
                    res.setHeader('Access-Control-Allow-Methods', '*')
                    next()
                }
            ]
        }
    })
})

// https://github.com/wearefractal/gulp-concat
gulp.task('concat', function() {
    gulp.src(['bower_components/requirejs/require.js', 'config.js', 'feedback.js'])
        .pipe(concat('require-config.js'))
        .pipe(gulp.dest('./'))
    gulp.src(['bower_components/requirejs/require.js', 'config.js', 'css.js', 'feedback.js'])
        .pipe(concat('require-config-css.js'))
        .pipe(gulp.dest('./'))
    gulp.src(['bower_components/requirejs/require.js', 'config.js', 'css.js', 'animation.js', 'feedback.js'])
        .pipe(concat('require-config-css-animation.js'))
        .pipe(gulp.dest('./'))
})

gulp.task('build', function() {
    var path = require('path')
    var globs = [
        '**/*.js',
        '**/*.css',
        '**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2',
        '**/*.map',
        '!build/**/*',
        '!node_modules/**/*',
        '!gulpfile.js'
    ]
    gulp.src(globs)
        .pipe(through.obj(function(file, encoding, callback) {
            file.path = file.path.replace(
                path.join(__dirname, 'bower_components'),
                __dirname
            )
            callback(null, file)
        }))
        .pipe(gulp.dest(build))
})

// https://github.com/terinjokes/gulp-uglify
gulp.task('compress', function() {
    var globs = [
        build + '/config.js',
        build + '/css.js',
        build + '/animation.js',
        build + '/require-config.js',
        build + '/require-config-css.js',
        build + '/require-config-css-animation.js'
    ]
    gulp.src(globs)
        .pipe(through.obj(function(file, encoding, callback) {
            file.path = file.path.replace(
                '.js',
                '-debug.js'
            )
            callback(null, file)
        }))
        .pipe(gulp.dest(build))
    gulp.src(globs)
        .pipe(uglify())
        .pipe(gulp.dest(build))
})

// 
var bower_components = 'bower_components/'
var linked = function() {
    var fs = require('fs')
    var linked = []
    fs.readdirSync(bower_components).forEach(function(file) {
        if (fs.lstatSync(bower_components + file).isSymbolicLink()) linked.push(file)
    })
    return linked
}()
var rmLinkCmds = function() {
    var cmds = []
    linked.forEach(function(file) {
        cmds.push('rm -fr ' + bower_components + file)
        cmds.push('bower update ' + file)
    })
    return cmds
}()
var reLinkCmds = function() {
    var cmds = []
    linked.forEach(function(file) {
        cmds.push('rm -fr ' + bower_components + file)
        cmds.push('bower link ' + file)
    })
    return cmds
}()
var dailyCmds = function() {
    var cmds = [
        'ls -al ' + bower_components,
    ]
    cmds = cmds.concat(rmLinkCmds)
    cmds.push('gulp concat')
    cmds.push('gulp build')
    cmds.push('gulp compress')
    cmds = cmds.concat([
        'git status',
        'git add -A .',
        'git commit -m "bower update"',
        'git push origin daily/' + version,
        'git push gitlab daily/' + version
    ])
    cmds = cmds.concat([
        'git checkout -b daily/' + tag,
        'git branch',
        'git push gitlab daily/' + tag,
        'git checkout daily/' + version,
        'git branch -d daily/' + tag, // 删除本地已发布的分枝
        'echo done'
    ])
    cmds = cmds.concat(reLinkCmds)
    return cmds
}()
gulp.task('daily', shell.task(dailyCmds, {
    verbose: true,
    ignoreErrors: true
}))

var publishCmds = function() {
    var cmds = [] // dailyCmds.slice(0)
    cmds = cmds.concat([
        'git checkout master',
        'git merge daily/' + version
    ])
    cmds = cmds.concat([
        // 'git status',
        // 'git add -A .',
        // 'git commit -m "save tag log ' + tag + '"',
        'git push gitlab master',
        'git push origin master'
    ])
    cmds = cmds.concat([
        'git checkout -b daily/' + tag,
        'git branch',
        'git push gitlab daily/' + tag
    ])
    cmds = cmds.concat([
        'git tag publish/' + tag,
        'git push gitlab publish/' + tag,
        'git checkout master',
        'git pull',
        'git remote prune gitlab', // 清理远程已发布的分枝
        'git branch -d daily/' + tag, // 删除本地已发布的分枝
        'git checkout daily/' + version,
        'echo done'
    ])
    return cmds
}()
gulp.task('publish', shell.task(publishCmds, {
    verbose: true,
    ignoreErrors: true
}))
gulp.task('cmds', function() {
    console.log('=== daily ===')
    console.log(dailyCmds.join('\n'))
    console.log('=== publish ===')
    console.log(publishCmds.join('\n'))
})

console.log(__dirname)

gulp.task('default', ['build'])