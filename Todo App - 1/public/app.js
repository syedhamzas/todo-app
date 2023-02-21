const firebaseConfig = {
 
};

var app = firebase.initializeApp(firebaseConfig);



function delTask(thisValue) {
  firebase.database().ref('/todoList').child(thisValue.id).remove();
  thisValue.parentNode.remove();
}

function editTask(thisValue) {
  document.getElementById("txt").focus();
  var val = thisValue.parentNode.childNodes[0].textContent;
  document.getElementById("txt").value = val;
}

function updateTask(thisValue) {
  var res = document.getElementById("txt").value;
  
  // document.getElementById("txt").value = "";

  // var val = thisValue.parentNode.childNodes[0].textContent;
  // document.getElementById("txt").value = val;
  var editTodo = {
    value: res,
    key: thisValue.id,
  };
  firebase.database().ref('todoList').child(thisValue.id).set(editTodo);
  thisValue.parentNode.childNodes[0].textContent = res;
  document.getElementById("txt").value = "";
  console.log(thisValue.key)
}



function addTask() {
  var todo_item = document.getElementById('txt');
  var database = firebase.database().ref('todoList');
  var key = database.push().key;
  var todo = {
    value: todo_item.value,
    key: key
  };
  database.child(key).set(todo);
}


firebase.database().ref('/todoList').on('child_added',function(data){

  var getTxt = document.getElementById("txt").value;
  var txtNd = document.createTextNode(data.val().value);

  var liEle = document.createElement("li");
  var editEle = document.createElement("button");
  var delEle = document.createElement("button");
  var updateEle = document.createElement("button");

  editEle.setAttribute('class','btn');
  delEle.setAttribute('class','btn');
  updateEle.setAttribute('class','btn');

  updateEle.setAttribute('id',data.val().key);
  delEle.setAttribute('id',data.val().key);

  editEle.setAttribute("onclick", "editTask(this)");
  delEle.setAttribute("onclick", "delTask(this)");
  updateEle.setAttribute("onclick", "updateTask(this)");

  editEle.innerHTML = "Edit";
  delEle.innerHTML = "Delete";
  updateEle.innerHTML = "Update";

  liEle.appendChild(txtNd);
  liEle.appendChild(editEle);
  liEle.appendChild(delEle);
  liEle.appendChild(updateEle);

  var olEle = document.getElementById("setList");
  olEle.appendChild(liEle);

  document.getElementById("txt").value = "";

})