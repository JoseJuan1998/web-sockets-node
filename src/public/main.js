const noteForm = document.querySelector('form');
const title = document.querySelector('#title');
const description = document.querySelector('#description');

noteForm.addEventListener('submit', e => {
    e.preventDefault();
    if (noteID) {
        updateNote(noteID, title.value, description.value);
    }else{
        saveNote(title.value, description.value);   
    }

    title.value = '';
    description.value = '';
    noteID = '';
});