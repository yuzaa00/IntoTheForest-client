import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import choiceReducer from '../redux/game/choiceReducer'
import roomReducer from '../redux/room/roomRedux'
import singleReducer from '../redux/result/singleReducer'

const rootReducer = combineReducers({
    choiceReducer,
    roomReducer,
    singleReducer
});

// 루트 리듀서를 내보내주세요.
export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
