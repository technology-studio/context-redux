/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2019-02-23T12:18:54+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import type {
  HandlerAction,
  Redux,
} from '@txo/redux'

export type ContextActionAttributes = {
  +context?: string,
}

export type ContextActionCreator<
  ATTRIBUTES: Object = void,
  ADDITIONAL_ACTION_ATTRIBUTES: ?ContextActionAttributes = ?ContextActionAttributes
> = (
  attributes: $ReadOnly<ATTRIBUTES>,
  actionAttribues: ADDITIONAL_ACTION_ATTRIBUTES,
) => HandlerAction<ATTRIBUTES> & ADDITIONAL_ACTION_ATTRIBUTES

export type InternalContextState<STATE> = { [string]: InternalContextState<STATE> | ?STATE } | ?STATE
export type ContextState<STATE> = InternalContextState<STATE> | STATE | {}

export type ContextRedux<INNER_STATE, CREATORS: Object> = Redux<ContextState<INNER_STATE>, CREATORS>
