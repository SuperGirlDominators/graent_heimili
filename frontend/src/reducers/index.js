import { combineReducers } from 'redux'
import questions from './QuestionsReducer'
import choices from './ChoicesReducer'
import checklist from './ChecklistReducer'
import user from './UserReducer'

export default combineReducers({
  questions,
  checklist,
  choices,
  user
})
