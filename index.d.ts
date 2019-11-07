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
}

declare function BeanifyPlugin(
    fn: (
        beanify: Beanify,
        opts: object,
        done: (err?: Error) => void
    ) => void,
    opts?: object
): BeanifyPlugin.BeanifyFunction;

export const pluginScoped: Symbol;
export const pluginMeta: Symbol;

export = BeanifyPlugin




