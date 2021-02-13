let toDoArr = [];
let foodArr = [];
const memoBtn = document.querySelector(".openMemo");
const memoform = document.querySelector(".memoForm");
const alarmBtn = document.querySelector(".openAlarm");
const memoAlarm = document.querySelector(".alarmForm");
const specifictime = document.querySelector(".specificTime");
const h = document.querySelector(".h");
const m = document.querySelector(".m");

function maxLengthCheck(object){
    if (object.value.length > object.maxLength){
        object.value = object.value.slice(0, object.maxLength);
    }
}
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

  submitName.addEventListener("click", function(event){
    event.preventDefault();
      if(name.value === "") {
        alert("이름을 입력해!");
      } else{
        localStorage.setItem("name", name.value);
        name.style.display = "none";
        submitName.style.display = "none";
        loadName.innerHTML = `안녕 ${localStorage.getItem("name")}`;
      }
    });

  if(localStorage.getItem("name") !== null){

    name.style.display = "none";
    submitName.style.display = "none";
    loadName.innerHTML = `안녕 ${localStorage.getItem("name")}`;
  }
}
function toDo(){
  const submittodo = document.querySelector(".submitToDo"),
        todo = document.querySelector(".toDo"),
        ul = document.querySelector("ul");

  function paintToDo(text){
    const li = document.createElement("li"),
          span = document.createElement("span"),
          delBtn = document.createElement("button");

    delBtn.addEventListener("click", function(){
      ul.removeChild(event.target.parentNode);
      toDoArr = toDoArr.filter(function(toDo){
        return toDo.id !== parseInt(event.target.parentNode.id);
      });

      localStorage.setItem("todo", JSON.stringify(toDoArr));
    });

    const obj = {
      text : text,
      id : toDoArr.length + 1
    }

    li.id = toDoArr.length + 1;

    delBtn.innerHTML = "✌끝냈어";
    if(text === "영화") span.innerHTML = "🎥";
    else span.innerHTML = text;
    todo.value = "";
    li.appendChild(delBtn);
    li.appendChild(span);
    ul.appendChild(li);
    toDoArr.push(obj);
    localStorage.setItem("todo", JSON.stringify(toDoArr));
  }

  if(localStorage.getItem("todo") !== null){
    const parsed = JSON.parse(localStorage.getItem("todo"));
    parsed.forEach(function(obj){
      paintToDo(obj.text);
    });
  }

  submittodo.addEventListener("click", function(event){
    event.preventDefault();
    paintToDo(todo.value);
    if(toDoArr.length == 3) alert("할 일이 많구나?😂");
  });
}
function Food(){
  const submitfood = document.querySelector(".submitFood"),
        food = document.querySelector(".food"),
        foodUl = document.querySelector(".foodUl");

  function paintFood(text){
    const li = document.createElement("li"),
          span = document.createElement("span"),
          delBtn = document.createElement("button");

    delBtn.addEventListener("click", function(){
      foodUl.removeChild(event.target.parentNode);
      foodArr = foodArr.filter(function(food){
        return food.id !== parseInt(event.target.parentNode.id);
      });

      localStorage.setItem("food", JSON.stringify(foodArr));
    });

    const obj = {
      text : text,
      id : foodArr.length + 1
    }

    li.id = foodArr.length + 1;

    delBtn.innerHTML = "🤢배불러";
    if(text === "피자"){
      span.innerHTML = "🍕";
    } else if(text === "햄버거"){
      span.innerHTML = "🍔";
    } else if(text === "핫도그"){
      span.innerHTML = "🌭";
    } else if(text === "고기"){
      span.innerHTML = "🍖";
    }
    else span.innerHTML = text;
    food.value = "";
    li.appendChild(delBtn);
    li.appendChild(span);
    foodUl.appendChild(li);
    foodArr.push(obj);
    localStorage.setItem("food", JSON.stringify(foodArr));
  }

  if(localStorage.getItem("food") !== null){
    const parsed = JSON.parse(localStorage.getItem("food"));
    parsed.forEach(function(obj){
      paintFood(obj.text);
    });
  }

  submitfood.addEventListener("click", function(event){
    event.preventDefault();
    paintFood(food.value);
    if(foodArr.length == 3) alert("🐷돼지야🐷");
  });
}

function init(){
  getTime();
  setInterval(getTime, 1000);
  greeting();
  toDo();
  Food();
  memoBtn.addEventListener("click", function(){
    if(memoAlarm.style.display === "block") {
      memoAlarm.style.display = "none";
      alarmBtn.value = "⏰알람 설정 열기⏰";
    }
    if(memoform.style.display === "none") {
      memoform.style.display = "block";
      memoBtn.value = "📝메모장 닫기📝";
    }else {
      memoform.style.display = "none"
      memoBtn.value = "📝메모장 열기📝";
    }
  });
  alarmBtn.addEventListener("click", function(){
    if(memoform.style.display === "block") {
      memoform.style.display = "none";
      memoBtn.value = "📝메모장 열기📝";
    }
    if(memoAlarm.style.display === "none") {
      memoAlarm.style.display = "block";
      alarmBtn.value = "⏰알람 설정 닫기⏰";
    }else {
      memoAlarm.style.display = "none"
      alarmBtn.value = "⏰알람 설정 열기⏰";
    }
    h.focus();
  });
  specifictime.addEventListener("click", function(){
    if(h.value != 0 && m.value != 0) alert("알람이 설정됐어!!");
    else alert("정확한 시간을 입력해줘!!");
  });
}

init();
