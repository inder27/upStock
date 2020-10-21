import React from 'react'
import HistoricalRecords from '../HistoricalRecords'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const records = useSelector((state) => state.records) // mapStateToProps equivalent
  const dispatch = useDispatch()
  return (
    <HistoricalRecords payload={records} dispatch={dispatch} />
  )
}

export default App
