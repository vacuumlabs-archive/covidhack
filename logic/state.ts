export interface State {
  officePassword: string | null
}

const state: State = {
  officePassword: null,
}

export const getInitialState = () => state
