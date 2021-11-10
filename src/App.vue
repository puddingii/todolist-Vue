<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput></TodoInput>
    <TodoList
      @updateToggle="updateToggle"
    ></TodoList>
    <TodoFooter @removeAll="clearAll"></TodoFooter>
  </div>
</template>

<script>
// Container Component(상위 컴포넌트) 현재 작성한건 중앙 관리식 데이터 조작
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
  methods: {
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
