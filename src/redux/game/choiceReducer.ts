import { createAction, ActionType, createReducer } from 'typesafe-actions'

const SELECT_CHAR_1 = 'SELECT_CHAR_1'
const SELECT_CHAR_2 = 'SELECT_CHAR_2'
const SELECT_CHAR_3 = 'SELECT_CHAR_3'

export const selChar1 = createAction(SELECT_CHAR_1)
export const selChar2 = createAction(SELECT_CHAR_2)
export const selChar3 = createAction(SELECT_CHAR_3)

const actions = { selChar1, selChar2, selChar3 }

type selectAction = ActionType<typeof actions>

interface selChar  {
  char: string
}

const initialState: selChar = {
  char: ''
}

const choice = createReducer<selChar, selectAction>(initialState, {
  [SELECT_CHAR_1]: (state: selChar) => ({ ...state, char: '시바견' }),
  [SELECT_CHAR_2]: (state: selChar) => ({ ...state, char: '진돗개' }),
  [SELECT_CHAR_3]: (state: selChar) => ({ ...state, char: '도사견' })
})

export default choice