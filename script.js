

document.addEventListener('DOMContentLoaded',function() {
    let taskJson = localStorage.getItem("myTasks");

    if(taskJson){
         let myTasks = JSON.parse(taskJson);

         for (const item of myTasks) {
            DrawTask(item);
         }
    }
})




let tasks = [];

document.forms.myForm.addEventListener('submit', function() {
    event.preventDefault();

    let str = document.forms.myForm.taskName.value;
  
    let toDo = {
        id :Date.now(),
        title:str
    }

    DrawTask(toDo);

    localStorage.setItem('myTasks',JSON.stringify(tasks));
  
    document.forms.myForm.reset();
})


function DrawTask(toDo) {
    let item = document.createElement('li');
    item.className = 'list-group-item';
    item.innerHTML = '<span class="m-1">❌</span><i class="m-2">✔</i>' + toDo.title;
    item.dataset.id = toDo.id;

    document.querySelector('#myList').appendChild(item);
    tasks.push(toDo)

}



document.querySelector('#clear').addEventListener('click', function() {
    document.querySelector('#myList').innerHTML = "";
    localStorage.removeItem('myTasks'); // Удаление из localStorage всех элементов
})

document.querySelector('#myList').addEventListener('click', function() {
    console.log(event.target.tagName);

    if (event.target.tagName == 'SPAN') { // Удаление из localStorage элемента по id
        
        event.target.parentElement.remove();
       
        for (let i = 0; i < tasks.length; i++) {
            if (event.target.parentElement.dataset.id == tasks[i].id)
            {                
                tasks.splice(i,1);
            }            
        }     
        
        localStorage.removeItem('myTasks');        
        localStorage.setItem('myTasks',JSON.stringify(tasks));      

    } else if (event.target.tagName == 'I') {

        if (event.target.parentElement.classList.contains('done')) {                  
           event.target.parentElement.classList.remove('done');                       
        } else {
            event.target.parentElement.classList.add('done');            
        }
    }

})