document.addEventListener('DOMContentLoaded', function() {
    loadNotes();

    document.getElementById('note-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addNote();
    });

    document.getElementById('notes-list').addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            const action = e.target.dataset.action;
            const id = e.target.parentElement.dataset.id;
            if (action === 'delete') {
                deleteNote(id);
            } else if (action === 'edit') {
                editNote(id);
            }
        }
    });
});

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        displayNote(note);
    });
}

function addNote() {
    const noteTitle = document.getElementById('note-title').value;
    const noteContent = document.getElementById('note-content').value;
    const newNote = { id: Date.now().toString(), title: noteTitle, content: noteContent };
    
    document.getElementById('note-title').value = '';
    document.getElementById('note-content').value = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));

    displayNote(newNote);
}

function displayNote(note) {
    const notesList = document.getElementById('notes-list');
    const li = document.createElement('li');
    li.dataset.id = note.id;
    li.innerHTML = `
        <strong>${note.title}</strong>
        <p>${note.content}</p>
        <button class="edit" data-action="edit">Edit</button>
        <button data-action="delete">Delete</button>
    `;
    notesList.appendChild(li);
}

function deleteNote(id) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));

    document.querySelector(`li[data-id="${id}"]`).remove();
}

function editNote(id) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const note = notes.find(note => note.id === id);

    document.getElementById('note-title').value = note.title;
    document.getElementById('note-content').value = note.content;

    deleteNote(id);
}