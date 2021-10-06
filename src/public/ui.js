const notes = document.querySelector('#notes');
let noteID = '';

const noteUI = note => {
    const div = document.createElement('div');

    div.innerHTML = `
    <div class="card card-body mb-2">
        <h5 class="card-title">${note.title}</h5>
        <p class="card-text">${note.description}</p>
        <a href="#" class="btn btn-outline-primary mb-2 update" data-id="${note.id}" data-title="${note.title}" data-description="${note.description}">Update</a>
        <a href="#" class="btn btn-danger delete" data-id="${note.id}">Delete</a>
    </div>
    `;

    const btnDelete = div.querySelector('.delete');
    const btnUpdate = div.querySelector('.update');

    btnDelete.addEventListener('click', (e) => {
        e.preventDefault();
        deleteNote(btnDelete.dataset.id);
    });

    btnUpdate.addEventListener('click', (e) => {
        e.preventDefault();
        getNote(btnUpdate.dataset.id);
    });

    return div;
}

const renderNotes = load => {
    notes.innerHTML = '';
    load.map((note) => {
        notes.append(noteUI(note));
    })
}

const appendNote = note => notes.append(noteUI(note));