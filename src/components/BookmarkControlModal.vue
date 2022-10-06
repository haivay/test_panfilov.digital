<template>
  <div class="modal">
    <div class="modal__container">
      <div class="modal__header">
        <span
          @click="toggleControlModal()"
          @keypress="toggleControlModal()"
          class="btn_gost modal__close_btn"
        >
          &#10006;
        </span>
      </div>
      <div class="modal__content">
        <form class="modal__form">
          <label
            v-for="(field, index) in form" :key="index"
            class="modal__label"
            :for="index"
          >
            <span>{{ field.label }}</span>
            <input
              @keypress.enter="saveBookmark()"
              :id="index" type="text"
              v-model.trim="field.value"
              class="modal__input"
              :class="(field.isDirty && field.error) ? 'input-error' : ''"
            >
          </label>
        </form>
        <div class="modal__footer">
          <button @click="toggleControlModal()" class="btn">
            Отмена
          </button>
          <button @click="saveBookmark()" class="btn">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  computed,
  watch,
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const editBookmark = computed(() => store.getters['bookmark/getEditBookmark']);

const form = reactive({
  title: {
    label: 'Название',
    value: editBookmark.value?.title,
    isDirty: false,
    error: false,
  },
  url: {
    label: 'URL',
    value: editBookmark.value?.url,
    isDirty: false,
    error: false,
  },
});

const anyDirty = ref(false);
const anyError = ref(false);

function validateForm() {
  anyDirty.value = true;
  anyError.value = false;
  const formKeys = Object.keys(form);

  formKeys.forEach((key) => {
    form[key].isDirty = true;
    form[key].error = false;

    if (!form[key].value) {
      form[key].error = true;
      anyError.value = true;
    }
  });
  return !anyError.value;
}

watch(() => [form.title.value, form.url.value], () => {
  if (anyDirty.value) {
    validateForm();
  }
});

function toggleControlModal() {
  router.push('/');
  store.dispatch('controlModal/toggleControlModal');
}

function saveBookmark() {
  if (validateForm()) {
    const bookmark = {
      id: editBookmark.value?.id,
      title: form.title.value,
      url: form.url.value,
    };
    store.dispatch('bookmark/saveBookmark', bookmark);
    toggleControlModal();
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.modal {
  position: fixed;
  background-color: #00000080;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: ease-in-out 0.2s;

  .modal__container {
    z-index: 1;
    width: 30%;
    margin: 15% auto;
    padding: 6px 6px 10px 6px;
    background-color: $background-light-color;
    border-radius: 10px;

    .modal__header {
      display: flex;
      justify-content: flex-end;
      margin: 0 0 24px 0;

      .modal__close_btn {
        color: $text-color;
        transition: ease-in-out 0.1s;
        user-select: none;
        border-radius: 20px;
        padding: 2px 6px 3px 6px;

        &:hover {
          background-color: $primary-hover-color;
          cursor: pointer;
        }
      }
    }

    .modal__content {
      width: 80%;
      height: 60%;
      margin: 0 auto;

      .modal__form {
        display: flex;
        flex-direction: column;

        .modal__label {
          display: flex;
          flex-direction: column;
          margin: 0 0 24px 0;

          span {
            font-size: 14px;
            color: $text-color;
            user-select: none;
          }

          .modal__input {
            background-color: inherit;
            height: 24px;
            border: none;
            border-bottom: 1px solid $input-border-color;
            color: $text-color;

            &:focus {
              outline: none;
              border-bottom: 1px solid $input-border-focus-color;
            }
          }
        }
      }

      .modal__footer {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin: 24px 0 0 0;

        .btn {
          margin: 0 0 0 8px;
          font-size: 14px;
        }
      }
    }
  }
}
.input-error {
  border-color: $error-color !important;
}
</style>
