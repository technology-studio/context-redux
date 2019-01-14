/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2019-01-01T13:32:47+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import { type Action } from '@txo/redux'

import {
  createContextRedux,
  type ContextRedux,
} from '../lib'

type SampleData = {
  sampleNumber: number,
}

type SetAttributes = {
  data: SampleData,
}

export type Creators = {
  set: (attributes: SetAttributes) => Action & SetAttributes,
  clear: () => Action,
}

export type State = {|
  data: ?SampleData,
|}

export const sampleContextRedux: ContextRedux<State, Creators> = createContextRedux<State, _>({
  filter: {
    data: true,
  },
  initialState: {
    data: null,
  },
  handlers: {
    set: (state, { type, error }) => state,
    clear: state => state,
  },
  prefix: '.sample.prefix',
})

sampleContextRedux.creators.set({ data: { sampleNumber: 1 } })
