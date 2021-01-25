import { combineReducers } from 'redux';
import choiceReducer from './choiceReducer';

const rootReducer = combineReducers({
    choiceReducer
});

// 루트 리듀서를 내보내주세요.
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
