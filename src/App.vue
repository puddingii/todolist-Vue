<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput @addTodo="addTodo"></TodoInput>
    <TodoList
      @removeTodo="removeTodo"
      @updateTodo="updateTodo"
      @updateToggle="updateToggle"
      v-bind:propsdata="todoItems"
    ></TodoList>
    <TodoFooter @removeAll="clearAll"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";
export default {
  data() {
    return {
      todoItems: [],
    };
  },
  created() {
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        console.log(localStorage.key(i));
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    }
  },
  methods: {
    addTodo(todoItem) {
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
      this.todoItems.push(todoItem);
    },
    removeTodo(todoItem, index) {
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);
    },
    updateTodo(updateItem, index) {
      const beforeItem = this.todoItems[index];
      this.removeTodo(beforeItem, index);
      this.addTodo(updateItem);
    },
    updateToggle(updateItem, index) {
      this.todoItems[index].completed = !this.todoItems[index].completed;
      localStorage.removeItem(updateItem.item);
      localStorage.setItem(updateItem.item, JSON.stringify(this.todoItems[index]));
    },
    clearAll() {
      localStorage.clear();
      this.todoItems = [];
    },
  },
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter,
  },
};
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f8;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
