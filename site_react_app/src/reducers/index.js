import { combineReducers } from 'redux'
import { authentication } from './authentication.reducer'
import { registration } from './registeration.reducer'
import { userReducer } from './user.reducer'

const rootReducer = combineReducers({
    authentication,
    registration,
    userReducer,
});

export default rootReducer;