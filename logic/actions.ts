import {Action} from '../logic/redux/types'

export const changePassword = (pass: string): Action<string> => ({
  type: 'Change office password',
  payload: pass,
  reducer: (state) => ({...state, officePassword: pass}),
})

export const createNewApplicant = (): Action<any> => ({
  type: 'Change new applicant',
  reducer: (state) => state,
})
