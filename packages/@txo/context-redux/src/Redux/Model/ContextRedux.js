/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-08-10T07:33:33+02:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import {
  createReduxAdvanced,
  type HandlerAction,
  type Attributes,
  type ExtractActionCreatorReturnType,
  type Handler,
} from '@txo/redux'
import { translateOnPath } from '@txo/functional'
import { Log } from '@txo-peer-dep/log'

import type {
  ContextRedux,
  ContextState,
  InternalContextState,
} from '../../Model/Types'

const log = new Log('txo.context-redux.Redux.Model.ContextRedux')

export const DEFAULT_CONTEXT = 'default'

export const createContextRedux = <
  INNER_STATE,
  ATTRIBUTES: Attributes<INNER_STATE>,
>(attributes: ATTRIBUTES): ContextRedux<INNER_STATE, $ObjMap<$PropertyType<ATTRIBUTES, 'handlers'>, ExtractActionCreatorReturnType>> => {
  return createReduxAdvanced({
    ...attributes,
    handlerWrapper: <ACTION: HandlerAction<*> & { +context?: string }>(
      initialState: INNER_STATE,
      state: InternalContextState<INNER_STATE>,
      action: ACTION,
      handler: ?Handler<INNER_STATE, ACTION>
    ): ContextState<INNER_STATE> => {
      var nextState = state || {}
      if (handler) {
        const _handler = handler
        nextState = translateOnPath(action.context || DEFAULT_CONTEXT, state, internalState => {
          const nextInnerState = _handler(internalState || attributes.initialState, action.attributes, action)
          log.debug('TRANSLATE', { action, state, internalState, attributes, nextInnerState })
          return nextInnerState
        }, {
          keepEmptyObjectsAtTranlateResult: true,
        }) || {}
      }
      return log.debugProxy('HANDLER WRAPPER',
        nextState
      )
    },
  })
}
