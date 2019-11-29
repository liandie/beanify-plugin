# beanify-plugin

[![Greenkeeper badge](https://badges.greenkeeper.io/beanjs-framework/beanify-plugin.svg)](https://greenkeeper.io/)

## install

```
npm install beanify-plugin 
```

## usage

```
const beanifyPlugin=require('beanify-plugin')

let plugin =beanifyPlugin((beanify,opts,done)=>{

    done()
})

let isScoped=plugin[beanifyPlugin.pluginScoped]
let meta=plugin[beanifyPlugin.pluginMeta]
let prefix=plugin[beanifyPlugin.pluginPrefix]

```