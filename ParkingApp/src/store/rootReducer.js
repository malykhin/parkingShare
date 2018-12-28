import { combineReducers } from 'redux'

import { reducer as freeSpaces, NAME as freeSpacesName } from '../modules/FreeSpaces/reducer'
import { reducer as mySpaces, NAME as mySpacesName } from '../modules/MySpaces/reducer'
import { reducer as settings, NAME as settingsName } from '../modules/Settings/reducer'
import { reducer as root, NAME as rootName } from '../modules/Root/reducer'

const appReducer = combineReducers({
  [freeSpacesName]: freeSpaces,
  [mySpacesName]: mySpaces,
  [settingsName]: settings,
  [rootName]: root,
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
