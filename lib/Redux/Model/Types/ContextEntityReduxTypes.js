/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-01-07T09:06:55+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

type EntityState<ENTITY: Object> = { [string]: State<ENTITY> | ?ENTITY } // eslint-disable-line no-use-before-define
export type State<ENTITY: Object> = EntityState<ENTITY> | ENTITY | {}

export type Types = {
  SET: string,
  UPDATE: string,
  CLEAR: string,
}

export type SetReducer<ENTITY: Object> = (state: State<ENTITY>, { context?: ?string, entity: ?ENTITY }) => State<ENTITY>
export type UpdateReducer<ENTITY: Object> = (state: State<ENTITY>, { context?: ?string, entity: $Shape<ENTITY> }) => State<ENTITY>
export type ClearReducer<ENTITY: Object> = (state: State<ENTITY>, { context?: ?string }) => State<ENTITY>

export type Creators<ENTITY: Object> = {
  set: (entity: ?ENTITY, context?: ?string) => Object,
  update: (entity: $Shape<ENTITY>, context?: ?string) => Object,
  clear: (context?: ?string) => Object,
}
