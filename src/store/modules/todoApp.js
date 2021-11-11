const storage = {
    fetch() {
        const arr = [];
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
                    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
            }
        }
        return arr;
    }
}

const state = {
    todoItems: storage.fetch(),
    headerText: 'TODO it!'
};

const getters = {
    storedTodoItems(state) {
        return state.todoItems;
    }
};

const mutations = {
    addTodo(state, todoInfo) {
        const obj = { completed: todoInfo.completed, item: todoInfo.item };
        localStorage.setItem(obj.item, JSON.stringify(obj));
        state.todoItems.push(obj);
    },
    removeTodo(state, itemInfo) {
        const { todoItem, index } = itemInfo;
        localStorage.removeItem(todoItem.item);
        state.todoItems.splice(index, 1);
    },
    updateToggle(state, itemInfo) {
        const { todoItem, index } = itemInfo;
        state.todoItems[index].completed = !state.todoItems[index].completed;
        localStorage.removeItem(todoItem.item);
        localStorage.setItem(todoItem.item, JSON.stringify(state.todoItems[index]));
    },
    clearAll(state) {
        localStorage.clear();
        state.todoItems = [];
    }
};

export default {
    state,
    getters,
    mutations
};