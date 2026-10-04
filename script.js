const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');

const notes = [];

function renderNotes() {
	notesList.replaceChildren();
	noteCount.textContent = `${notes.length} ${notes.length === 1 ? 'note' : 'notes'}`;

	notes.forEach((note) => {
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
		errorMessage.textContent = 'Please enter a note.';
		return;
	}

	notes.push({
		id: crypto.randomUUID(),
		text,
		category: noteCategory.value,
		createdAt: new Date()
	});

	errorMessage.textContent = '';
	noteInput.value = '';
	renderNotes();
});

renderNotes();
