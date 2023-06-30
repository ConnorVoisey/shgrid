import type { BaseGridBuilder } from './js/BaseGridBuilder.js';
declare const __propDef: {
	props: {
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
declare type Props = Record<string, any>;
export interface SvelteComponentDev {
	$set(props?: Props): void;
	$on(event: string, callback: ((event: any) => void) | null | undefined): () => void;
	$destroy(): void;
	[accessor: string]: any;
}
export interface ComponentConstructorOptions<Props extends Record<string, any> = Record<string, any>> {
	target: Element | Document | ShadowRoot;
	anchor?: Element;
	props?: Props;
	context?: Map<any, any>;
	hydrate?: boolean;
	intro?: boolean;
	$$inline?: boolean;
}
export declare class SvelteComponentTyped<
	Props extends Record<string, any> = any,
	Events extends Record<string, any> = any,
	Slots extends Record<string, any> = any,
> implements SvelteComponentDev
{
	/**
	 * @private
	 * For type checking capabilities only.
	 * Does not exist at runtime.
	 * ### DO NOT USE!
	 */
	$$prop_def: Props;
	/**
	 * @private
	 * For type checking capabilities only.
	 * Does not exist at runtime.
	 * ### DO NOT USE!
	 */
	$$events_def: Events;
	/**
	 * @private
	 * For type checking capabilities only.
	 * Does not exist at runtime.
	 * ### DO NOT USE!
	 */
	$$slot_def: Slots;
	constructor(options: ComponentConstructorOptions<Props>);
	[accessor: string]: any;
	$set(props?: any): void;
	$on(event: string, callback: ((event: any) => void) | null | undefined): () => void;
	$destroy(): void;
}
export default class Shgrid extends SvelteComponentTyped<ShgridProps, ShgridEvents, ShgridSlots> {}
export {};
