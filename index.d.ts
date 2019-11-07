/// <reference types="node" />

import Beanify from "beanify"

declare namespace BeanifyPlugin {
    interface BeanifyFunction {
        (
            beanify:Beanify,
            opts:object,
            done:(err?:Error)=>void
        ):void,

        pluginScoped:Symbol,
        pluginMeta:Symbol
    }
}

declare function BeanifyPlugin(
    fn: (
        beanify: Beanify,
        opts: object,
        done: (err?: Error) => void
    ) => void,
    opts?: object
): BeanifyPlugin.BeanifyFunction;


export = BeanifyPlugin



