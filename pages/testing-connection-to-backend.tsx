// import type { NextPage } from 'next'
import axios from 'axios'
import { useEffect, useState } from 'react'

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER
  ? process.env.NEXT_PUBLIC_API_SERVER
  : process.env.NEXT_PUBLIC_API_SERVER_BASE
  ? `http://${process.env.NEXT_PUBLIC_API_SERVER_BASE}:3001`
  : 'http://server:3001'

const TestingConnectionToBackendPage = () => {
  const [serverConnection, setServerConnection] = useState('Not connected to server')
  const [dbConnection, setDbConnection] = useState('Not connected to database via server')

  useEffect(() => {
    axios
      .get(`${API_SERVER}/ping`)
      .then((response) => {
        console.log(response.data)
        setServerConnection('Connected to server')
      })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    axios
      .get(`${API_SERVER}/test-db-connection`)
      .then((response) => {
        console.log(response.data)
        setDbConnection('Connected to database via server')
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div>
      <h3>Testing connection to backend</h3>
      <p data-cy="server-connection">{serverConnection}</p>
      <p data-cy="db-connection">{dbConnection}</p>
    </div>
  )
}

export default TestingConnectionToBackendPage
