import { useState } from 'react';
import * as notesAPI from '../../utilities/notes-api';
import './note.css';

export default function note({ note, notes, setnotes }) {
    const [visable, setVisable] = useState(false);
    const [editnote, setEditnote] = useState(note.text);
    const date = new Date(note.createdAt)

    async function handleDelete() {
        const deletenote = await notesAPI.deletenote(note._id);
        setnotes(notes.filter(function(n) {
            return n._id !== deletenote._id
        })); 
    }

    function handleChange(evt) {
        setEditnote(evt.target.value);
    }

    async function handleEdit() {
        setVisable(!visable);
        const updatednote = await notesAPI.edit(note._id, editnote);
        const updatednotes = notes.map(n => {
            if (n._id === updatednote._id) {
                n.text = updatednote.text
            }
            return n 
        })
        setnotes(updatednotes)
    }

    function handleKeyPress(evt) {
        if (evt.key === 'Enter') {
            handleEdit()
        }
    }

    function toggleInput() {
        setVisable(!visable);
    }

    return (
        <div className='note-container'>
            <div className='note-info'>
                <p className='note-data'>{date.toLocaleString()} &nbsp; </p>
                <p className='note-title'>Title:&nbsp;&nbsp;{note.title}</p>
                <p className='note-genre'>&nbsp;&nbsp;Genre: {note.genre}</p>
                { visable &&
                    <div>
                        <input onKeyDown={handleKeyPress} value={editnote}  onChange={handleChange} />
                    </div>
                }
            </div>
            { !visable &&
                <div className='note-content'>
                    <p className='note-text'>&nbsp;&nbsp;{note.text}</p>
                </div>
            }
            <div className='note-buttons'>
             <button
                    onClick={toggleInput}
                    className='edit-note'
                    >
                    Edit
                    </button>
                <button
                    className='delete-note'
                    onClick={handleDelete}
                 >
                    Delete
                     </button>
            </div>
        </div>
    )
};