<template>
  <li class="list-group-item">
    <span
      >{{ item.date }} - {{ item.amount }} - {{ item.source }} -
      {{ item.memo }}</span
    >
    <span
      class="float-end badge bg-secondary pointer m-1"
      @click="editItem(item)"
    >
      편집
    </span>
    <span
      class="float-end badge bg-secondary pointer m-1"
      @click="deleteItem(item.id)"
    >
      삭제
    </span>
  </li>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { inject } from 'vue';

const props = defineProps({
  item: { type: Object, required: true },
  type: { type: String, required: true },
});

console.log('TodoItem props:', props);

const router = useRouter();
const {
  deleteIncome,
  deleteExpenditure,
  fetchIncomeList,
  fetchExpenditureList,
} = inject('actions');

const deleteItem = async (id) => {
  console.log(`Deleting item with id: ${id}`); // 로그 추가
  try {
    if (props.type === 'income') {
      await deleteIncome(id);
      await fetchIncomeList();
    } else if (props.type === 'expenditure') {
      await deleteExpenditure(id);
      await fetchExpenditureList();
    }
    console.log(`Deleted item with id: ${id}`); // 로그 추가
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

const editItem = (item) => {
  console.log(`Editing item with id: ${item.id}`); // 로그 추가
  if (props.type === 'income') {
    router.push(`/income/${item.id}`);
  } else if (props.type === 'expenditure') {
    router.push(`/expenditure/${item.id}`);
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
