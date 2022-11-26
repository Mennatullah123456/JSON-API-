// start login and register 
var signInLink = document.getElementById('signIn-Link');
var signUpLink = document.getElementById('signUp-Link');
var signInBlock = document.getElementById('signIn-Block');
var signUpBlock = document.getElementById('signUp-Block');
var signInBtb = document.getElementById('signin-btn');
var signUpBtb = document.getElementById('signup-btn');
var formErrors = document.getElementById('form-errors');
var formSuccess = document.getElementById('form-success');
var clearLocalstorage = document.getElementById('clear-localStorage');
var defaultNav = document.getElementById('defaultNav');
var adminNav = document.getElementById('adminNav');
var LoggedUser = document.getElementById('loggedIn-userName');
var signOut = document.getElementById('signOut');

clearLocalstorage.onclick = function() {
  var localStorageStatus = document.getElementById('localStorage-status');
  localStorage.clear();
  localStorageStatus.innerHTML = 'Cleared localStorage';
  setTimeout(function() {
    localStorageStatus.innerHTML = '';
  }, 3000);
}

signInLink.onclick = function() {
  signUpBlock.style.display = "none";
  signInBlock.style.display = "block";
};

signUpLink.onclick = function() {
  signInBlock.style.display = "none";
  signUpBlock.style.display = "block";
};

signUpBtb.onclick = function() {
  var signUpUserName = document.getElementById('signUp-userName').value;
  var signUpPassword = document.getElementById('signUp-passWord').value;
  var signUpPasswordConfirm = document.getElementById('signUp-passWord-confirm').value;

  if(signUpUserName === '' && signUpPassword === '' && signUpPasswordConfirm === '') {
    formErrors.innerHTML = 'All fields are required to create an account. Please fill it.';
    setTimeout(function() {
      formErrors.innerHTML = '';
    }, 3000);
  }
  else if(signUpUserName !== '' && signUpPassword === '' && signUpPasswordConfirm === '') {
    formErrors.innerHTML = 'Please fill empty fields.';
    setTimeout(function() {
      formErrors.innerHTML = '';
    }, 3000);
  }
  else if(signUpUserName === '' && signUpPassword !== '' && signUpPasswordConfirm !== '') {
    formErrors.innerHTML = 'Please fill empty fields.';
    setTimeout(function() {
      formErrors.innerHTML = '';
    }, 3000);
  }
  else if(signUpPassword !== '' && signUpPasswordConfirm !== '' ) {
    if(signUpPassword === signUpPasswordConfirm) {
      formErrors.innerHTML = '';
      formSuccess.innerHTML = 'Your account created. Please Sign-in.';
      localStorage.setItem(signUpUserName,signUpPassword);
      signUpBlock.reset();
      setTimeout(function() {
        formSuccess.innerHTML = '';
      }, 3000);
    }
    else {
      formErrors.innerHTML = 'Password does not match. Please try again.';
      setTimeout(function() {
        formErrors.innerHTML = '';
      }, 3000);
    }
  }
  else {
    formErrors.innerHTML = 'Please fill empty fields.';
    setTimeout(function() {
      formErrors.innerHTML = '';
    }, 3000);
  }
}

signInBtb.onclick = function() {
  var signInUserName = document.getElementById('userName').value;
  var signInPassword = document.getElementById('passWord').value;
  if(signInUserName === '' && signInPassword === '') {
    formErrors.innerHTML = 'All fields are required. Please fill it.';
    setTimeout(function() {
      formErrors.innerHTML = '';
    }, 3000);
  }
  else if(signInUserName !== '' && signInPassword === '') {
    formErrors.innerHTML = 'Please fill empty fields.';
    setTimeout(function() {
      formErrors.innerHTML = '';
    }, 3000);
  }
  else if(signInUserName !== '' && signInPassword !== '') {
    var localStorageData = localStorage;
    if(localStorageData.hasOwnProperty(signInUserName) && signInPassword === localStorageData[signInUserName] ) {
      defaultNav.style.display = 'none';
      adminNav.style.display = 'block';
      signInBlock.style.display = 'none';
      signUpBlock.style.display = 'none';
      LoggedUser.innerHTML = signInUserName;
      signInBlock.reset();
    }
    else {
      formErrors.innerHTML = 'Invalid User name and password.';
      setTimeout(function() {
        formErrors.innerHTML = '';
      }, 3000);
    }
  }
  else {
    formErrors.innerHTML = 'Invalid User name and password.';
    setTimeout(function() {
      formErrors.innerHTML = '';
    }, 3000);
  }
}
//sign out
signOut.onclick = function() {
  defaultNav.style.display = 'block';
  adminNav.style.display = 'none';
}
// end login and sign out


// select  btn action
const input = document.querySelector('[data-js=new-todo]');
    const todoList = document.querySelector('[data-js=todo-list]');
    const loadButton = document.querySelector('[data-js=loadList]');
    const saveButton = document.querySelector('[data-js=saveList]');
    const clearButton = document.querySelector('[data-js=clearList]');
    // complete Todo and add class completed
    function completeTodo(todo) {
      todo.children[0].classList.toggle('completed');
    }
    // delete Todo
    function deleteTodo(todo) {
      todo.remove();
    }

    function editTodo(todo){
    var innerContent = todo.children[0].innerHTML;
    input.value = innerContent;
    input.focus();
    input.select();
    todo.remove();
    }

    function LoadTodos() {
      if (localStorage.getItem('Todo List')) {
        // add disabled state to load button, and remove loading
        loadButton.classList.remove('is-loading');
        loadButton.setAttribute('disabled', true);

        clearButton.removeAttribute('disabled');
        saveButton.removeAttribute('disabled');

        todoList.innerHTML = localStorage.getItem('Todo List');
      } else {
        loadButton.setAttribute('disabled', true);
        loadButton.classList.remove('is-loading');

        clearButton.removeAttribute('disabled');
        saveButton.removeAttribute('disabled');
      }
    }
// save all todo item  in localStorage
    function saveTodoList() {
      localStorage.setItem('Todo List', todoList.innerHTML);
    }

    todoList.addEventListener('click', function(event) {
      let target = event.target.getAttribute('data-js');
      let todo = event.target.parentElement;

      // if remove button is pressed then remove that Button's parent
      if ( target == 'remove' ) {
         deleteTodo(todo)
      }
      if ( target == 'edit' ) {
        editTodo(todo)
     }
      // if complete button is pressed then add complete class
      if ( target == 'complete' ) {
        completeTodo(todo);
        // show number of completed task 
        let comp = document.querySelectorAll('.completed');
        let numberCompleted = document.querySelector('.numberCompleted');
        numberCompleted.innerHTML =   comp.length;
      }
    });

    input.addEventListener('keypress', function(keyPressed){
      // if enter key is pressed
      if ( keyPressed.code == 'Enter' ) {

        // only submit if there's something in the input
        if (this.value.length) {
          const newTodoCopy = this.value;
          const todoItem = `
            <li class='todo-list--item mt-2 '>
              <h6>${newTodoCopy}</h6>
              <button class='button btn btn-info text-white' data-js='complete'>Complete</button>
              <button class='button btn btn-success ' data-js='edit'>Edit</button>
              <button class='button btn btn-danger 'data-js='remove' 
              >Remove</button>
            </li>
          `;
          // clear the input value
          this.value = '';
          todoList.innerHTML += todoItem;
          saveTodoList();
        }
      }
    });

    saveButton.addEventListener('click', function(event) {
      saveTodoList();
    });

    clearButton.addEventListener('click', function(event) {
      localStorage.setItem('Todo List', '');
      todoList.innerHTML = '';
    });

    LoadTodos();

/*
____________________________________________________________
____________________________________________________
The task in another way, as I understood (fetch API link)
____________________________________________________
____________________________________________________________
*/ 

// select parent element
const parent = document.querySelector('.item');
var con =0;
function featchTodos(){
fetch('https://dummyjson.com/todos')
.then(res => res.json())
.then(data => {

for (let i = 0; i < data.todos.length; i++) {

parent.innerHTML +=` 
<div class='col-sm-6 col-md-4 col-lg-3 mt-4'>
 <div class="card" ">
<div class="card-body text-center">
 <h5 class="card-title">user id:  ${data.todos[con].userId}  </h5>
 <p class="card-text">title: ${data.todos[con].todo}</p>
 <span> completed: ${data.todos[con].completed}</span>
 <a href="#" class="btn btn-primary d-block mt-3">more</a>
</div>
</div>   
  </div>     

` 
con = con+1
}
})

}
featchTodos();

// END