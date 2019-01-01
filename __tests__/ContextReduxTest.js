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

test('shoud pass', () => {
  const state = sampleArrayContextRedux.reducer({}, sampleArrayContextRedux.creators.add({ item: SAMPLE_ITEM }))

  expect(state).toStrictEqual({
    [DEFAULT_CONTEXT]: [
      SAMPLE_ITEM,
    ],
  })
})
