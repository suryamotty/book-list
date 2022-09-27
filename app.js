//book constructor
function Book(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
//UI constructor
function UI(){}
    
//add book to list
UI.prototype.addBookToList = function(book){
        //console.log(book);

const list = document.getElementById('book-list');

//create table row
const row = document.createElement('tr');
//console.log(row);

//insert columns
row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
list.appendChild(row);
    }

    //show alert
    UI.prototype.showAlert = function(message, className){

        //create div
        const div = document.createElement('div');

        //add classname to div
        div.className = `alert ${className}`;

        //add textnode
        div.appendChild(document.createTextNode(message));

        //get parent element
        const container = document.querySelector('.container');

        //get form
        const form= document.querySelector('#book-form');

        //insert alert
        container.insertBefore(div, form);//what shold be insert and before what

        //set timeout
        setTimeout(function(){
            document.querySelector('.alert').remove();},3000);
      
    }


//clear fields

UI.prototype.clearFields = function(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    //delete book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();

    }
}


// event listeners for submit button
    document.getElementById('book-form').addEventListener('submit',function(e){
    
    //get form values
    const title = document.getElementById('title').value,
         author = document.getElementById('author').value,
         isbn = document.getElementById('isbn').value;
         
       //console.log(title,author,isbn);

       //instantiating book object
       const book = new Book(title, author, isbn);
       //console.log(book);

       //instantiating UI object
       const ui = new UI();
       //console.log(ui);

       //validating the input fields
       if(title === '' || author === '' ||isbn === ''){
        // error alert
        ui.showAlert('please fill in all fields', 'error');
       
       }
        else{
       //add book to list
       ui.addBookToList(book);

       //show success
       ui.showAlert('Book Added','success');
       ui.clearFields();
        }
    e.preventDefault();
});

//event listener for delete
document.getElementById('book-list').addEventListener('click',function(e){
    
    //delete book
    const ui = new UI();
    ui.deleteBook(e.target);//target is the delete class for delete button

    //show message
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();
});
