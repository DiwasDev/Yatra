import {Pipeline} from "@xenova/transformers";

export type PipeParameters = Parameters<Pipeline['_call']>;
export type PipeReturnType = Awaited<ReturnType<Pipeline['_call']>>;
export type PipeFunction = (...args: PipeParameters) => Promise<PipeReturnType>;

