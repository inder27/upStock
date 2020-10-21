export const newRecords = text => ({
  type: 'INCREMENT',
  interval: interval++,
  text
})

export const oldRecords = filter => ({
  type: 'DECREMENT',
  interval: interval--,
  filter
})
