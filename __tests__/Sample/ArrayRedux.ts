/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2019-01-01T13:32:47+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
**/

import { Log } from '@txo/log'
import type { ReduxHandler } from '@txo/redux'

import {
  createContextRedux,
  type ContextRedux,
} from '../../src'

const log = new Log('txo.context-redux.sample.ArrayRedux')

type AddAttributes = { item: string }
type RemoveAttributes = { item: string }

export type Handlers = {
  add: ReduxHandler<string[], AddAttributes>,
  remove: ReduxHandler<string[], RemoveAttributes>,
}

const remove = <TYPE>(array: TYPE[], value: TYPE | undefined): TYPE[] => {
  if (value != null) {
    const index = array.indexOf(value)
    if (index !== -1) {
      return [...array.slice(0, index), ...array.slice(index + 1)]
    }
  }
  return array
}

export const sampleArrayContextRedux: ContextRedux<string[], keyof Handlers, Handlers> = createContextRedux<
string[],
keyof Handlers,
Handlers
>({
  filter: {},
  initialState: [],
  handlers: {
    add: (state, { item }) => {
      log.debug('ADD', { state, item })
      const a = (item != null || item !== '')
        ? [...state, item]
        : state
      return a
    },
    remove: (state, { item }) => remove(state, item),
  },
  prefix: 'sample.array.',
})

const SAMPLE_ITEM = 'sample-item'
sampleArrayContextRedux.creators.add({ item: SAMPLE_ITEM })
