<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref<InstanceType<typeof HTMLFormElement> | null>(null)

function onClick() {
  if (!formRef.value) {
    return
  }
  const formData = new FormData(formRef.value)
  const data = {}
  for (const [key, value] of formData.entries()) {
    data[key] = value
  }

  fetch('http://localhost:3000/createCandle', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
</script>

<template>
  <form ref="formRef" action="" method="post">
    <label>
      Имя
      <input type="text" name="name">
    </label>
    <label>
      Количество
      <input type="text" name="count">
    </label>
    <label>
      Цена
      <input type="text" name="price">
    </label>
    <!-- <input type="text"> -->
    <!-- <input type="text"> -->
    <button formaction="http://localhost:3000/createCandle" type="button" @click="onClick">
      Отправить
    </button>
  </form>
</template>

<style scoped>
label {
cursor: pointer;
}

input{
border: 1px solid red;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
