let importLocalStorage = localStorage.getItem('shopping-list-for-mayo');
let array = [];

if (importLocalStorage) {
  array = [...JSON.parse(importLocalStorage)];
  renderNotes();
}





let add = document.querySelector('.add-button');

add.addEventListener('click', () => {
  let newNote = {};
  newNote.text = prompt('Enter text here!');
  newNote.strike = false;
  newNote.id = array.length;
  array.push(newNote)
  renderNotes()
})





function renderNotes () {
  let id = 0;

  document.querySelectorAll('.note').forEach(note => {
    note.classList.add('off');
  });

  let container = document.querySelector('.container');

  array.forEach(elem => {
    let note = document.createElement('div');
    let text = document.createElement('div');
    let editButton = document.createElement('div');
    let deleteButton = document.createElement('div');

    container.prepend(note);
    note.classList.add('note');
    
    note.append(text);
    text.classList.add('note__text');
    text.textContent = elem.text;
    if (elem.strike) {
      text.classList.add('strike');
    }

    note.append(editButton);
    editButton.classList.add('note__edit');
    editButton.setAttribute('id', id);

    note.append(deleteButton);
    deleteButton.classList.add('note__delete');
    deleteButton.setAttribute('id', id++);
  });

  document.querySelectorAll('.note__text').forEach(text => {
    text.addEventListener('click', strikeText);
  })

  document.querySelectorAll('.note__delete').forEach(elem => {
    elem.addEventListener('click', deleteNote);
  })

  document.querySelectorAll('.note__edit').forEach(elem => {
    elem.addEventListener('click', editNote);
  })

  localStorage.setItem('shopping-list-for-mayo', JSON.stringify(array));
};





function strikeText () {
  if (!this.classList.contains('strike')) {
    this.classList.add('strike');
    array.map(elem => {
      return elem.text === this.textContent ? elem.strike = true : elem.strike;
    })
  } else {
    this.classList.remove('strike');
    array.map(elem => {
      return elem.text === this.textContent ? elem.strike = false : elem.strike;
    })
  }
  localStorage.setItem('shopping-list-for-mayo', JSON.stringify(array));
}





function deleteNote () {
  array.splice(this.getAttribute('id'), 1);
  renderNotes();
}





function editNote () {
  array[this.getAttribute('id')].text = prompt('Enter text here!');
  renderNotes();
}
