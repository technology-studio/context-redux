/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-08-10T07:33:33+02:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import {
  createReduxAdvanced,
  type Action,
  type Attributes,
  type ExtractActionCreatorReturnType,
  type Redux,
  type Handler,
} from '@txo/redux'
import { translateOnPath } from '@txo/functional'
import { Log } from '@txo-peer-dep/log'

const log = new Log('txo.context-redux.Redux.Model.ContextRedux')

export type InternalContextState<STATE> = { [string]: InternalContextState<STATE> | ?STATE } | ?STATE
export type ContextState<STATE> = InternalContextState<STATE> | STATE | {}

export const DEFAULT_CONTEXT = 'default'

export const createContextRedux = <
  INNER_STATE,
  HANDLER_KEY: string,
  ATTRIBUTES: Attributes<INNER_STATE, HANDLER_KEY>,
>(attributes: ATTRIBUTES): Redux<ContextState<INNER_STATE>, HANDLER_KEY, $ObjMap<$PropertyType<ATTRIBUTES, 'handlers'>, ExtractActionCreatorReturnType>> => {
  return createReduxAdvanced({
    ...attributes,
    handlerWrapper: <ACTION: Action & { +context?: string }>(initialState: INNER_STATE, state: InternalContextState<INNER_STATE>, action: ACTION, handler: Handler<INNER_STATE, ACTION>): ContextState<INNER_STATE> => {
      return log.debugProxy('HANDLER WRAPPER',
        translateOnPath(action.context || DEFAULT_CONTEXT, state, internalState => {
          const result = handler(internalState || attributes.initialState, action)
          log.debug('TRANSLATE', { action, state, internalState, attributes, result })
          return result === internalState || result === attributes.initialState ? undefined : result
        }, {
          keepEmptyObjectsAtTranlateResult: true,
        }) || {}
      )
    },
  })
}
