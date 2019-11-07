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
        name?: string,
        scoped?: boolean,
        beanify?:string,
        prefix?:string
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




