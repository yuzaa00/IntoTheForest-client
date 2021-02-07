import { createAction, ActionType, createReducer } from 'typesafe-actions'

const GAME_DESTROY = 'GAME_DESTROY'
const ACCESS_TOKEN = 'ACCESS_TOKEN'

export const gameDestroy = createAction(GAME_DESTROY)
export const accessToken = createAction(ACCESS_TOKEN)

const actions = { 
  gameDestroy,
  accessToken, }; // 모든 액션 생성함수들을 actions 객체에 넣습니다

type SingleReducerAction = ActionType<typeof actions> // ActionType 를 사용하여 모든 액션 객체들의 타입을 준비해줄 수 있습니다
  
  interface SingleReducerState  {
    game: boolean,
    gameData: {
      score: any,
      life: any,
      stage: any,
      bird: any,
      squi: any
    },
    accessToken: string
  }
  
  const initialState: SingleReducerState = {
    game: false,  
    gameData: {
      score: 0,
      life: 0,
      stage: 0,
      bird: 0,
      squi:0
    },
    accessToken: ''
  }

const singleReducer = createReducer<SingleReducerState, SingleReducerAction>(initialState, {
    [GAME_DESTROY]: (state: SingleReducerState, action: any) => {
      console.log(action)
      state.game = true
       const newGameData = Object.assign({}, { 
    score: action.score,
    life: action.life, 
    stage: action.stage, 
    bird: action.bird, 
    squi: action.squi});
    
      // state.score = action.value
      // state.life = action.value
      // state.stage = action.value
      // state.bird = action.value
      // state.squi = action.value
      
      return {
        ...state,
         gameData: newGameData
      }
    },
    [ACCESS_TOKEN]: (state: SingleReducerState, action: any) => {
      console.log(action)
      return {
        ...state,
        accessToken: action.value
      }
    }
  })


  export default singleReducer



  // return {
  //   ...state,
  //   score: action.score,
  //   life: action.life, 
  //   stage: action.stage, 
  //   bird: action.bird, 
  //     squi: action.squi
  // }