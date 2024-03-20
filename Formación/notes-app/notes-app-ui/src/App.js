import './App.css';
import { useState, useEffect } from 'react'

const App=()=>{
    const [notes, setNotes]=useState([]);

    useEffect(()=>{
        const fetchNotes=async()=>{
            try {
                const response=await fetch("http://localhost:5000/api/notes");
                const responseNotes=await response.json();
                setNotes(responseNotes);
            } catch (error) {
                console.log(error);
            }
        }
        fetchNotes();
    },[]);

    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const [selectedNote,setSelectedNote]=useState(null);

    const handleNoteClick=(note)=>{
        setSelectedNote(note);
        setTitle(note.title);
        setContent(note.content);
    }

    const handleAddNote=async (event)=>{
        event.preventDefault();

        try {
            const response=await fetch("http://localhost:5000/api/notes",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    title,
                    content
                })
            })

            const nota=await response.json();

            setNotes([...notes,nota]);
            setTitle("");
            setContent("");
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateNote=async (event)=>{
        event.preventDefault();

        //No hay nota seleccionada
        if(selectedNote==null){
            return;
        }

        try {
            const response=await fetch("http://localhost:5000/api/notes/"+selectedNote.id,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    title,
                    content
                })
            })

            const updatedNote=await response.json();

            const updatedNotesList=notes.map((note)=>
                note.id===selectedNote.id?updatedNote:note
            )
            setNotes(updatedNotesList);
            setTitle("");
            setContent("");
            setSelectedNote(null);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel=()=>{
        setTitle("");
        setContent("");
        setSelectedNote(null);
    }

    const deleteNote=async (event,id)=>{
        event.stopPropagation();

        try {
            await fetch("http://localhost:5000/api/notes/"+id,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            setNotes(notes.filter((note)=>note.id!==id));
        } catch (error) {
            
        }
    }

    return (
        <div className='app-container'>
            <form className='note-form'
                onSubmit={(event)=>{
                    if(selectedNote==null){
                        handleAddNote(event);
                    }else{
                        handleUpdateNote(event);
                    }
                }}
            >
                <input
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    placeholder='title'
                    required
                ></input>
                <textarea
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}
                    placeholder='Content'
                    rows={10}
                    required
                ></textarea>
                {selectedNote==null ?(
                    <button type='submit'>Add Note</button>
                ):(
                    <div className='edit-buttons'>
                        <button type='submit'>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                )}
            </form>
            <div className='notes-grid'>
                {notes.map((note)=>
                    <div className='note-item' onClick={()=>handleNoteClick(note)}>
                        <div className='note-header'>
                            <button onClick={(event)=>deleteNote(event,note.id)}>x</button>
                        </div>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;