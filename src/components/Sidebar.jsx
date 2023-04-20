import img from "../assets/icons8-note.svg"
export default function({newNote, notes, currentNote, setCurNoteId, deleteNote}){

    const noteElements = notes.map((note,index)=>(
        <div key={note.id}>
           <div className={`title ${note.id === currentNote.id ? "selected-note" : ""}`}

            onClick={()=> setCurNoteId(note.id)}>
               <img src={img}/>
           <h4 className="text-snippet">{note.body.split("\n")[0]} </h4>
           
           <button  className="delete-btn" onClick={(event) => deleteNote(event, note.id)} >
                    <i className="gg-trash trash-icon"></i>
                </button>
           </div>
        </div>
    ))

    return(
       
        <aside className="sidebar pane">
            <div className="sidebar__header">
                {/* <h3 className="sidebar__title">Notes</h3> */}
                <button className="sidebar__new-note" onClick={newNote}>+ New Note</button>
            </div>
            {noteElements}
           
        </aside>
    );
}