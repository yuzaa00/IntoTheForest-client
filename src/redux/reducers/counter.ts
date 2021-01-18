import { INCREASE, DECREASE } from '../actions/types';
import { increase, decrease } from '../actions/counter';

// 모든 액션 객체들에 대한 타입
// ReturnType<typeof _____> 는 특정 함수의 반환값을 추론
type CounterAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>;

// 이 리덕스 모듈에서 관리 할 상태의 타입 선언
type CounterState = {
    count: number;
  };

  // 초기 상태 선언
  const initialState: CounterState = {
    count: 0
  };

  // state 와 함수의 반환값이 일치하도록 작성
  function counter(
    state: CounterState = initialState,
    action: CounterAction
  ): CounterState {
    switch (action.type) {
      case INCREASE:
        return { 
          ...state,
          count: state.count + 1 
        };
      case DECREASE:
        return { 
          ...state,
          count: state.count - 1 
        };
      default:
        return state;
    }
  }

  export default counter; 