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

addBookToLibrary('Industrial Society and Its Future', 'Theodore John Kaczynski', 188, true);
console.log(myLibrary);
