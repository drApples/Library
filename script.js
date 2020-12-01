let myLibrary = [];
const bookForm = document.getElementById('bookForm');
const formButton = document.getElementById('formButton');
const booksTable = document.getElementById('booksTable');
const cover = document.getElementById('cover');
bookForm.hidden = true;
cover.addEventListener('click', () => {
    bookForm.style.top = '-5780px';
    cover.style.display = 'none';
})

formButton.addEventListener('click', () => {
    bookForm.style.top = '50%';
    bookForm.style.margin = 'auto';
    cover.style.display = 'block';
    bookForm.firstElementChild.focus();
});

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function addBookToLibrary(title, author) {
  myLibrary.push(new Book(title, author));
  drawNewBook();
}

function drawNewBook(){
    let book = document.createElement('div');
    book.innerText = myLibrary[myLibrary.length-1].title;
    booksTable.appendChild(book);
}

addBookToLibrary('Hpbbit', 'Tolkin')
addBookToLibrary('Gur', 'polki')
console.log(myLibrary)