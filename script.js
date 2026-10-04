const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');
const clearAllButton = document.querySelector('#clear-all');

const storageKey = 'quick-notes';
const notes = loadNotes();

function loadNotes() {
	try {
		const savedNotes = JSON.parse(localStorage.getItem(storageKey));
		return Array.isArray(savedNotes)
			? savedNotes.map((note) => ({ ...note, createdAt: new Date(note.createdAt) }))
			: [];
	} catch (error) {
		return [];
	}
}

function saveNotes() {
	localStorage.setItem(storageKey, JSON.stringify(notes));
}

function renderNotes() {
	notesList.replaceChildren();

	if (notes.length === 0) {
		noteCount.textContent = 'You have no notes yet.';
	} else if (notes.length === 1) {
		noteCount.textContent = 'You have 1 note.';
	} else {
		noteCount.textContent = `You have ${notes.length} notes.`;
	}

	const searchWords = searchInput.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
	const filteredNotes = notes.filter((note) => {
		const noteText = note.text.toLowerCase();
		return searchWords.every((word) => noteText.includes(word));
	});

	if (searchWords.length > 0 && filteredNotes.length === 0) {
		const emptyMessage = document.createElement('li');
		emptyMessage.textContent = 'No notes match your search.';
		notesList.append(emptyMessage);
		return;
	}

	filteredNotes.forEach((note) => {
		const noteItem = document.createElement('li');
		const categoryLabel = document.createElement('small');
		const noteText = document.createElement('p');
		const createdAt = document.createElement('time');
		const deleteButton = document.createElement('button');

		noteItem.classList.add(`category-${note.category.toLowerCase()}`);
		categoryLabel.textContent = note.category;
		noteText.textContent = note.text;
		createdAt.dateTime = note.createdAt.toISOString();
		createdAt.textContent = note.createdAt.toLocaleString();
		deleteButton.type = 'button';
		deleteButton.textContent = 'Delete';
		deleteButton.addEventListener('click', () => {
			const noteIndex = notes.findIndex((item) => item.id === note.id);
			notes.splice(noteIndex, 1);
			saveNotes();
			renderNotes();
		});

		noteItem.append(categoryLabel, noteText, createdAt, deleteButton);
		notesList.append(noteItem);
	});
}

noteForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const text = noteInput.value.trim();

	if (!text) {
		errorMessage.textContent = 'Please type a note first.';
		return;
	}

	if (text.length > 200) {
		errorMessage.textContent = 'Notes must be 200 characters or fewer.';
		return;
	}

	notes.push({
		id: crypto.randomUUID(),
		text,
		category: noteCategory.value,
		createdAt: new Date()
	});

	saveNotes();
	errorMessage.textContent = '';
	noteInput.value = '';
	renderNotes();
});

searchInput.addEventListener('input', renderNotes);

clearAllButton.addEventListener('click', () => {
	if (!confirm('Delete all notes?')) {
		return;
	}

	notes.splice(0, notes.length);
	saveNotes();
	renderNotes();
});

renderNotes();
