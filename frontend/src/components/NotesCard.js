import React from 'react';

const NotesCard = () => {
    const [notes, setNotes] = React.useState('');

    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    };

    return (
        <div className="dashboard-card notes-card">
            <h3>Notes</h3>
            <textarea
                className="notes-textarea"
                placeholder="Jot down your daily observations..."
                value={notes}
                onChange={handleNotesChange}
                rows="6"
            ></textarea>
            {/* Optional: Save button if auto-save isn't implemented */}
            {/* <button className="cta-button">Save Notes</button> */}
        </div>
    );
};

export default NotesCard; 