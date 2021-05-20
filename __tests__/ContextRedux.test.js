/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-01-09T00:56:40+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import { DEFAULT_CONTEXT } from '@txo/context-redux'
import {
  sampleContextRedux,
  type SampleData,
} from '../sample'

const SAMPLE_DATA: SampleData = {
  sampleNumber: 1,
}

const TEST_CONTEXT = 'test.context'

const NOT_RELATED_ACTION = {
  type: 'NOT_RELATED_ACTION',
}

const NOT_RELATED_ACTION_WITH_TEST_CONTEXT = {
  ...NOT_RELATED_ACTION,
  context: TEST_CONTEXT,
}

describe('sample context redux', () => {
  test('shoud add data under deault context', () => {
    const state = sampleContextRedux.reducer({}, sampleContextRedux.creators.set({ data: SAMPLE_DATA }))

    expect(state).toStrictEqual({
      [DEFAULT_CONTEXT]: {
        data: SAMPLE_DATA,
      },
    })
  })

  test('shoud add data under test context', () => {
    const state = sampleContextRedux.reducer({}, sampleContextRedux.creators.set({ data: SAMPLE_DATA }, { context: TEST_CONTEXT }))
    expect(state).toStrictEqual({
      test: {
        context: {
          data: SAMPLE_DATA,
        },
      },
    })
  })

  test('shoud keep state the same with not related action', () => {
    const state = sampleContextRedux.reducer({}, sampleContextRedux.creators.set({ data: SAMPLE_DATA }, { context: TEST_CONTEXT }))
    const nextState = sampleContextRedux.reducer(state, NOT_RELATED_ACTION)
    expect(nextState).toBe(state)
  })

  test('shoud keep state the same with not related action with same context', () => {
    const state = sampleContextRedux.reducer({}, sampleContextRedux.creators.set({ data: SAMPLE_DATA }, { context: TEST_CONTEXT }))
    const nextState = sampleContextRedux.reducer(state, NOT_RELATED_ACTION_WITH_TEST_CONTEXT)
    expect(nextState).toBe(state)
  })
})
