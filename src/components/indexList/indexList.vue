<template>
  <!-- 判断位置 -->
  <div ref="indexListBox"></div>

  <div class="index-list-box"
  :class="{'get-top': getTop}">
    <div class="index-list-box-item"
    v-for="(item, index) in senArr" :key="`indexListBox${index}`">
      <h2 @click="goTo(index, 0, 1)" :class="{'show-h2': comTitleIndex === index}">{{item.typeName}}</h2>
      <span @click="goTo(index, contentItemIndex, 0)" :class="{'show-span': comContentIndex === contentItemIndex && comTitleIndex === index}"
      v-for="(contentItem, contentItemIndex) in item.contentList"
      :key="`item${contentItemIndex}`">{{contentItem.title}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, reactive, ref, toRefs } from 'vue'
import indexListItem from './indexListItem/indexListItem.vue'

export default {
  // 目录数组，标题索引，文章索引，数组长度
  props: ['senArr', 'titleIndex', 'contentIndex', 'numberList'],
  emits: ['goTo'],
  setup (props:any, context:any) {
    const indexListBox = ref(null as HTMLDivElement | null)

    const state = reactive({
      getTop: false,
      // 最大高度
      topH: 0,
      /**
       * 监听是否触顶
       */
      listenPageTop: () => {
        let winTop:number = indexListBox.value!.getBoundingClientRect().top

        if (winTop < 70) {
          state.getTop = true
        } else {
          state.getTop = false
        }
      },
      // 标题index
      comTitleIndex: computed(() => props.titleIndex),
      // 文章index
      comContentIndex: computed(() => {
        let nowContentIndex:number = props.contentIndex
        let nowIndex:number = state.comTitleIndex
        let arrLength:number = props.numberList.length

        if (!(nowIndex - 1)) {
          return Math.abs(nowContentIndex - props.numberList[0])
        } else if (nowIndex) {
          let indexSum = props.numberList.reduce((prev:number, cur:number, index:number):any => {
            if (index < arrLength - 1) {
              return prev + cur
            }
          })
          return Math.abs(indexSum)
        } else {
          return nowContentIndex
        }
      }),
      goTo: (index:number, contentIndex:number, titleFlag:number) => {
        context.emit("goTo", index, contentIndex, titleFlag)
      }
    })

    onMounted(() => {
      state.topH = indexListBox.value!.getBoundingClientRect().top
      window.addEventListener('scroll', state.listenPageTop, true)
    })

    return {
      ...toRefs(state),
      indexListBox
    }
  },
  components: {
    indexListItem
  }
}
</script>

<style lang="scss" scoped>
.index-list-box {
  height: 500px;
  width: 200px;
  // background-color: #000;

  .index-list-box-item {
    font-family: 'Ubuntu',sans-serif;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    h2 {
      font-size: 18px;
      margin: 0 0 5px 0;
      padding: 5px 8px;
      background-color: #fff;
      border-radius: 5px;
      transition: all .5s ease-in-out;
      cursor: pointer;

      &:hover {
        background-color: rgba(248, 186, 11, 1);
        color: #fff;
      }
    }

    .show-h2 {
      background-color: rgba(248, 186, 11, 1);
      color: #fff;
    }

    span {
      display: block;
      font-size: 12px;
      margin: 5px 0 5px 10px;
      padding: 3px 5px;
      border-radius: 5px;
      color: #666;
      transition: all .5s ease-in-out;
      cursor: pointer;

      &:hover {
        background-color: rgba(248, 186, 11, .7);
        color: #fff;
      }
    }

    .show-span {
      background-color: rgba(248, 186, 11, .7);
      color: #fff;
    }
  }
}

.get-top {
  position: fixed;
  top: 70px;
  right: calc((100vw - 800px) / 2 - 252px);
}
</style>
