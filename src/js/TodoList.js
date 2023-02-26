class TodoList {
  constructor(taskList, taskArray =[]) {
    this.taskList = taskList;
    this.taskArray = taskArray;
  }

  clearCode() {
    const listItems = document.querySelectorAll(".task-list-item");
    listItems.forEach((i) => i.remove());
  }

  returnTaskList() {
    return this.taskArray;
  }

  creatTask(task) {
    this.taskArray.push(task);
  }

  createTaskList() {
    this.clearCode();
    this.taskArray.forEach((i, index) => {
      const li = document.createElement("li");
      li.classList.add("task-list-item");
      li.innerHTML = `<span>${i}</span> <button class='remove-task' id=${index}></button>`;
      this.taskList.append(li);
    });
    this.setToDoListToLocalStorage();
  }
  removeTask(ind) {
    this.taskArray = this.taskArray.filter((i, index) => index != ind);
    this.createTaskList();
    this.setToDoListToLocalStorage();
  }
  setToDoListToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(this.taskArray));
  }
  getToDoListFromLocalStorage() {
    return localStorage.getItem('todo');
  }
}

export default TodoList;
