import { SvelteComponentTyped } from "svelte";
import type { BaseGridBuilder } from './js/BaseGridBuilder.js';
declare const __propDef: {
    props: {
        hasOptions?: boolean | undefined;
        canExpandRows?: boolean | undefined;
        builder: BaseGridBuilder;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ShgridProps = typeof __propDef.props;
export type ShgridEvents = typeof __propDef.events;
export type ShgridSlots = typeof __propDef.slots;
export default class Shgrid extends SvelteComponentTyped<ShgridProps, ShgridEvents, ShgridSlots> {
}
export {};
