//Book Class: Represents a book
class Book {
   constructor (title,author,isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
   }
}

//UI Class: Handle UI Tasks
class UI {
   static displayBooks() {
      const StoredBooks = [
         {
            title: 'Book One',
            author: 'John Doe',
            isbn: '3434434'
         },
         {
            title: 'Book Two',
            author: 'John Foe',
            isbn: '3434435'
         },
      ];

      const books = StoredBooks;
      books.forEach((book) => UI.addBookToList(book));
   }

   static addBookToList(book) {
      const list = document.querySelector('#book-list');
      const row = document.createElement('tr');

      row.innerHTML = 
      `<td class="uk-text-center">${book.title}</td>
      <td class="uk-text-center">${book.author}</td>
      <td class="uk-text-center">${book.isbn}</td>
      <td class="uk-text-center"><a href="#"><i style="color:#f0506e" class="fas fa-trash fa-sm"></i></a></td>`;

      list.appendChild(row);
   }
}

//Store Class: Handles Storage


//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
   //Prevent actual submit
   e.preventDefault();

   //Get more values
   const title = document.querySelector('#title').value;
   const author = document.querySelector('#author').value;
   const isbn = document.querySelector('#isbn').value;

   //Instantiate book
   const book = new Book(title, author, isbn);
   
   console.log(book);
})

//Event: Remove a book
