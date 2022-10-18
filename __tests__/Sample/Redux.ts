/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2019-01-01T13:32:47+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
**/

import update from 'immutability-helper'
import type { ReduxHandler } from '@txo/redux'

import {
  createContextRedux,
  type ContextRedux,
} from '../../src'

export type SampleData = {
  sampleNumber: number,
}

type SetAttributes = {
  data: SampleData,
}

export type Handlers = {
  set: ReduxHandler<State, SetAttributes>,
  clear: ReduxHandler<State, undefined>,
}

export type State = {
  data: SampleData | null | undefined,
}

export const sampleContextRedux: ContextRedux<State, keyof Handlers, Handlers> = createContextRedux<State, keyof Handlers, Handlers>({
  filter: {
    data: true,
  },
  initialState: {
    data: null,
  },
  handlers: {
    set: (state, { data }) => update(state, { data: { $set: data } }),
    clear: (state) => update(state, { data: { $set: undefined } }),
  },
  prefix: '.sample.prefix',
})

sampleContextRedux.creators.set({ data: { sampleNumber: 1 } })
sampleContextRedux.creators.clear()
