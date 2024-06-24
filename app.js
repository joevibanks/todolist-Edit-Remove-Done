
const newValue = document.querySelector('#new_task');
let inputValue = document.querySelector('#write_task input');
let input = document.querySelector('input');


function generateUniqueId() {
  // Generate a random number and concatenate it with a timestamp
  const randomNumber = Math.floor(Math.random() * 1000000);
  const timestamp = new Date().getTime();
  const uniqueId = `${randomNumber}-${timestamp}`;
  return uniqueId;
}

//Create an array 
let dataBase = [];

document.querySelector('#click').onclick = () => {

  if (!document.querySelector('#write_task input').value) {
    alert("Please add a todo")
  }
  else {
    //Create objects
    let newTodo = {
      myId: generateUniqueId(),
      inputField: `${document.querySelector('#write_task input').value}`,
      done: false
    }

    //Push objects to array 
    dataBase.push(newTodo);
    //Save to local storage
    localStorage.setItem('dataBase', JSON.stringify(dataBase));
    //Clear input field
    document.querySelector('#write_task input').value = "";

    updateDOM()

  }
}


//Create a functione to update dom 
const updateDOM = () => {

  //Refresh function for new input values
  newValue.innerHTML = ``;

  //Use the for each array method to loop through the arrays
  dataBase.forEach(item => {

  
    // Create the list item
    const listedItem = document.createElement('li');
    listedItem.setAttribute('class', 'list-group-item');

    //Create edit card
    const editCard = document.createElement('div');
    editCard.setAttribute('id', `editCard${item.id}`);
    //Create input
    const inputEditElement = document.createElement('input');
    inputEditElement.setAttribute('class', 'edit_input')
    inputEditElement.setAttribute('type', 'text');
    inputEditElement.setAttribute('value', `${item.inputField}`);

    // Create save button
    const buttonSave = document.createElement('button');
    buttonSave.setAttribute('id', `saveButton${item.myId}`);
    buttonSave.setAttribute('class', 'save_button')
    buttonSave.textContent = 'Save';

    // Create the task content
    const contentCard = document.createElement('span');
    contentCard.textContent = item.inputField;
    contentCard.setAttribute('id', `task${item.myId}`);
    contentCard.setAttribute('class', 'span_card')

    // Create the button group
    const buttonGroup = document.createElement('div');
    buttonGroup.setAttribute('class', 'btn-group');
    buttonGroup.setAttribute('role', 'group');
    buttonGroup.setAttribute('aria-label', 'Basic example');

    // Create edit icon
    const editIcon = document.createElement('i');
    editIcon.className = `fa fa-pen-to-square`;
    editIcon.setAttribute('onclick', `currentTask(${item.myId})`);


    // Create the "Done" button
    const buttonDone = document.createElement('button');
    buttonDone.setAttribute('id', `doneButton${item.myId}`);
    buttonDone.setAttribute('class', 'done_button')
    buttonDone.textContent = 'Done';

    // Create the "Remove" button
    const buttonRemove = document.createElement('button');
    buttonRemove.setAttribute('id', `removeButton${item.myId}`);
    buttonRemove.setAttribute('class', 'remove_button')
    buttonRemove.textContent = 'Remove';

    // Append elements to the DOM

    listedItem.appendChild(editIcon);
    buttonGroup.appendChild(buttonDone);
    buttonGroup.appendChild(buttonRemove);
    listedItem.appendChild(contentCard);

    editCard.appendChild(buttonSave);
    editCard.appendChild(inputEditElement);

    listedItem.appendChild(editCard);

    listedItem.appendChild(buttonGroup);

    newValue.appendChild(listedItem);
    editCard.style.visibility = 'hidden';
    editCard.style.position = 'absolute';
    // Create conditionals to update dom changes when when dom button has been clicked
    if (item.done) {
      // editCard.style.position = 'static';
      contentCard.style.textDecorationLine = 'line-through';
      buttonDone.style.visibility = 'hidden';

      inputField = '';
    }

    // Creation on click function for remove button
    buttonRemove.onclick = () => {
      deleteTask(item.myId)
    }

    // Create function for when done funtion has been clieked
    buttonDone.onclick = () => {
      completeTask(item)
    }

    //Create a function for when edit button has been clicked

    editIcon.onclick = () => {
      const editTask = () => {
        //find the particular edit icon that was clicked
        const currentEdit = dataBase.findIndex((newTodo => newTodo.myId === item.myId))

        if (dataBase[currentEdit]) {
          const editingTask = () => {
            //Change dom when edit icon has been clicked
            editCard.style.visibility = 'visible';
            buttonGroup.style.visibility = 'hidden';
            contentCard.style.visibility = 'hidden';
            editIcon.style.visibility = 'hidden';
            contentCard.style.position = "absolute";

            //Create a function when save button is clicked.
            buttonSave.onclick = () => {
              //Create a callback back bitton when save button has been clicked with array of objects as the parameters and input value from the edited input.
              saveEdit(item, inputEditElement.value)
            }
          }
          editingTask();
        }
      }
      editTask()
    }


  });
}


const storedData = localStorage.getItem('dataBase');
if (storedData) {
  dataBase = JSON.parse(storedData);
  updateDOM();
}

const deleteTask = (userId) => {
  //Filter task object to be deleted
  dataBase = dataBase.filter(newTodo => newTodo.myId !== userId);
  //Save to local storage
  localStorage.setItem('dataBase', JSON.stringify(dataBase));

  //Update the dom
  updateDOM()
}


const completeTask = (userData) => {
  //Find task object to be completed
  const doneTask = dataBase.findIndex((newTodo => newTodo.myId === userData.myId));
  dataBase[doneTask].done = true;
  //Save to local storage
  localStorage.setItem('dataBase', JSON.stringify(dataBase));
  //Update the dom
  updateDOM();
}

const saveEdit = (userData, updatedTask) => {
  //find current save task button
  const saveTask = dataBase.findIndex((newTodo => newTodo.myId === userData.myId));
  //Update the value of value to edited task
  dataBase[saveTask].inputField = updatedTask;
  // Save to local storage 
  localStorage.setItem('dataBase', JSON.stringify(dataBase));
  // Update dom
  updateDOM();
}

