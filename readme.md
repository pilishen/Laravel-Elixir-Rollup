# Laravel Elixir Rollup Integration

This extension brings [Rollup.js](http://rollupjs.org/) support to your Laravel Elixir builds. 

this is an optimized version to the orginal laravel-elixir-rollup-offical
这是一份优化版本的laravel-elixir-rollup-offical，中文文档请看`readme-chinese.md`
## Install

First, ensure that you're using Laravel Elixir v6 or newer. Next, install the extension like so:

```bash
npm install laravel-rollup-elixir --save-dev
```

## Use

You're all set! Open your `gulpfile.js`, and add:

```js
elixir(function(mix) {
  mix.rollup('main.js');
});
```

This will, by default, compile `resources/assets/js/main.js` to `public/js/main.js`. Should you require a non-standard base directory for your 
source files, begin the path with `./`. This instructs Laravel Elixir to omit any default base directories.

```js
elixir(function(mix) {
  mix.rollup('./app/assets/js/main.js');
});
```

Similarly, if you require a different output directory, provide a file or directory path as the second argument to `mix.rollup`.

```js
elixir(function(mix) {
  mix.rollup('main.js', 'public/build/bundle.js');
});
```

Now, you're specifying that you want to compile `resources/assets/js/main.js` to `public/build/bundle.js`.

If providing an array of source files, it might be useful to override the default base directory. If desired, specify a path as the third argument.


```js
elixir(function(mix) {
  mix.rollup(['main.js', 'other.js'], null, 'app/js');
});
```

With this adjustment, we'll compile `app/js/main.js` and `app/js/other.js`.

Lastly, should you need to override the default Rollup configuration, you may do so by either creating a `rollup.config.js` file in your project root, 
or by passing a Rollup config object as the fourth argument to `mix.rollup`. You can [learn more about Rollup config files here.](http://rollupjs.org/guide/#using-config-files)

### Troubleshooting
1. since we're expected to use es6 standard, otherwise no need to butter rollup, then we should alawys use `import` other than `require` to avoid this error
```
Uncaught ReferenceError: require is not defined
```
though we already include commonjs to transform old standard, mixed use of `import` and `require` still is a problem
2. back in webpack days, we can import css within `script` tag, especially when dealing with vue component, however with rollup vue plugin, you should import related css file under `style` tag, like this:
```
// do not forget lang specification
<style lang="scss">

    @import 'node_modules/path/to/your/cssfileName'
    // remember, do not add .css extension
<style>
```