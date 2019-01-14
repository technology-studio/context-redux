/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2019-01-01T13:32:47+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import { type Action } from '@txo/redux'
import { Log } from '@txo-peer-dep/log'

import {
  createContextRedux,
  type ContextRedux,
} from '../lib'

const log = new Log('txo.context-redux.sample.ArrayRedux')

type AddAttributes = { item: string }
type RemoveAttributes = { item: string }

export type Creators = {
  add: (attributes: AddAttributes) => Action & AddAttributes,
  remove: (attributes: RemoveAttributes) => Action & RemoveAttributes,
}

const remove = <TYPE>(array: TYPE[], value: ?TYPE): TYPE[] => {
  if (value) {
    const index = array.indexOf(value)
    if (index !== -1) {
      return [...array.slice(0, index), ...array.slice(index + 1)]
    }
  }
  return array
}

type State = {
  item?: string,
}

export const sampleArrayContextRedux: ContextRedux<State[], Creators> = createContextRedux<State[], _>({
  filter: {},
  initialState: [],
  handlers: {
    add: (state: string[], { item }: Action & AddAttributes) => {
      log.debug('ADD', { state, item })
      return (item && [...state, item]) || state
    },
    remove: (state: string[], { item }: Action & RemoveAttributes) => remove(state, item),
  },
  prefix: 'sample.array.',
})
