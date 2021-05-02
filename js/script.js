// get the ui elements
let form = document.querySelector('#book-form')
let booklist = document.querySelector('#book-list')
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
// UI class
class UI {
  
  static addbooklist(book) {
    let list = document.querySelector('#book-list')
    let row = document.createElement('tr')
    row.innerHTML = `
    <td> ${book.title} </td>
    <td> ${book.author} </td>
    <td> ${book.isbn} </td>
    <td><a href = '#' class = 'delete'> X</a></td>`;
    list.appendChild(row)

  }
  static clearfields() {
     document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';


  }
  static showalert(message, className) {
    let div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message))
    let container = document.querySelector('.container');
    let form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);

  }
  static deletefrombook(target) {
    if(target.hasAttribute('href')) {
      target.parentElement.parentElement.remove();
      Store.removebook(target.parentElement.previousElementSibling.textContent.trim())
      UI.showalert('Book removed!', 'success')

    }

  }
}
//local store
class Store{
  static getbooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;

  }
  static addbook(book) {
    let books = Store.getbooks();
    books.push(book);

    localStorage.setItem('books', JSON.stringify(books))
  }
  static displaybooks() {
    let books = Store.getbooks();
    books.forEach(book => {
      UI.addbooklist(book)
      
    });
  }
  static removebook() {
    let books = Store.getbooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    
  }
}

// event listeners
form.addEventListener('submit', newbook);
booklist.addEventListener('click', removebook);
document.addEventListener('DOMContentLoaded', Store.displaybooks())

// functions
function newbook(e) {
  let title = document.querySelector('#title').value,
  author =  document.querySelector('#author').value,
  isbn = document.querySelector('#isbn').value;
  
if(title === '' || author=== '' || isbn === '' ) {
  UI.showalert('Please fill all the fields', 'error')
} else {
  let book = new Book(title, author, isbn);
  
  UI.addbooklist(book);
  UI.clearfields()
  UI.showalert('Book added successfully', 'success')
  Store.addbook(book)

}
  

  e.preventDefault()

}

function removebook(e) {
  
  UI.deletefrombook(e.target);
  
  e.preventDefault()
}