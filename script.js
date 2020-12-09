let myLibrary = [];
const keys = ['title', 'author', 'pages', 'read'];
const booksTable = document.getElementById('booksTable');
const storage = window.localStorage;
main();

function main() {
  const bookForm = document.getElementById('bookForm');
  const formButton = document.getElementById('formButton');
  const cover = document.getElementById('cover');
  const addButton = document.getElementById('addButton');

  cover.addEventListener('click', closeModal)
  formButton.addEventListener('click', () => {
    resetInput();
    bookForm.style.display = 'flex';
    bookForm.style.margin = 'auto';
    cover.style.display = 'block';
    bookForm.firstElementChild.firstElementChild.focus();
  });
  addButton.addEventListener('click', () => {
    title = bookForm.children[0].children[1].value.trim().replace(/' | '/g, ' ');
    author = bookForm.children[1].children[1].value.trim().replace(/' | '/g, ' ');
    pages = bookForm.children[2].children[1].value.trim().replace(/' | '/g, ' ');
    read = bookForm.children[3].children[1].children[1].checked;
    addBookToLibrary(title, author, pages, read);
    toStorage(myLibrary[myLibrary.length - 1], myLibrary.length - 1);
    closeModal();
  }
  )
  for(let i = 0; i < storage.length; i++){
    let bookInfo = storage.getItem(i).split(' | ');
    bookInfo[3] === 'false' ? bookInfo[3] = false : bookInfo[3] = true;
    addBookToLibrary(bookInfo[0], bookInfo[1], bookInfo[2], bookInfo[3]);
  }
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  drawNewBook(myLibrary[myLibrary.length - 1]);
}

function drawNewBook(book) {
  let bookCopy = booksTable.firstElementChild.cloneNode(true);
  bookCopy.removeAttribute('id');
  bookCopy.setAttribute('data-index', `${myLibrary.length - 1}`);
  for (let i = 0; i < keys.length; i++) {
    bookCopy.children[i].innerText = book[keys[i]];
  }
  bookCopy.lastElementChild.innerText = "";
  let removeButton = createRemoveBt();
  bookCopy.lastElementChild.appendChild(removeButton);
  {
    let readButton = createReadBt();
    bookCopy.lastElementChild.appendChild(readButton);
  }
  booksTable.appendChild(bookCopy);
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
  if (myLibrary[myLibrary.length - 1].read === false){
  readButton.innerText = 'Read';
  }
  else{
  readButton.innerText = 'Unread';
  }
  readButton.addEventListener('click', e => {
    if(e.target.innerText === 'Read'){
      e.target.innerText = 'Unread';
      changeRead(e.target.parentNode.previousElementSibling, true);
    }
    else{
    e.target.innerText = 'Read';
    changeRead(e.target.parentNode.previousElementSibling, false);
    }
  });
  return readButton;
}

function changeRead(readCell, readValue) {
  let index = +readCell.parentNode.attributes['data-index'].value;
  myLibrary[index].read = readValue
  storage.setItem(index, storage.getItem(index).replace(!readValue, readValue));
  readCell.innerText = readValue;
}

function createRemoveBt() {
  const removeButton = document.createElement('button');
  removeButton.innerText = 'Remove';
  removeButton.addEventListener('click', e => removeBtn(e.target.parentNode.parentNode));
  return removeButton;
}

function removeBtn(book) {
  let index = +book.attributes['data-index'].value;
  myLibrary.splice(index, 1);
  booksTable.removeChild(book);
  for (let i = index + 1; i < booksTable.children.length; i++) {
    booksTable.children[i].setAttribute('data-index', i - 1);
    storage.setItem(`${i - 1}`, storage.getItem(`${i}`));
  }
  storage.removeItem(`${myLibrary.length}`);
}

function toStorage(book, index){
  let value = '';
  for(let i = 0; i < keys.length; i++){
    value += book[keys[i]] + ' | ';
  }
  storage.setItem(index, value.slice(0, -3));
}