import { MantineProvider,  Box, Flex } from '@mantine/core'
import useSWR from 'swr'
import "./App.css"
import AddMovie from './components/AddMovie'

export interface Movie {
  id: string
  title: string
  genre: string
  year: string
  favourite: boolean
}

export const ENDPOINT = 'http://localhost:8080'

const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((res) => res.json())


function App() {
  const { data, mutate } = useSWR<Movie[]>('api/movies', fetcher)

  return (
    <MantineProvider>
      <Box>
        <Flex direction="row" gap={100} align="center" justify="center" className="App">
          {data?.map((movie) => (
            <div key={movie.id}>
              <div>
                <h2>{movie.title}</h2>
                <p>{movie.genre}</p>
                <p>{movie.year}</p>
                <p>{movie.favourite}</p>
              </div>
            </div>
          ))}
        </Flex>
        <AddMovie mutate={mutate} />
      </Box>
    </MantineProvider>
    )
}

export default App
