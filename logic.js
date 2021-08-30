let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => {
    let formattedInfoStr = `${this.title} by ${author}, ${pages} pages, `;
    formattedInfoStr += read ? 'read' : 'not read yet';
    return formattedInfoStr;
  }
}

function addBookToLibrary(title, author, pages, read) {
  bookToAdd = new Book(title, author, pages, read);
  myLibrary.push(bookToAdd);
}

function makeBookDOMElement(book) {
  let titleNode = document.createElement('div');
  let authorNode = document.createElement('div');
  let pagesNode = document.createElement('div');
  let readNode = document.createElement('div');
  let bookNode = document.createElement('div');

  titleNode.classList.add('book-title');
  titleNode.textContent = book.title;

  authorNode.classList.add('book-author');
  authorNode.textContent = book.author;

  pagesNode.classList.add('pages');
  pagesNode.textContent = book.pages;

  readNode.classList.add('is-read');
  if (book.read) {
    readNode.classList.add('read');
    readNode.textContent = 'finished';
  }
  else {
    readNode.classList.add('unread');
    readNode.textContent = 'unfinished';
  }

  bookNode.classList.add('book');

  bookNode.appendChild(titleNode);
  bookNode.appendChild(authorNode);
  bookNode.appendChild(pagesNode);
  bookNode.appendChild(readNode);

  return bookNode;
}

function updateEntriesList(entriesListDOM, bookList) {
  entriesListDOM.innerHTML = '';
  bookList.forEach(book => {
    let newBook = makeBookDOMElement(book);
    entriesListDOM.append(newBook);
  })
}

function clearFields() {
  titleBox.value = "";
  authorBox.value = "";
  pagesBox.value = "";
  finishedCheckbox.checked = false;
}

function togglePopup() {
  popup.classList.toggle('active');
  container.classList.toggle('active');
}

const libraryEntries = document.getElementById('entries');
const addBtn = document.getElementById('add-book-icon');
const closeBtn = document.getElementById('close-button');
const popup = document.getElementById('popup');
const container = document.getElementById('container');
const titleBox = document.getElementById('title-box');
const authorBox = document.getElementById('author-box');
const pagesBox = document.getElementById('pages-box');
const finishedCheckbox = document.getElementById('finished-box');
const addBookForm = document.querySelector('#popup form');

addBtn.addEventListener('click', togglePopup);

closeBtn.addEventListener('click', e => {
  togglePopup();
  clearFields();
})

addBookForm.onsubmit = e => {
  e.preventDefault();
  let title = titleBox.value;
  let author = authorBox.value;
  let pages = pagesBox.value;
  let read = finishedCheckbox.checked;
  togglePopup();
  clearFields();
  addBookToLibrary(title, author, pages, read);
  updateEntriesList(libraryEntries, myLibrary);
}

// addBookToLibrary('Industrial Society and Its Future', 'Theodore John Kaczynski', 188, true);
// addBookToLibrary('Industrial Society and Its Future', 'Theodore John Kaczynski', 188, true);
// addBookToLibrary('Industrial Society and Its Future', 'Theodore John Kaczynski', 188, true);
// addBookToLibrary('Industrial Society and Its Future', 'Theodore John Kaczynski', 188, true);

updateEntriesList(libraryEntries, myLibrary);
