/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2019-01-01T13:32:47+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import { type Action } from '@txo/redux'
import { Log } from '@txo-peer-dep/log'

import { createContextRedux } from '../lib'

const log = new Log('txo.context-redux.sample.Redux')

 type AddAttributes = Action & { item: string }
 type RemoveAttributes = Action & { item: string }

const remove = <TYPE>(array: TYPE[], value: ?TYPE): TYPE[] => {
  if (value) {
    const index = array.indexOf(value)
    if (index !== -1) {
      return [...array.slice(0, index), ...array.slice(index + 1)]
    }
  }
  return array
}

export const sampleArrayContextRedux = createContextRedux<*, *, *>({
  filter: {},
  initialState: [],
  handlers: {
    add: (state: string[], { item }: AddAttributes) => {
      log.debug('ADD', { state, item })
      return (item && [...state, item]) || state
    },
    remove: (state: string[], { item }: RemoveAttributes) => remove(state, item),
  },
  prefix: 'sample.array.',
})
