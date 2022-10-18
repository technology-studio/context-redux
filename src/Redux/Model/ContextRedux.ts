/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-08-10T07:33:33+02:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
**/

import { translateOnPath } from '@txo/functional'
import { Log } from '@txo/log'
import type {
  AttributesAdvanced,
  HandlerWrapper,
  ReduxHandler,
} from '@txo/redux'
import {
  createReduxAdvanced,
  type HandlerAction,
  type Attributes,
  type Handler,
} from '@txo/redux'

import type {
  ContextRedux,
  ContextState,
} from '../../Model/Types'

const log = new Log('txo.context-redux.Redux.Model.ContextRedux')

export const DEFAULT_CONTEXT = 'default'

export const createContextRedux = <
  INNER_STATE,
  HANDLER_KEY extends string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HANDLERS extends Record<HANDLER_KEY, ReduxHandler<INNER_STATE, any>>,
  // HANDLERS extends ContextHandlers<INNER_STATE, HANDLER_ATTRIBUTES> = ContextHandlers<INNER_STATE, HANDLER_ATTRIBUTES>
  // HANDLER_ATTRIBUTES extends Record<string, Record<string, unknown>> | any = any,
  >(attributes: Attributes<INNER_STATE, HANDLER_KEY, HANDLERS>): ContextRedux<INNER_STATE, HANDLER_KEY, HANDLERS> => {
  type ContextInnerState = ContextState<INNER_STATE>
  const handlerWrapper: HandlerWrapper<
  ContextInnerState,
  INNER_STATE,
  HandlerAction<Record<string, unknown>> & { context?: string }
  > = <ACTION extends HandlerAction<Record<string, unknown>> & { context?: string }>(
    state: ContextInnerState,
    action: ACTION,
    handler: Handler<INNER_STATE, ACTION> | undefined,
  ) => {
    let nextState: ContextInnerState = state ?? {}
    if (handler) {
      const _handler = handler
      nextState = translateOnPath<INNER_STATE>(action.context ?? DEFAULT_CONTEXT, state as INNER_STATE, (internalState) => {
        const nextInnerState = _handler(internalState ?? attributes.initialState, action.attributes, action)
        log.debug('TRANSLATE', { action, state, internalState, attributes, nextInnerState })
        return nextInnerState
      }, {
        keepEmptyObjectsAtTranlateResult: true,
      }) ?? {}
    }
    return log.debugProxy('HANDLER WRAPPER',
      nextState,
    )
  }

  return createReduxAdvanced<
  ContextInnerState,
  INNER_STATE,
  HandlerAction<Record<string, unknown>> & { context?: string },
  HANDLER_KEY,
  HANDLERS,
  AttributesAdvanced<
  ContextInnerState,
  INNER_STATE,
  HandlerAction<Record<string, unknown>> & { context?: string },
  HANDLER_KEY,
  HANDLERS
  >
  >({
    ...attributes,
    handlerWrapper,
  })
}
