export default (initialState) => (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return [
        ...state,
        {
          interval: 'test'
        }
      ]
    case 'DECREMENT':
      return [
        ...state,
        {
          interval: 'test'
        }
      ]
    default:
    return state
  }
}
