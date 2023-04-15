import { useEffect, useState } from 'react'
import Editor from "./components/Editor"
import Sidebar from './components/Sidebar'
import Split from 'react-split';
import {nanoid} from "nanoid"
//react mde  style
import "react-mde/lib/styles/css/react-mde-all.css";


export default function App() {
  //lazy state initialization (retrieve notes from local storage)
  const [notes, setNotes] = useState( () => JSON.parse(localStorage.getItem("notes")) || []);
  // check if notes[0] exists Before getting notes[0].id
  const [curNoteId, setCurNoteId] = useState((notes[0]  && notes[0].id) || "");



//sideeffect that set note local storage

  useEffect(()=>{
    localStorage.setItem("notes",  JSON.stringify(notes))

  },[notes])

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

