import { SvelteComponentTyped } from "svelte";
import type { BaseGridBuilder } from './js/BaseGridBuilder.js';
import type { DefaultRow } from './js/types';
declare class __sveltets_Render<T extends DefaultRow> {
    props(): {
        hasOptions?: boolean | undefined;
        canExpandRows?: boolean | undefined;
        builder: BaseGridBuilder<T>;
    };
    events(): {
        updatedSelection: CustomEvent<any>;
        cellClick: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {};
}
export type ShgridProps<T extends DefaultRow> = ReturnType<__sveltets_Render<T>['props']>;
export type ShgridEvents<T extends DefaultRow> = ReturnType<__sveltets_Render<T>['events']>;
export type ShgridSlots<T extends DefaultRow> = ReturnType<__sveltets_Render<T>['slots']>;
export default class Shgrid<T extends DefaultRow> extends SvelteComponentTyped<ShgridProps<T>, ShgridEvents<T>, ShgridSlots<T>> {
}
export {};
