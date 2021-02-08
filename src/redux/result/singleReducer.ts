  
import { createAction, ActionType, createReducer } from 'typesafe-actions'

const GAME_DESTROY = 'GAME_DESTROY'
const ACCESS_TOKEN = 'ACCESS_TOKEN'

export const gameDestroy = createAction(GAME_DESTROY)
export const accessToken = createAction(ACCESS_TOKEN)

const actions = {
  gameDestroy,
  accessToken,
}; 

type SingleReducerAction = ActionType<typeof actions> // ActionType 를 사용하여 모든 액션 객체들의 타입을 준비해줄 수 있습니다

interface SingleReducerState {
  game: boolean,
  gameData: {
    score: number,
    life: number,
    stage: number,
    bird: number,
    squi: number
  },
  isOver: boolean,
  accessToken: string
}

const initialState: SingleReducerState = {
  game: false,
  gameData: {
    score: 0,
    life: 0,
    stage: 0,
    bird: 0,
    squi: 0
  },
  isOver: false,
  accessToken: '',
}

export const singleReducer = createReducer<SingleReducerState, SingleReducerAction>(initialState, {
  [GAME_DESTROY]: (state: SingleReducerState, action: any) => {
    state.game = true
    state.isOver = action.isOver
    const newGameData = Object.assign({}, {
      score: action.score,
      life: action.life,
      stage: action.stage,
      bird: action.bird,
      squi: action.squi
    });

    return {
      ...state,
      gameData: newGameData,
    }
  },
  [ACCESS_TOKEN]: (state: SingleReducerState, action: any) => {
    return {
      ...state,
      accessToken: action.value
    }
  }
})
