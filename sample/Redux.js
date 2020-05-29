/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2019-01-01T13:32:47+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import update from 'immutability-helper'

import {
  createContextRedux,
  type ContextActionCreator,
  type ContextRedux,
} from '@txo/context-redux'

export type SampleData = {
  sampleNumber: number,
}

type SetAttributes = {
  data: SampleData,
}

export type ActionCreators = {
  set: ContextActionCreator<SetAttributes>,
  clear: ContextActionCreator<>,
}

export type State = {|
  data: ?SampleData,
|}

export const sampleContextRedux: ContextRedux<State, ActionCreators> = createContextRedux<State, _>({
  filter: {
    data: true,
  },
  initialState: {
    data: null,
  },
  handlers: {
    set: (state, { data }) => update(state, { data: { $set: data } }),
    clear: state => update(state, { data: { $set: null } }),
  },
  prefix: '.sample.prefix',
})

sampleContextRedux.creators.set({ data: { sampleNumber: 1 } })
sampleContextRedux.creators.clear()
