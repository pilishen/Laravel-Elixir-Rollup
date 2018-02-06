import fs from 'fs';
import gulp from 'gulp';
import {extend} from 'underscore';
import Elixir from 'laravel-elixir';

<<<<<<< HEAD
let buffer, inject, rollup, babel,vue, source, replace, commonjs, nodeResolve, multiEntry, cache, json, globals, builtins;
=======
let buffer, inject, rollup, buble, babel,vue, source, replace, commonjs, nodeResolve, multiEntry, cache, json, globals, builtins;
>>>>>>> rollup/master

class RollupTask extends Elixir.Task {

    /**
     * Create a new RollupTask instance.
     *
     * @param  {string}      name
     * @param  {GulpPaths}   paths
     * @param  {object|null} options
     */
    constructor(name, paths, options = {}) {
        super(name, null, paths);

        this.options = options;

        if (fs.existsSync('rollup.config.js')) {
            this.rollupConfig = require(process.cwd()+'/rollup.config.js');
        }
    }

    /**
     * Build up the Gulp task.
     */
    gulpTask() {
        return this.rollup()
            .on('error', this.onError())
            .pipe(source(this.output.name))
            .pipe(buffer())
            .pipe(this.minify())
            .on('error', this.onError())
            .pipe(this.initSourceMaps({ loadMaps: true }))
            .pipe(this.writeSourceMaps())
            .pipe(this.saveAs(gulp));
    }


    /**
     * Register file watchers.
     */
    registerWatchers() {
        this.watch(this.src.baseDir + '/**/*.+(js|vue|jsx)')
            .ignore(this.output.path);
    }


    /**
     * Lazy load the task dependencies.
     */
    loadDependencies() {
        buffer = require('vinyl-buffer');
        rollup = require('rollup-stream');
        vue = require('rollup-plugin-vue');
<<<<<<< HEAD
=======
        buble = require('rollup-plugin-buble');
>>>>>>> rollup/master
        babel = require('rollup-plugin-babel');
        source = require('vinyl-source-stream');
        replace = require('rollup-plugin-replace');
        commonjs = require('rollup-plugin-commonjs');
        nodeResolve = require('rollup-plugin-node-resolve');
        inject = require('rollup-plugin-inject');
        multiEntry = require('rollup-plugin-multi-entry');
        json = require('rollup-plugin-json');
        globals = require('rollup-plugin-node-globals');
        builtins = require('rollup-plugin-node-builtins');
    }


    /**
     * Run the files through Rollup.
     */
    rollup() {
        this.recordStep('Transforming ES2015 to ES5');
        this.recordStep('Bundling');

        var plugins = [
            //inject({
            //    include: './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
            //    jQuery: 'jQuery'
            //}),
            multiEntry(),
            json(),
<<<<<<< HEAD
            nodeResolve({
                browser: true,
                main: true,
                jsnext: true ,
                preferBuiltins: true,
                extensions: [ '.js', '.json', '.css','.vue' ],
=======
            nodeResolve({ browser: true, main: true, jsnext: true , preferBuiltins: true}),
            commonjs({
                include: [
                    'node_modules/**',
                    this.src.baseDir + '/**'
                ]
>>>>>>> rollup/master
            }),
            replace({
                'process.env.NODE_ENV': JSON.stringify(Elixir.inProduction)
            }),
<<<<<<< HEAD
            vue({css:true, compileTemplate: true, htmlMinifier: {collapseBooleanAttributes: false}}),
            babel({
                exclude: 'node_modules/**',
                "presets": [
                    "es2015-rollup"
                ],
                "plugins": ["syntax-object-rest-spread", "transform-object-rest-spread"]
            }),
            commonjs({
                include: [
                    'node_modules/**',
                    this.src.baseDir + '/**'
                ]
            }),
            globals(),
            builtins(),


=======
            vue(),
            buble(),
            babel({
                exclude: 'node_modules/**',
                babelrc: false,
                "presets": ["es2015-rollup"],
                "plugins": ["syntax-object-rest-spread", "transform-object-rest-spread"]
            }),
            globals(),
            builtins()
>>>>>>> rollup/master
        ].concat(this.options.plugins || []);

        delete this.options.plugins

        return rollup(
            extend({
                input: this.src.path,
                cache: cache,
                sourcemap: true,
                format: 'iife',
                name: 'LaravelElixirBundle',
                plugins: plugins
            }, this.rollupConfig, this.options)
        )
        .on('bundle', function (bundle) {
            cache = bundle;
        });
    }
}

export default RollupTask;
