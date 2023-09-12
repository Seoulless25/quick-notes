import note from '../note/note';

export default function ListOfnotes({ notes, setnotes }) {
    const note = notes.map(n =>
        <note
            notes={notes}
            setnotes={setnotes}
            note={n}
            key={n._id}
        />
    );

    return (
        <>
            {note}
        </>
    );
}