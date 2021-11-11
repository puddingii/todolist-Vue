<template>
  <section>
    <transition-group name="list" tag="ul">
      <li v-for="(todoItem, index) in this.storedTodoItems" :key="todoItem.item" class="shadow">
        <i class="checkBtn fas fa-check" :class="{checkBtnCompleted: todoItem.completed}" @click="toggleComplete({todoItem, index})"></i>
        <span :class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
        <div class="actionBtn">
          <span
            class="updateBtn"
            type="button"
            @click="showUpdateModal(todoItem, index)"
          >
            <i class="far fa-edit" aria-hidden="true"></i>
          </span>
          <span
            class="removeBtn"
            type="button"
            @click="removeTodo({todoItem, index})"
          >
            <i class="far fa-trash-alt" aria-hidden="true"></i>
          </span>
        </div>
      </li>
    </transition-group>
    <modal v-if="showModal" @close="showModal = false">
      <template v-slot:header>
        <h3>변경</h3>
      </template>
      <template v-slot:body>
        <input
          v-model="updatedData.item"
          placeholder="수정할 텍스트를 입력하세요."
        />
      </template>
      <template v-slot:footer>
        <span @click="showModal = false">
          <span @click="updateTodo(updatedData)">
            제출
            <i class="checkBtn fas fa-check" aria-hidden="true"></i>
          </span>
          닫기
          <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
        </span>
      </template>
    </modal>
  </section>
</template>

<script>
import Modal from "./common/Modal.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      updatedData: {},
      showModal: false,
    };
  },
  methods: {
    ...mapMutations({ 
      removeTodo: "removeTodo",
      toggleComplete: "updateToggle" 
    }),
    showUpdateModal(todoItem, index) {
      this.updatedData = { item: todoItem.item, completed: todoItem.completed, index };
      this.showModal = !this.showModal;
    },
    updateTodo(todoItem) {
      const beforeItem = this.$store.state.todoItems[todoItem.index];
      this.$store.commit("removeTodo", { todoItem: beforeItem, index: todoItem.index });
      this.$store.commit("addTodo", todoItem);
    }
  },
  computed: {
    ...mapGetters(['storedTodoItems'])
  },
  components: {
    Modal,
  },
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 00;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.actionBtn {
  margin-left: auto;
}
.updateBtn {
  color: #62acde;
}
.removeBtn {
  color: #de4343;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
</style>