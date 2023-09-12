import { useState } from 'react';
import * as notesAPI from '../../utilities/notes-api';
import './AddnoteForm.css';

export default function AddnoteForm({ notes, setnotes, sortOrder }) {
    const [newnote, setNewnote] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newGenre, setNewGenre] = useState('');
    const [error, setError] = useState('');

    function handleChangenote(evt) {
        setNewnote(evt.target.value);
        setError('');
    }

    function handleChangeTitle(evt) {
        setNewTitle(evt.target.value);
        setError('');
    }

    function handleChangeGenre(evt) {
        setNewGenre(evt.target.value);
        setError('');
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const note = await notesAPI.create(newnote, newTitle, newGenre);
            sortOrder === 'asc' ? setnotes([...notes, note]) : setnotes([note, ...notes]);
            setNewnote('');
        }   catch {
            setError('Failed to create note: Please try again');
        }
    }

    return (
        <div>
            <div className='form-container'>
                <form onSubmit={handleSubmit} >
                    <label>Title</label>
                    <input type="text" name="title" value={newTitle} onChange={handleChangeTitle} required/>
                    <label>Write your note</label>
                    <textarea name="text" value={newnote} onChange={handleChangenote} required
                        rows={7}
                        cols={40}
                    />
                    <label>Genre</label>
                    <select name="Genre" defaultValue="" onChange={handleChangeGenre} required>
                        <option disabled value="">-- Select an option --</option>
                        <option value="Standard">Standard</option>
                        <option value="Haiku">Haiku</option>
                        <option value="Prose">Prose</option>
                        <option value="Free Verse">Free Verse</option>
                        <option value="Sonnet">Sonnet</option>
                    </select>
                    <button className='submit' type="submit">Add note</button>
                </form>
            </div>
            <p className='error-message'>{error}</p>
        </div>
    )
}