let myLibrary = [];
const bookForm = document.getElementById('bookForm');
const formButton = document.getElementById('formButton');
const booksTable = document.getElementById('booksTable');
const cover = document.getElementById('cover');
const addButton = document.getElementById('addButton');
bookForm.hidden = true;
cover.addEventListener('click', closeModal)

formButton.addEventListener('click', () => {
  resetInput();
  bookForm.style.display = 'flex';
  bookForm.style.margin = 'auto';
  cover.style.display = 'block';
  bookForm.firstElementChild.firstElementChild.focus();
});

addButton.addEventListener('click', () => {
  title = bookForm.children[0].children[1].value;
  author = bookForm.children[1].children[1].value;
  pages = bookForm.children[2].children[1].value;
  read = bookForm.children[3].children[1].children[1].checked;
  addBookToLibrary(title, author, pages, read);
  closeModal();
}
)

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  drawNewBook();
}

function drawNewBook() {
  let book = booksTable.firstElementChild.cloneNode(true);
  book.removeAttribute('id');
  book.setAttribute('data-index', `${myLibrary.length - 1}`);
  let keys = ['title', 'author', 'pages', 'read']
  for (let i = 0; i < keys.length; i++) {
    book.children[i].innerText = myLibrary[myLibrary.length - 1][keys[i]];
  }
  book.lastElementChild.innerText = "";
  let removeButton = createRemoveBt();
  book.lastElementChild.appendChild(removeButton);
  if (myLibrary[myLibrary.length - 1].read === false) {
    let readButton = createReadBt();
    book.lastElementChild.appendChild(readButton);
  }
  booksTable.appendChild(book);
}

function closeModal() {
  bookForm.style.display = 'none';
  cover.style.display = 'none';
}

function resetInput() {
  bookForm.children[0].children[1].value = "";
  bookForm.children[1].children[1].value = "";
  bookForm.children[2].children[1].value = "";
  bookForm.children[3].children[1].children[3].checked = true;
}

function createReadBt() {
  const readButton = document.createElement('button');
  readButton.innerText = 'Read';
  readButton.addEventListener('click', e => {
    let index = +e.target.parentNode.parentNode.attributes['data-index'].value;
    myLibrary[index].read = false;
    e.target.parentNode.previousElementSibling.innerText = 'true';
  }, { once: true });
  return readButton;
}

function createRemoveBt() {
  const removeButton = document.createElement('button');
  removeButton.innerText = 'Remove';
  removeButton.addEventListener('click', e => {
    let index = +e.target.parentNode.parentNode.attributes['data-index'].value;
    myLibrary.splice(index, 1);
    for (let i = index + 2; i < booksTable.children.length; i++) {
      booksTable.children[i].setAttribute('data-index', i - 2);
    }
    booksTable.removeChild(e.target.parentNode.parentNode)
  });
  return removeButton;
}