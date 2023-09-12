import { useState, useEffect } from 'react';
import * as notesAPI from '../../utilities/notes-api';
import AddnoteForm from '../../components/AddnoteForm/AddnoteForm';
import ListOfnotes from '../../components/ListOfnotes/ListOfnotes';

export default function notesPage() {
    const [notes, setnotes] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(function() {
        async function getnotes() {
            const notes = await notesAPI.index();
            setnotes(notes);
        }
        getnotes()
    }, []);

    function toggleOrder() {
        const newOrder = sortOrder ===  'asc' ? 'desc' : 'asc'
        setSortOrder(newOrder);
    }

    function handleSort(evt) {
        toggleOrder();
        const formatnotes = notes.sort(function(a, b) {
            const aDate = new Date(a.createdAt)
            const bDate = new Date(b.createdAt)

            if (sortOrder === 'asc') return bDate - aDate
            if (sortOrder === 'desc') return aDate - bDate

            return 0;
        })
        setnotes([...formatnotes]);
    }

    return ( 
        <>
            <AddnoteForm notes={notes} setnotes={setnotes} sortOrder={sortOrder} />
            {
                notes.length !== 0 ?
                <div>
                    <button onClick={handleSort}>
                        {sortOrder === 'desc' ? 'Sort in Descending Order' : 'Sort in Ascending Order'}
                    </button>
                    <h2>My notes</h2>
                    <ListOfnotes notes={notes} setnotes={setnotes} />
                </div>
                :
                <h2>No notes Added Yet</h2>
            }
        </>
    );
}