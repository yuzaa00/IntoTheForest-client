import { createAction, ActionType, createReducer } from 'typesafe-actions'

const SAVE_CLIENT_WIDTH = 'SAVE_CLIENT_WIDTH'
const MUTE_MULTI_GAME = 'MUTE_MULTI_GAME'
const MUTE_MULTI_GAME_RESET = 'MUTE_MULTI_GAME_RESET'
const SET_MULTI_MODE = 'SET_MULTI_MODE'

export const saveRoomCode = createAction(SAVE_CLIENT_WIDTH)
export const muteMultiGame = createAction(MUTE_MULTI_GAME)
export const muteMultiGameReset = createAction(MUTE_MULTI_GAME_RESET)
export const setMultiMode = createAction(SET_MULTI_MODE)

const actions = { saveRoomCode, muteMultiGame, muteMultiGameReset, setMultiMode }

type gameAction = ActionType<typeof actions>

interface gameState  {
  width: number
  multi: number
  mode: string
}

const initialState: gameState = {
  width: 0,
  multi: 0,
  mode: ''
}

const gameReducer = createReducer<gameState, gameAction>(initialState, {
  [SAVE_CLIENT_WIDTH]: (state: gameState, action: any) => ({
    ...state,
    width: action.value
  }),
  [MUTE_MULTI_GAME]: (state: gameState) => ({
    ...state,
    multi : state.multi + 1
  }),
  [MUTE_MULTI_GAME_RESET]: (state: gameState) => ({
    ...state,
    multi : initialState.multi
  }),
  [SET_MULTI_MODE]: (state: gameState, action: any) => ({
    ...state,
    mode: action.value
  })
})

export default gameReducer