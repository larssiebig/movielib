import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import {Modal, TextInput, Button, Textarea} from '@mantine/core'
import '@mantine/core/styles.css'
import { ENDPOINT, Movie } from '../App';
import { KeyedMutator } from 'swr';

function AddMovie({mutate}: {mutate: KeyedMutator<Movie[]> }) {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
        title: '',
        genre: ''
        },

  })

  async function createMovie(values: {title: string, genre: string}) {
    const updated = await fetch(`${ENDPOINT}/api/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then((res) => res.json())

    mutate(updated)
    form.reset()
    close()
  }

  return (
    <>  
      <Modal opened={opened} onClose={close} title="Add Movie" >
          <form onSubmit={form.onSubmit(createMovie)}>
            <TextInput 
            required 
            mb={12} 
            label="Movie" 
            placeholder='What Movie do u want to add?'
            {...form.getInputProps("title")}/>

            <Textarea
            required 
            mb={12} 
            label="Genre" 
            placeholder='What genre is the movie?'
            {...form.getInputProps("genre")}/>

            <Button type="submit">Submit</Button>
          </form>
      </Modal> <br/>

      <Button fullWidth mb={12} onClick={open}>Open modal</Button>

    </>
  )
}

export default AddMovie