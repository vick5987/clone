// Unlock Hidden Notes
document.getElementById('unlock-notes').addEventListener('click', function () {
  const password = document.getElementById('note-password').value;
  if (password === '1234') {
    document.getElementById('secure-notes').style.display = 'block';
  } else {
    alert('Wrong password!');
  }
});

// Load notes from LocalStorage on page load
window.onload = function () {
  loadNotesFromLocalStorage();
};

// Save notes to LocalStorage
function saveNoteToLocalStorage(note) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Load notes from LocalStorage and display them
function loadNotesFromLocalStorage() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.forEach(note => addNoteToDOM(note));
}

// Add note to the DOM (UI)
function addNoteToDOM(note) {
  const noteCard = document.createElement('div');
  noteCard.classList.add('note-card');

  const noteTitle = document.createElement('div');
  noteTitle.classList.add('note-title');
  noteTitle.textContent = note.title;

  const noteContent = document.createElement('div');
  noteContent.classList.add('note-content');
  noteContent.innerHTML = note.content; // Use innerHTML to support images or formatted content

  const noteFooter = document.createElement('div');
  noteFooter.classList.add('note-footer');

  const archiveIcon = document.createElement('span');
  archiveIcon.classList.add('material-icons');
  archiveIcon.textContent = 'archive';
  archiveIcon.onclick = function () {
    archiveNote(note.id);
  };

  const deleteIcon = document.createElement('span');
  deleteIcon.classList.add('material-icons');
  deleteIcon.textContent = 'delete';
  deleteIcon.onclick = function () {
    deleteNote(note.id);
  };

  noteFooter.appendChild(archiveIcon);
  noteFooter.appendChild(deleteIcon);
  noteCard.appendChild(noteTitle);
  noteCard.appendChild(noteContent);
  noteCard.appendChild(noteFooter);

  if (!note.archived) {
    document.querySelector('.notes-grid').appendChild(noteCard); // Add to main notes grid if not archived
  } else {
    document.querySelector('.archived-notes-grid').appendChild(noteCard); // Add to archive grid if archived
  }
}

// Handle note input
const noteInput = document.querySelector('.note-input textarea');
noteInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const noteText = noteInput.value.trim();
    if (noteText) {
      const newNote = {
        id: Date.now(),
        title: 'New Note',   // You can add a title input or keep it generic
        content: noteText,
        archived: false
      };
      saveNoteToLocalStorage(newNote);
      addNoteToDOM(newNote);
      noteInput.value = ''; // Clear the input field
    }
  }
});
// Load notes from LocalStorage on page load
window.onload = function () {
  loadNotesFromLocalStorage();
};

// Save new note to LocalStorage
function saveNoteToLocalStorage(note) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Load notes from LocalStorage and display them in the DOM
function loadNotesFromLocalStorage() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.forEach(note => addNoteToDOM(note));
}

// Add a note to the DOM
function addNoteToDOM(note) {
  const noteCard = document.createElement('div');
  noteCard.classList.add('note-card');

  const noteTitle = document.createElement('div');
  noteTitle.classList.add('note-title');
  noteTitle.textContent = note.title;

  const noteContent = document.createElement('div');
  noteContent.classList.add('note-content');
  noteContent.textContent = note.content;
  
  const noteFooter = document.createElement('div');
  noteFooter.classList.add('note-footer');

  // Archive Button
  const archiveIcon = document.createElement('span');
  archiveIcon.classList.add('material-icons');
  archiveIcon.textContent = 'archive';
  archiveIcon.onclick = function () {
    archiveNote(note.id);
  };

  // Delete Button
  const deleteIcon = document.createElement('span');
  deleteIcon.classList.add('material-icons');
  deleteIcon.textContent = 'delete';
  deleteIcon.onclick = function () {
    deleteNote(note.id);
  };

  noteFooter.appendChild(archiveIcon);
  noteFooter.appendChild(deleteIcon);

  noteCard.appendChild(noteTitle);
  noteCard.appendChild(noteContent);
  noteCard.appendChild(noteFooter);

  if (note.archived) {
    document.querySelector('.archived-notes-grid').appendChild(noteCard);
  } else {
    document.querySelector('.notes-grid').appendChild(noteCard);
  }
}

// Handle new note input
const noteInput = document.getElementById('note-input');
noteInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const noteText = noteInput.value.trim();
    if (noteText) {
      const newNote = {
        id: Date.now(),
        title: 'New Note',
        content: noteText,
        archived: false
      };
      saveNoteToLocalStorage(newNote);
      addNoteToDOM(newNote);
      noteInput.value = ''; // Clear the input
    }
  }
});

// Archive a note
function archiveNote(noteId) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes = notes.map(note => {
    if (note.id === noteId) {
      note.archived = true; // Set note to archived
    }
    return note;
  });
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes(); // Re-render the notes
}

// Delete a note
function deleteNote(noteId) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes = notes.filter(note => note.id !== noteId); // Remove note by filtering it out
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes(); // Re-render the notes
}

// Re-render notes after an action
function renderNotes() {
  document.querySelector('.notes-grid').innerHTML = ''; // Clear current notes
  document.querySelector('.archived-notes-grid').innerHTML = ''; // Clear archived notes
  loadNotesFromLocalStorage();
}
// Archive a note
function archiveNote(noteId) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes = notes.map(note => {
    if (note.id === noteId) {
      note.archived = true; // Set the note to archived
    }
    return note;
  });
  localStorage.setItem('notes', JSON.stringify(notes)); // Update LocalStorage
  renderNotes(); // Re-render notes to reflect changes
}

// Delete a note
function deleteNote(noteId) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes = notes.filter(note => note.id !== noteId); // Remove the note by filtering it out
  localStorage.setItem('notes', JSON.stringify(notes)); // Update LocalStorage
  renderNotes(); // Re-render notes to reflect changes
}

// Render notes (active and archived)
function renderNotes() {
  document.querySelector('.notes-grid').innerHTML = ''; // Clear current notes
  document.querySelector('.archived-notes-grid').innerHTML = ''; // Clear archived notes
  loadNotesFromLocalStorage(); // Reload notes from LocalStorage
}

// Handle file uploads (optional)
document.getElementById('file-input').addEventListener('change', function () {
  const fileInput = document.getElementById('file-input');
  if (fileInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const newNote = {
        id: Date.now(),
        title: 'File Attachment',
        content: `<img src="${e.target.result}" alt="Attached Image" />`,
        archived: false
      };
      saveNoteToLocalStorage(newNote);
      addNoteToDOM(newNote);
    };
    reader.readAsDataURL(fileInput.files[0]); // Convert file to base64
  }
});

// Search functionality
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('input', function () {
  const query = searchInput.value.toLowerCase();
  const notes = document.querySelectorAll('.note-card');
  notes.forEach(note => {
    const title = note.querySelector('.note-title').textContent.toLowerCase();
    const content = note.querySelector('.note-content').textContent.toLowerCase();
    if (title.includes(query) || content.includes(query)) {
      note.style.display = 'block';
    } else {
      note.style.display = 'none';
    }
    // Search functionality
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', function () {
  const query = searchInput.value.toLowerCase();
  const notes = document.querySelectorAll('.note-card');
  notes.forEach(note => {
    const title = note.querySelector('.note-title').textContent.toLowerCase();
    const content = note.querySelector('.note-content').textContent.toLowerCase();
    if (title.includes(query) || content.includes(query)) {
      note.style.display = 'block';
    } else {
      note.style.display = 'none';
    }
  });
});
  });
});
