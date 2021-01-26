import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import choiceReducer from '../redux/game/choiceReducer'
import roomReducer from '../redux/room/roomRedux'

const rootReducer = combineReducers({
    choiceReducer,
    roomReducer
});

// 루트 리듀서를 내보내주세요.
export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
