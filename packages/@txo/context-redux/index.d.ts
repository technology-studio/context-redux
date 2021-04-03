/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2020-10-01T08:10:63+02:00
 * @Copyright: Technology Studio
**/
declare module '@txo/context-redux' {
  import type {
    CreateReduxAttributes,
    Creators,
    HandlerAction,
    Redux,
    ReduxHandler,
  } from '@txo/redux'

  type ContextActionAttributes = {
    context?: string,
  }

  type ContextActionCreator<
    ATTRIBUTES extends Record<string, unknown> | undefined = undefined,
    ADDITIONAL_ACTION_ATTRIBUTES extends ContextActionAttributes | undefined = ContextActionAttributes | undefined
  > = (
    attributes: ATTRIBUTES,
    actionAttribues?: ADDITIONAL_ACTION_ATTRIBUTES,
  ) => HandlerAction<ATTRIBUTES> & ADDITIONAL_ACTION_ATTRIBUTES

  type InternalContextState<STATE> = { [key: string]: InternalContextState<STATE> | STATE | undefined } | STATE | undefined
  type ContextState<STATE> = InternalContextState<STATE> | STATE | {}

  type ContextRedux<INNER_STATE, CREATORS extends Record<string, unknown>> = Redux<ContextState<INNER_STATE>, CREATORS>

  function createContextRedux<STATE, HANDLERS extends { [key: string]: ReduxHandler<STATE, any> }> (
    attributes: CreateReduxAttributes<STATE>
  ): ContextRedux<STATE, Creators<STATE, HANDLERS>>
}
