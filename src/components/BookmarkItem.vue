<template>
  <button class="bookmark" @click="openBookmark()" ref="bookmarkButton">
    <div class="bookmark__text">
      <div class="text__title">
        {{ props.title }}
      </div>
      <div class="text__url" v-if="!checkBookmarkId">
        {{ props.url }}
      </div>
    </div>
    <div
      class="menu"
      ref="menu"
      v-if="checkMenuOpenedId"
    >
      <ul class="list">
        <li class="list__item">
          <button class="btn_gost btn" @click.stop="editBookmark()">
            Изменить
          </button>
        </li>
        <li class="list__item">
          <button class="btn_gost btn" @click.stop="copyUrlBookmark()">
            Копировать URL
          </button>
        </li>
        <li class="list__item">
          <button class="btn_gost btn" @click.stop="deleteBookmark()">
            Удалить
          </button>
        </li>
      </ul>
    </div>
    <Transition name="toast">
      <CopyToast v-if="checkBookmarkId"/>
    </Transition>
    <button class="btn_gost btn" tabindex="-1" @click.stop="openMenu()">
      <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
    </button>
  </button>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { onClickOutside } from '@vueuse/core';
import CopyToast from '@/components/CopyToast.vue';

const store = useStore();
const props = defineProps({
  id: String,
  title: String,
  url: String,
});

const checkMenuOpenedId = computed(() => store.getters['menu/getOpenedMenuId'] === props.id);

function openBookmark() {
  const url = props.url.includes('http') ? props.url : `http://${props.url}`;
  window.open(url, '_blank');
}

const bookmarkButton = ref(null);
function openMenu() {
  store.dispatch('menu/openMenu', props.id);
  bookmarkButton.value.focus();
}

function closeMenu() {
  store.dispatch('menu/closeMenu');
}

const menu = ref(null);
onClickOutside(menu, closeMenu);

function editBookmark() {
  const bookmark = {
    id: props.id,
    title: props.title,
    url: props.url,
  };

  store.dispatch('bookmark/editBookmark', bookmark);
  store.dispatch('controlModal/toggleControlModal');
  closeMenu();
}

function copyUrlBookmark() {
  const { id, url } = props;
  store.dispatch('bookmark/copyUrlBookmark', { id, url });
  closeMenu();
}

const checkBookmarkId = computed(() => store.getters['bookmark/getCopiedBookmarkId'] === props.id);

function deleteBookmark() {
  store.dispatch('bookmark/deleteBookmark', props.id);
}
</script>

<style scoped lang="scss">
@import '@/assets/variables.scss';

@keyframes menu_fade {
  from {
    opacity: 0.4;
    top: -18px;
  }
  to {
    opacity: 1;
    top: -10px;
  }
}

@keyframes fade-in-left {
  from {
    left: 40px;
    opacity: 0;
  }
  to {
    left: -10px;
    opacity: 0.6;
  }
}

.toast-enter-active {
  animation: fade-in-left 0.2s ease-in-out;
}
.toast-leave-active {
  animation: fade-in-left reverse 0.2s ease-in-out;
}

.bookmark {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0;
  background-color: inherit;
  color: $text-color;
  padding: 2px 20px;
  font-size: 14px;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;

  &:focus {
    background-color: $background-focus-color;
  }

  .bookmark__text {
    width: 97%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .text__url {
      opacity: 0;
      transition: ease-in-out 0.1s;
    }
  }

  &:hover {
    cursor: pointer;

    .text__url {
      opacity: 1;
    }
  }

  .menu {
    position: relative;
    display: flex;
    flex-direction: column;
    z-index: 2;

    .list {
      position: absolute;
      top: -10px;
      right: -5px;
      list-style: none;
      margin: 0;
      padding: 0;
      background-color: $background-color;
      border-radius: 8px;
      animation-name: menu_fade;
      animation-duration: 0.05s;
      animation-timing-function: ease-in-out;

      .list__item {
        &:first-child {
          .btn {
            border-radius: 0;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
          }
        }
        &:last-child {
          .btn {
            border-radius: 0;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
          }
        }

        .btn {
          border-radius: 0;
          width: 100%;
          font-size: 14px;
          white-space: nowrap;
        }
      }
    }
  }

  .btn_gost {
    background-color: inherit;
    transition: none;
    border: none;
    border-radius: 40px;

    &:hover {
      background-color: $primary-hover-color;
      cursor: pointer;
    }
  }
}
</style>
