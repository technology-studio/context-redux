/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-01-30T15:49:24+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import { configManager, levels } from '@txo-peer-dep/log/Config'
import * as ConsoleLogger from '@txo/log-console'

configManager.update({
  loggerConfigMap: {
    [ConsoleLogger.LOGGER_KEY]: {
      writeLog: ConsoleLogger.writeLog,
      nodeEnvironmentList: ['test'],
    },
  },
  defaultLevelForNodeEnvironmentMap: {
    'test': levels.NONE,
  },
})

// Mock your external modules here if needed
// jest
// .mock('package', () => {
//   return { isTablet: jest.fn(() => { return false }) }
// })
