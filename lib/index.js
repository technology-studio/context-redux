/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-01-09T17:08:37+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import {
  createContextRedux,
  DEFAULT_CONTEXT,
  type ContextState,
} from './Redux/Model/ContextRedux'

import type { State as ContextEntityState } from './Redux/Model/Types/ContextEntityReduxTypes'

export {
  createContextRedux,
  DEFAULT_CONTEXT,
}

export type {
  ContextEntityState,
  ContextState,
}
