<template>
  <section>
    <transition-group name="list" tag="ul">
      <li v-for="(todoItem, index) in propsdata" :key="todoItem.item" class="shadow">
        <i class="checkBtn fas fa-check" :class="{checkBtnCompleted: todoItem.completed}" @click="toggleComplete(todoItem, index)"></i>
        <span :class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
        <div class="actionBtn">
          <span
            class="updateBtn"
            type="button"
            @click="showUpdateModal(todoItem.item, index)"
          >
            <i class="far fa-edit" aria-hidden="true"></i>
          </span>
          <span
            class="removeBtn"
            type="button"
            @click="removeTodo(todoItem, index)"
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
          v-model="updatedData.todoInfo.item"
          placeholder="수정할 텍스트를 입력하세요."
        />
      </template>
      <template v-slot:footer>
        <span @click="showModal = false">
          <span @click="updateTodo(updatedData.todoInfo.item, updatedData.todoInfo.index)">
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
export default {
  data() {
    return {
      updatedData: {},
      showModal: false,
    };
  },
  props: ["propsdata"],
  methods: {
    removeTodo(todoItem, index) {
      this.$emit("removeTodo", todoItem, index);
    },
    showUpdateModal(todoInfo, index) {
      this.updatedData = { todoInfo, index };
      this.showModal = !this.showModal;
    },
    updateTodo(todoItem, index) {
      this.$emit("updateTodo", todoItem, index);
    },
    toggleComplete(todoItem, index) {
      this.$emit("updateToggle", todoItem, index);
    }
  },
  components: {
    Modal,
  },
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s;
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