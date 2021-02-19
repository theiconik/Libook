//Book Class: Represents a book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");

    row.innerHTML = `<td class="uk-text-center">${book.title}</td>
      <td class="uk-text-center">${book.author}</td>
      <td class="uk-text-center">${book.isbn}</td>
      <td class="uk-text-center"><a href="#"><i style="color:#f0506e" class="fas fa-trash fa-sm delete"></i></a></td>`;

    list.appendChild(row);
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `uk-alert uk-text-center uk-flex uk-flex-center uk-flex-middle uk-align-center uk-alert-${className}`;
    const p = document.createElement("p");
    p.className = `uk-text-center uk-flex uk-flex-center`;
    p.appendChild(document.createTextNode(message));
    div.appendChild(p);
    div.style.height = "10px";
    div.style.width = "350px";
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    //Make vanish in 2 secs
    setTimeout(() => document.querySelector(".uk-alert").remove(), 2000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.parentElement.remove();
    }
  }
}

//Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if ((book.isbn = isbn)) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

//Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Event: Add a book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  //Prevent actual submit
  e.preventDefault();

  //Get more values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //Validate
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Are you high on weed?!", "danger");
  } else {
    //Instantiate book
    const book = new Book(title, author, isbn);

    // console.log(book);

    //Add Book to Local Storage
    Store.addBook(book);

    //Add book to UI
    UI.addBookToList(book);

    // Show success message
    UI.showAlert("Book Added successfully", "success");

    //Clear fields
    UI.clearFields();
  }
});

//Event: Remove a book
document.querySelector("#book-list").addEventListener("click", (e) => {
  //Remove book from UI
   UI.deleteBook(e.target);

   //Remove book from store
   Store.removeBook(e.target.parentElement.parentElement.previousElementSibling.textContent);

  UI.showAlert("Book Removed successfully", "warning");
});
