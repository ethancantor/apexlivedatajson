import { AtLeastOne, CamelCase, GetValueFromUnion, KeysFromUnion, StrictEmptyObject } from "./helper-types";
import { type RequestActions } from './live-data/input-messages'

export type ActionKeys = KeysFromUnion<RequestActions>;
export type CamelActionKeys = CamelCase<ActionKeys>;

export type ApexAPIBody<K extends string> = StrictEmptyObject<GetValueFromUnion<RequestActions, K>>;

export type ApexAPIMessage = AtLeastOne<{
    [K in ActionKeys as CamelCase<K>]: ApexAPIBody<K>;
}> & { withAck: boolean }