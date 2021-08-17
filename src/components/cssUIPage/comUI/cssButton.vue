<!--
 * @Author: zxy
 * @Date: 2021-08-17 13:20:22
 * @LastEditTime: 2021-08-17 23:42:03
 * @FilePath: /my-blog/src/components/cssUIPage/comUI/cssButton.vue
-->
<template>
  <main>
    <v-md-preview text="# 纯CSS按钮样式demo 点击按钮显示源码"></v-md-preview>
    <!-- 泡沫按钮 -->
    <content-line title="hover 渐变效果（泡沫）按钮"></content-line>
    
    <div class="show-button-box">
      <div class="button-container-1" @click="changeAwaShow(0)">
        <span class="mask-text">MASK1</span>
        <button id='work' type="button" name="Hover">MASK1</button>
      </div>

      <div class="button-container-2" @click="changeAwaShow(1)">
        <span class="mask-text">MASK2</span>
        <button type="button" name="Hover">MASK2</button>
      </div>

      <div class="button-container-3" @click="changeAwaShow(2)">
        <span class="mask-text">MASK3</span>
        <button type="button" name="Hover">MASK3</button>
      </div>
    </div>
    
    <transition name="fade" mode="out-in">
      <v-md-preview :text="awaButtonFText" v-if="awaShowFlag === 0"></v-md-preview>
      <v-md-preview :text="awaButtonSText" v-else-if="awaShowFlag === 1"></v-md-preview>
      <v-md-preview :text="awaButtonTText" v-else-if="awaShowFlag === 2"></v-md-preview>
    </transition>
    <transition name="fade">
      <v-md-preview :text="awaButtonText" v-if="awaShowFlag >= 0"></v-md-preview>
    </transition>
    <!-- 泡沫按钮end -->
  </main>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'
import contentLine from '../../contentLine/contentLine.vue'

export default {
  setup () {
    const state = reactive({
      // 泡沫按钮
      // 泡沫按钮显示源码
      awaShowFlag: -1,
      awaButtonText: `
公共样式
\`\`\`scss
@import url('https://fonts.googleapis.com/css?family=Lato:100,300,400');
@import url('https://fonts.googleapis.com/css?family=Roboto:100');

@mixin awa-button(
  $back-color,
  $url,
  $size-x,
  $size-y,
  $border,
  $color
) {
  background-color: $back-color;
  mask: url($url);
  mask-size: $size-x $size-y;
  border: $border;
  color: $color;
}

.mask-text {
  position: absolute;
  color: #000;
  text-align: center;
  width: 100%;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  position: absolute;
  font-size: 11px;
  margin-top: 19px;
  overflow: hidden;
  font-weight: bold;
}

@keyframes button-ani-go {
  from {
    mask-position: 0 0;
  }

  to {
    mask-position: 100% 0;
  }
}

@keyframes button-ani-back {
 from {
  mask-position: 100% 0;
 }

 to {
  mask-position: 0 0;
 }
}
\`\`\`
      `,
      awaButtonFText: `
按钮样式
\`\`\`scss
.button-container-1 {
  position: relative;
  width: 100px;
  height: 50px;
  overflow: hidden;
  border: 1px solid;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 20px;
  transition: 0.5s;
  letter-spacing: 1px;
  border-radius: 8px;
  margin: 0 30px;
  
  button {
    width: 100%;
    height: 100%;
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    font-size: 11px;
    letter-spacing: 1px;
    font-weight: bold;
    padding: 0;
    
    @include awa-button(
      #000, 
      "../../../assets/img/cssUI/button/awaButton/nature-sprite.png", 
      2300%, 
      100%, 
      none,
      #fff 
    );

    cursor: pointer;
    animation: button-ani-back 0.7s steps(22) forwards;

    &:hover {
      animation: button-ani-go 0.7s steps(22) forwards;
    }
  }
}
\`\`\`

::: tip
  其实真正改动的地方只有mask图片url，图片宽度以及steps段数。
宽度=段数+1*100%
:::
`,
      awaButtonSText: `按钮样式
\`\`\`scss
.button-container-2 {
  position: relative;
  width: 100px;
  height: 50px;
  overflow: hidden;
  border: 1px solid;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 20px;
  transition: 0.5s;
  letter-spacing: 1px;
  border-radius: 8px;
  margin: 0 30px;
  
  button {
    width: 100%;
    height: 100%;
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    font-size: 11px;
    letter-spacing: 1px;
    font-weight: bold;
    padding: 0;
    
    @include awa-button(
      #000, 
      "../../../assets/img/cssUI/button/awaButton/urban-sprite.png", 
      3000%, 
      100%, 
      none,
      #fff 
    );

    cursor: pointer;
    animation: button-ani-back 0.7s steps(29) forwards;

    &:hover {
      animation: button-ani-go 0.7s steps(29) forwards;
    }
  }
}
\`\`\`

::: tip
  其实真正改动的地方只有mask图片url，图片宽度以及steps段数。
宽度=段数+1*100%
:::`,
      awaButtonTText: `按钮样式
\`\`\`scss
.button-container-3 {
  position: relative;
  width: 100px;
  height: 50px;
  overflow: hidden;
  border: 1px solid;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 20px;
  transition: 0.5s;
  letter-spacing: 1px;
  border-radius: 8px;
  margin: 0 30px;

  button {
    width: 100%;
    height: 100%;
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    font-size: 11px;
    letter-spacing: 1px;
    font-weight: bold;
    padding: 0;
    
    @include awa-button(
      #000, 
      "../../../assets/img/cssUI/button/awaButton/natureSmaller.png", 
      7100%, 
      100%, 
      none,
      #fff 
    );

    cursor: pointer;
    animation: button-ani-back 0.7s steps(70) forwards;

    &:hover {
      animation: button-ani-go 0.7s steps(70) forwards;
    }
  }
}
\`\`\`

::: tip
  其实真正改动的地方只有mask图片url，图片宽度以及steps段数。
宽度=段数+1*100%
:::`,
      /**
       * @description: 根据点击显示源码
       * @param {number} index
       * @return {*}
       */      
      changeAwaShow: (index:number) => {
        if (index === state.awaShowFlag) {
          state.awaShowFlag = -1
        } else {
          state.awaShowFlag = index
        }
      }
      // 泡沫按钮end
    })
  
    return {
      ...toRefs(state),
    }
  },
  components: {
    contentLine
  }
}
</script>

<style lang="scss" scoped>
// 源码进入过渡
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s linear;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

// 展示盒
.show-button-box {
  display: flex;
}

// 泡沫按钮效果
@import url('https://fonts.googleapis.com/css?family=Lato:100,300,400');
@import url('https://fonts.googleapis.com/css?family=Roboto:100');

@mixin awa-button(
  $back-color,
  $url,
  $size-x,
  $size-y,
  $border,
  $color
) {
  background-color: $back-color;
  mask: url($url);
  mask-size: $size-x $size-y;
  border: $border;
  color: $color;
}

.mask-text {
  position: absolute;
  color: #000;
  text-align: center;
  width: 100%;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  position: absolute;
  font-size: 11px;
  margin-top: 19px;
  overflow: hidden;
  font-weight: bold;
}

// 第一个按钮
.button-container-1 {
  position: relative;
  width: 100px;
  height: 50px;
  overflow: hidden;
  border: 1px solid;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 20px;
  transition: 0.5s;
  letter-spacing: 1px;
  border-radius: 8px;
  margin: 0 30px;
  
  button {
    width: 100%;
    height: 100%;
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    font-size: 11px;
    letter-spacing: 1px;
    font-weight: bold;
    padding: 0;
    
    @include awa-button(
      #000, 
      "../../../assets/img/cssUI/button/awaButton/nature-sprite.png", 
      2300%, 
      100%, 
      none,
      #fff 
    );

    cursor: pointer;
    animation: button-ani-back 0.7s steps(22) forwards;

    &:hover {
      animation: button-ani-go 0.7s steps(22) forwards;
    }
  }
}
// 第一个按钮end

// 第二个按钮
.button-container-2 {
  position: relative;
  width: 100px;
  height: 50px;
  overflow: hidden;
  border: 1px solid;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 20px;
  transition: 0.5s;
  letter-spacing: 1px;
  border-radius: 8px;
  margin: 0 30px;
  
  button {
    width: 100%;
    height: 100%;
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    font-size: 11px;
    letter-spacing: 1px;
    font-weight: bold;
    padding: 0;
    
    @include awa-button(
      #000, 
      "../../../assets/img/cssUI/button/awaButton/urban-sprite.png", 
      3000%, 
      100%, 
      none,
      #fff 
    );

    cursor: pointer;
    animation: button-ani-back 0.7s steps(29) forwards;

    &:hover {
      animation: button-ani-go 0.7s steps(29) forwards;
    }
  }
}
// 第二个按钮end

// 第三个按钮
.button-container-3 {
  position: relative;
  width: 100px;
  height: 50px;
  overflow: hidden;
  border: 1px solid;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 20px;
  transition: 0.5s;
  letter-spacing: 1px;
  border-radius: 8px;
  margin: 0 30px;

  button {
    width: 100%;
    height: 100%;
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    font-size: 11px;
    letter-spacing: 1px;
    font-weight: bold;
    padding: 0;
    
    @include awa-button(
      #000, 
      "../../../assets/img/cssUI/button/awaButton/natureSmaller.png", 
      7100%, 
      100%, 
      none,
      #fff 
    );

    cursor: pointer;
    animation: button-ani-back 0.7s steps(70) forwards;

    &:hover {
      animation: button-ani-go 0.7s steps(70) forwards;
    }
  }
}
// 第三个按钮end

@keyframes button-ani-go {
  from {
    mask-position: 0 0;
  }

  to {
    mask-position: 100% 0;
  }
}

@keyframes button-ani-back {
 from {
  mask-position: 100% 0;
 }

 to {
  mask-position: 0 0;
 }
}
// 泡沫按钮效果end
</style>