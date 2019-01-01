/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-01-09T00:56:40+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

'use strict'; // eslint-disable-line

import { DEFAULT_CONTEXT } from '../lib'
import { sampleArrayContextRedux } from '../sample'

const SAMPLE_ITEM = 'sample-item'

describe('array context redux', () => {
  test('shoud add item to default context', () => {
    const state = sampleArrayContextRedux.reducer({}, sampleArrayContextRedux.creators.add({ item: SAMPLE_ITEM }))

    expect(state).toStrictEqual({
      [DEFAULT_CONTEXT]: [
        SAMPLE_ITEM,
      ],
    })
  })

  test('shoud not create default context initial state in case operation is not reducer related', () => {
    const state = sampleArrayContextRedux.reducer({}, { type: 'VOID_ACTION' })

    expect(state).toStrictEqual({})
  })
})
