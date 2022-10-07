<template>
  <div class="home">
    <div class="wrapper">
      <div class="header">
        <header class="header__container">
          <div class="header__title">
            <font-awesome-icon icon="fa-solid fa-book-bookmark" />
            <span class="title">Закладки</span>
          </div>
          <button @click="toggleControlModal()" class="btn">
            Новая закладка
          </button>
        </header>
      </div>
      <div class="content">
        <div v-if="bookmarkAmount === 0" class="empty_bookmarks_list">
          Пока что тут пусто, добавьте первую закладку!
        </div>
        <BookmarkItem
          v-for="book in bookmarks" :key="book.id"
          :id="book.id" :title="book.title" :url="book.url"
        />
      </div>
      <Transition name="modal">
        <BookmarkControlModal
          v-if="isControlModalOpen"
        />
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import BookmarkItem from '@/components/BookmarkItem.vue';
import BookmarkControlModal from '@/components/BookmarkControlModal.vue';

const store = useStore();
const router = useRouter();

const bookmarks = computed(() => store.getters['bookmark/getAllBookmarks']);
const bookmarkAmount = computed(() => store.getters['bookmark/getBookmarksAmount']);

const isControlModalOpen = computed(() => store.getters['controlModal/getControlModalStatus']);

function toggleControlModal() {
  router.push('/control');
  store.dispatch('bookmark/editBookmark', '');
  store.dispatch('controlModal/toggleControlModal');
}
</script>

<style lang="scss">
@import '@/assets/variables.scss';

.modal-enter-active {
  animation: fade ease-in-out 0.1s;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.wrapper {
  width: 100%;
  height: 100vh;
  background-color: $background-color;

  .header {
    background-color: $background-light-color;
    border-bottom: 1px solid $border-color;
    color: $text-color;

    .header__container {
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;

      .header__title {
        font-size: 18px;
        font-weight: 600;

        .title {
          margin: 0 0 0 10px;
        }
      }
    }
  }

  .content {
    background-color: $background-light-color;
    width: 80%;
    margin: 20px auto;
    padding: 10px 0px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    .empty_bookmarks_list {
      padding: 10vh 0;
      color: $text-color;
    }
  }
}
.btn {
  border: 1px solid $primary-color;
  background-color: inherit;
  padding: 8px 12px;
  text-decoration: none;
  color: $text-color;
  font-size: 16px;
  font-weight: 400;
  border-radius: 4px;
  transition: ease-in-out 0.1s;

  &:hover {
    background-color: $primary-hover-color;
    cursor: pointer;
  }
}
</style>
