import { MantineProvider,  Box } from '@mantine/core'
import useSWR from 'swr'
import "./App.css"
import AddMovie from './components/AddMovie'

export const ENDPOINT = 'http://localhost:8080'

const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((res) => res.json())

function App() {
  
  const { data, mutate } = useSWR('api/movies', fetcher)

  return (
    <MantineProvider>
        <Box>
          {JSON.stringify(data)}
          <AddMovie />
        </Box>
    </MantineProvider>
    )
}

export default App
