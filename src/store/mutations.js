const addTodo = (state, todoInfo) => {
    const obj = { completed: todoInfo.completed, item: todoInfo.item };
    localStorage.setItem(obj.item, JSON.stringify(obj));
    state.todoItems.push(obj);
};
const removeTodo = (state, itemInfo) => {
    const { todoItem, index } = itemInfo;
    localStorage.removeItem(todoItem.item);
    state.todoItems.splice(index, 1);
};
const updateToggle = (state, itemInfo) => {
    const { todoItem, index } = itemInfo;
    state.todoItems[index].completed = !state.todoItems[index].completed;
    localStorage.removeItem(todoItem.item);
    localStorage.setItem(todoItem.item, JSON.stringify(state.todoItems[index]));
};
const clearAll = (state) => {
    localStorage.clear();
    state.todoItems = [];
};

export { addTodo, removeTodo, updateToggle, clearAll };