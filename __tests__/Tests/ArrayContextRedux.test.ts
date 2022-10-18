/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-01-09T00:56:40+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
**/

import { DEFAULT_CONTEXT } from '../../src'
import { sampleArrayContextRedux } from '../Sample'

const SAMPLE_ITEM = 'sample-item'

const VOID_ACTION = {
  type: 'VOID_ACTION',
}

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
    const state = sampleArrayContextRedux.reducer({}, VOID_ACTION)

    expect(state).toStrictEqual({})
  })
})
