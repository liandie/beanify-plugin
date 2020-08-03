const semver = require("semver")

const pluginScoped = Symbol.for("plugin-scoped");
const pluginMeta = Symbol.for("plugin-meta")
const pluginPrefix=Symbol.for("plugin-prefix")

const stackTracePattern = /at\s{1}(?:.*\.)?BeanifyPlugin\s{1}.*\n\s*(.*)/
const fileNamePattern = /((\w*-\w*)|(\w*)(\.\w*)*)\..*/  ///(\w*-\w*(\.\w*)*)\..*|\w*(\.\w*)*\..*/ ///(\w*(\.\w*)*)\..*/

const checkVersion = (version) => {
    if (typeof version !== "string") {
        throw new TypeError(`beanify-plugin expects a version string, instead got '${typeof version}'`)
    }

    let beanifyVersion
    try {
        beanifyVersion = require("beanify/package.json").version
    } catch (_) {
        console.log("beanify not found,proceeding anyway")
    }

    if (beanifyVersion && !semver.satisfies(beanifyVersion, version)) {
        throw new Error(`beanify-plugin - expected '${version}' beanify version, '${beanifyVersion}' is installed`)
    }
}

const checkName = (fn) => {
    if (fn.name.length > 0) {
        return fn.name
    }

    try {
        throw new Error('anonymous function')
    } catch (e) {
        const m = e.stack.match(stackTracePattern);
        if (m) {
            return m[1]
                .split(/[/\\]/)
                .slice(-1)[0]
                .match(fileNamePattern)[1]
        } else {
            return 'anonymous'
        }
    }
}

const BeanifyPlugin = (fn, opts = {}) => {
    if (typeof fn !== "function") {
        throw new TypeError(`beanify-plugin expects a function, instead got a '${typeof fn}'`)
    }

    if (opts && typeof opts.scoped === "boolean") {
        fn[pluginScoped] = opts.scoped
    } else {
        fn[pluginScoped] = true
    }

    if (typeof opts === "string") {
        checkVersion(opts)
        opts = {}
    }

    if (typeof opts !== "object" || Array.isArray(opts) || opts === null) {
        throw new TypeError('The opts should be an object')
    }

    if (!opts.name) {
        opts.name = checkName(fn)
    }

    if (opts.beanify) {
        checkVersion(opts.beanify)
        delete opts.beanify
    }

    if(opts.prefix&&typeof opts.prefix === "string"){
        fn[pluginPrefix]=opts.prefix;
        delete opts.prefix
    }else{
        fn[pluginPrefix]='';
    }

    fn[pluginMeta] = opts

    return fn
}

module.exports = BeanifyPlugin
module.exports.pluginScoped = pluginScoped
module.exports.pluginMeta = pluginMeta
module.exports.pluginPrefix=pluginPrefix

