/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2019-02-23T12:18:54+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
**/

import type {
  HandlerAction,
  Redux,
  ReduxHandler,
} from '@txo/redux'

export type ContextActionAttributes = {
  context?: string,
}

export type ContextActionCreator<
  ATTRIBUTES extends Record<string, unknown> | unknown,
  ADDITIONAL_ACTION_ATTRIBUTES extends ContextActionAttributes | undefined = ContextActionAttributes,
> = (
  attributes: ATTRIBUTES,
  actionAttribues?: ADDITIONAL_ACTION_ATTRIBUTES,
) => HandlerAction<ATTRIBUTES> & ADDITIONAL_ACTION_ATTRIBUTES

export type InternalContextState<STATE> = { [state: string]: InternalContextState<STATE> | STATE | undefined } | STATE | undefined
export type ContextState<STATE> = InternalContextState<STATE> | STATE | Record<string, unknown>

// export type ContextHandlers<STATE, HANDLER_ATTRIBUTES> = {
//   [ATTRIBUTE in keyof HANDLER_ATTRIBUTES]: ReduxHandler<ContextState<STATE>, HANDLER_ATTRIBUTES[ATTRIBUTE]>
// }

// export type ContextRedux<INNER_STATE, HANDLER_ATTRIBUTES> = Redux<ContextState<INNER_STATE>, ContextHandlers<INNER_STATE, HANDLER_ATTRIBUTES>>
export type ContextRedux<
INNER_STATE,
HANDLER_KEY extends string,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
HANDLERS extends Record<HANDLER_KEY, ReduxHandler<INNER_STATE, any>>
> = Redux<ContextState<INNER_STATE>, INNER_STATE, HANDLER_KEY, HANDLERS>
