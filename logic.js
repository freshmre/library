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
  let xBtn = document.createElement('img');
  let titleNode = document.createElement('div');
  let authorNode = document.createElement('div');
  let pagesNode = document.createElement('div');
  let readNode = document.createElement('div');
  let bookNode = document.createElement('div');

  xBtn.setAttribute('src', 'assets/close_black_24dp.svg');
  xBtn.setAttribute('alt', 'Delete book');
  xBtn.style.float = 'right';
  xBtn.style.cursor = 'pointer';
  xBtn.addEventListener('click', deleteBook);

  titleNode.classList.add('book-title');
  titleNode.textContent = book.title;

  authorNode.classList.add('book-author');
  authorNode.textContent = book.author;

  pagesNode.classList.add('pages');
  pagesNode.textContent = book.pages;

  readNode.addEventListener('click', toggleReadStatus);
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

  bookNode.appendChild(xBtn);
  bookNode.appendChild(titleNode);
  bookNode.appendChild(authorNode);
  bookNode.appendChild(pagesNode);
  bookNode.appendChild(readNode);

  return bookNode;
}

function updateEntriesList(entriesListDOM, bookList) {
  entriesListDOM.innerHTML = '';
  bookOrder = 0;
  bookList.forEach(book => {
    let newBook = makeBookDOMElement(book);
    newBook.dataset.index = bookOrder;
    entriesListDOM.append(newBook);
    bookOrder++;
  })
}

function deleteBook(e) {
  indexToDelete = e.srcElement.parentElement.dataset.index;
  myLibrary.splice(indexToDelete, 1);
  updateEntriesList(libraryEntries, myLibrary);
}

function toggleReadStatus(e) {
  indexToChange = e.srcElement.parentElement.dataset.index;
  myLibrary[indexToChange].read = !myLibrary[indexToChange].read;
  updateEntriesList(libraryEntries, myLibrary);
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

function deleteAllBooks() {
  myLibrary = [];
  updateEntriesList(libraryEntries, myLibrary);
}

const libraryEntries = document.getElementById('entries');
const addBtn = document.getElementById('add-book-icon');
const delAllBtn = document.getElementById('delete-all-icon');
const closeBtn = document.getElementById('close-button');
const popup = document.getElementById('popup');
const container = document.getElementById('container');
const titleBox = document.getElementById('title-box');
const authorBox = document.getElementById('author-box');
const pagesBox = document.getElementById('pages-box');
const finishedCheckbox = document.getElementById('finished-box');
const addBookForm = document.querySelector('#popup form');

addBtn.addEventListener('click', togglePopup);
delAllBtn.addEventListener('click', deleteAllBooks);

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

addBookToLibrary('Industrial Society and Its Future', 'Theodore John Kaczynski', 140, true);
addBookToLibrary('Electronics Made Simple', 'Henry Jacobowitz', 191, false);
addBookToLibrary('Fundamentals of Analytical Chemistry', 'Donald M. West', 1165, false);
addBookToLibrary('Mechanics of Materials', 'Russell Hibbeler', 739, false);

updateEntriesList(libraryEntries, myLibrary);