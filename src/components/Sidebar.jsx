export default function({newNote, notes, currentNote, setCurNoteId}){

    const noteElements = notes.map((note,index)=>(
        <div key={note.id}>
           <div className={`title ${note.id === currentNote.id ? "selected-note" : ""}`}

            onClick={()=> setCurNoteId(note.id)}>
           <h4 className="text-snippet">note {index + 1} </h4>
           </div>
        </div>
    ))

    
    return(
       
        <aside className="sidebar pane">
            <div className="sidebar__header">
                <h3 className="sidebar__title">Notes</h3>
                <button className="sidebar__new-note" onClick={newNote}>+</button>
            </div>
            {noteElements}
        </aside>
    );
}