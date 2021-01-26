// 액션 타입

const SELECT1 = 'choiceReducer/SELECT1' as const; 
const SELECT2 = 'choiceReducer/SELECT2' as const;
const SELECT3 = 'choiceReducer/SELECT3' as const;

// 액션 생성 함수

export const select1 = () => ({ type: SELECT1 });
export const select2 = () => ({ type: SELECT2 });
export const select3 = () => ({ type: SELECT3 });

type ChoiceReducerAction =
  | ReturnType<typeof select1>
  | ReturnType<typeof select2>
  | ReturnType<typeof select3>;

type ChoiceReducerState = {
  value: string;
};

const initialState: ChoiceReducerState = {
  value : ""
};

function choiceReducer (state: ChoiceReducerState = initialState, action: ChoiceReducerAction):ChoiceReducerState {
  switch (action.type) {
    case SELECT1:
      return {value: "멍멍이"};
    case SELECT2:
      return {value: "치와와"};
    case SELECT3:
      return {value: "포메라니안"};
    default:
      return state;
  }
};


export default choiceReducer;