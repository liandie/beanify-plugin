/// <reference types="node" />

import Beanify from "beanify"

declare namespace BeanifyPlugin {
    interface BeanifyFunction {
        (
            beanify: Beanify,
            opts: object,
            done: (err?: Error) => void
        ): void,
    }

    interface BeanifyPluginMeta {
        prefix?:string,
        scoped?: boolean,
        name?: string,
        beanify?:string,
        dependencies?:Array<string>,
        decorators?:Array<string>,
        options?:any
    }
}

declare function BeanifyPlugin(
    fn: (
        beanify: Beanify,
        opts: object,
        done: (err?: Error) => void
    ) => void,
    meta?: BeanifyPlugin.BeanifyPluginMeta | string
): BeanifyPlugin.BeanifyFunction;

declare function BeanifyPlugin(
    fn: (
        beanify: Beanify,
        opts: object,
    ) => Promise<void>,
    meta?: BeanifyPlugin.BeanifyPluginMeta | string
): BeanifyPlugin.BeanifyFunction;

export const pluginScoped: Symbol;
export const pluginMeta: Symbol;
export const pluginPrefix:Symbol

export = BeanifyPlugin




