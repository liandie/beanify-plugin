const beanifyPlugin = require("../index")
const tap = require("tap")

tap.test("beanify-plugin test", (t) => {
    t.plan(11)

    t.equal(beanifyPlugin.pluginScoped, Symbol.for('plugin-scoped'), "check pluginScoped")
    t.equal(beanifyPlugin.pluginMeta, Symbol.for('plugin-meta'), "check pluginMeta")

    try {
        beanifyPlugin("fn")
        t.ok(false, "check fn type not function")
    } catch (e) {
        t.ok(true, e.message)
    }

    let p1 = beanifyPlugin((beanify, opts, done) => {
        done()
    })

    t.equal(p1[beanifyPlugin.pluginScoped], true, "check default pluginScoped")
    t.strictSame(p1[beanifyPlugin.pluginMeta], { name: 'index.test' }, "check default pluginMeta")

    let p2 = beanifyPlugin(function aaPlugin(beanify, opts, done) {
        done()
    }, {
        scoped: false,
        name: "testName",
        beanify: ">1.0.0"
    })

    t.equal(p2[beanifyPlugin.pluginScoped], false, "check p2 pluginScoped")
    t.strictSame(p2[beanifyPlugin.pluginMeta], { name: 'testName', scoped: false }, "check p2 pluginMeta")

    function p3Plugin(beanify, opts, done) {
        done()
    }

    let p3 = beanifyPlugin(p3Plugin, ">1.0.0")

    t.equal(p3[beanifyPlugin.pluginScoped], true, "check p3 pluginScoped")
    t.strictSame(p3[beanifyPlugin.pluginMeta], { name: 'p3Plugin' }, "check p3 pluginMeta")

    try {
        beanifyPlugin(p3Plugin, {
            beanify: {}
        })
        t.ok(false, "check options.beanify type not string")
    } catch (e) {
        t.ok(true,e.message)
    }

    try {
        beanifyPlugin(p3Plugin,null)
        t.ok(false, "check options is null")
    } catch (e) {
        t.ok(true,e.message)
    }
    
})