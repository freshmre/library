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
  bookList.forEach( book => { 
    let newBook = makeBookDOMElement(book);
    entriesListDOM.append(newBook);
  })
}

let libraryEntries = document.getElementById('entries');

addBookToLibrary('Industrial Society and Its Future', 'Theodore John Kaczynski', 188, true);
addBookToLibrary('Industrial Society and Its Future', 'Theodore John Kaczynski', 188, true);
addBookToLibrary('Industrial Society and Its Future', 'Theodore John Kaczynski', 188, true);
addBookToLibrary('Industrial Society and Its Future', 'Theodore John Kaczynski', 188, true);

updateEntriesList(libraryEntries, myLibrary);
