import { useState } from 'react'
import Editor from "./components/Editor"
import Sidebar from './components/Sidebar'
import Split from 'react-split';
import {nanoid} from "nanoid"
//react mde  style
import "react-mde/lib/styles/css/react-mde-all.css";


export default function App() {
  const [notes, setNotes] = useState([]);
  // check if notes[0] exists Before getting notes[0].id
  const [curNoteId, setCurNoteId] = useState((notes[0]  && notes[0].id) || "");

  /*
  task 1: display sidebar and editor when their is a note .
  task 1b: display editor only if user is on the currentNoteId && 
  task 2: As a user, I want to be abble to create new note (this can be achieve using  id: nanoid(),
            body: "# Type your markdown note's title here")
  task 3 : As a user i want to be to update my note (tips using paramter of text and value of body: text);
  task 4: display current note on the editor (findcurrentnote) || display first note 
  
  */

//function that update note 
const updateNote =(text)=>{
  setNotes(oldNotes => oldNotes.map(oldNote =>(

    //if oldnote id equals to currNoteId
    oldNote.id === curNoteId ? {...oldNote, body: text} : oldNote
  )))
}


  // Create a new note function

  const createNewNote = ()=>{
    const newNote ={
      id: nanoid(),
      body:"# Type your markdown note title here"
    }
    setNotes(prevNotes => [newNote , ...prevNotes]);
    setCurNoteId(newNote.id)
  }

  function findCurrentNote (){
    return notes.find(note=>{
      return note.id === curNoteId }) || notes[0] ;
  }
 

  return (
    <main >

      {notes.length > 0 ?

<Split
sizes={[25, 75]}
direction="horizontal" 
className="split">

<Sidebar 
newNote={createNewNote} 
currentNote={findCurrentNote()} 
setCurNoteId={setCurNoteId} 
notes={notes} />

{curNoteId &&  notes.length > 0 && 
  <Editor 
  currentNote={findCurrentNote()} 
  updateNote={updateNote} />
}
</Split>
:
      
<div className="no-notes">
<h1>You have no notes</h1>
<button className="first-note" onClick={createNewNote}>
    Create one now
</button>
</div>
      
      }
      
     
    </main>
  )
}

