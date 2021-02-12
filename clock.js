function getTime(){
  const container = document.querySelector(".js-clock"),
        clockTitle = document.querySelector("h1");

  const date = new Date();
  const h = date.getHours();
  const m = date.getMinutes();
  let s = date.getSeconds();
  clockTitle.innerHTML = s < 10 ? `${h}:${m}:0${s}` : `${h}:${m}:${s}`;
}
function greeting() {
  const name = document.querySelector(".name"),
    submitName = document.querySelector(".submitName"),
    loadName = document.querySelector("#load");

  submitName.addEventListener("submit", function(event){
    event.preventDefault();
      if(name.value === "") {
        alert("이름을 입력해!");
      } else{
        localStorage.setItem("name", name.value);
        name.style.display = "none";
        submitName.style.display = "none";
        loadName.innerHTML = `Hello ${localStorage.getItem("name")}`;
      }
    });

  if(localStorage.getItem("name") !== null){

    name.style.display = "none";
    submitName.style.display = "none";
    loadName.innerHTML = `안녕 ${localStorage.getItem("name")}`;
  }
}
function toDo(){
  let arr = [];
  const submittodo = document.querySelector(".submitToDo"),
        todo = document.querySelector(".toDo"),
        ul = document.querySelector("ul");

  function paintToDo(text){
    const li = document.createElement("li"),
          span = document.createElement("span"),
          delBtn = document.createElement("button");

    const obj = {
      text : text,
      id : arr.length + 1
    }
    arr.push(obj);

    delBtn.addEventListener("click", function(){
      ul.removeChild(this.parentNode);
      arr = arr.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
      });

      localStorage.setItem("todo", JSON.stringify(arr));
    });

    delBtn.innerHTML = "🙅‍♂️";
    span.innerHTML = text;
    todo.value = "";
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = arr.length + 1;
    ul.appendChild(li);
    localStorage.setItem("todo", JSON.stringify(arr));
  }

  if(localStorage.getItem("todo") !== null){
    const parsed = JSON.parse(localStorage.getItem("todo"));
    parsed.forEach(function(obj){
      paintToDo(obj.text);
    });
  }

  submittodo.addEventListener("submit", function(event){
    event.preventDefault();
    paintToDo(todo.value);
  });
}

function init(){
  getTime();
  setInterval(getTime, 1000);
  greeting();
  toDo();
}

init();
