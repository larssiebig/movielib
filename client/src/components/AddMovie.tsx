import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import {Modal, TextInput, Button, Textarea} from '@mantine/core'
import '@mantine/core/styles.css'

function AddMovie() {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
        title: '',
        genre: '',
        year: '',
        favourite: false
        },

  })

  function createMovie() {

  }

  return <>
  
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
            label="genre" 
            placeholder='What genre is the movie?'
            {...form.getInputProps("genre")}/>

            <Button type="submit">Submit</Button>
          </form>
      </Modal> <br/>

      <Button fullWidth mb={12} onClick={open}>Open modal</Button>

  </>
}

export default AddMovie