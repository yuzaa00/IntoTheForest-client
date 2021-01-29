import { createAction, ActionType, createReducer } from 'typesafe-actions'

const SAVE_CLIENT_WIDTH = 'SAVE_CLIENT_WIDTH'

export const saveRoomCode = createAction(SAVE_CLIENT_WIDTH)

const actions = {saveRoomCode}

type gameAction = ActionType<typeof actions>


interface gameState  {
  width: number

}

const initialState: gameState = {
  width: 0
}

const gameReducer = createReducer<gameState, gameAction>(initialState, {
  [SAVE_CLIENT_WIDTH]: (state: gameState, action: any) => ({
    ...state,
    width: action.value
  })
})

export default gameReducer