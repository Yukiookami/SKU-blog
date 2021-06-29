<!--
 * @Author: zxy
 * @Date: 2021-06-06 15:50:41
 * @LastEditTime: 2021-06-29 18:40:22
 * @FilePath: /my-blog/src/components/adminPage/kanriPage/addPage.vue
-->
<template>
<div class="main-page">
  <div class="add-page">
    <div class="content-sec">
      <div class="input-box">
        <span>标题</span>
        <div class="title-box">
          <el-input class="input-magin" v-model="contentObj.title" placeholder="请输入标题"></el-input>

          <el-switch v-model="contentObj.isTop" active-text="置顶文章" inactive-text="取消置顶"></el-switch>
        </div>
      </div>

      <div class="input-box">
        <span>作者</span>
        <div class="title-box">
          <el-input class="input-magin" v-model="contentObj.sakusya" placeholder="请输入作者"></el-input>

          <el-radio-group v-model="contentObj.contentType">
            <el-radio-button label="program">编程</el-radio-button>
            <el-radio-button label="japanese">日语</el-radio-button>
            <el-radio-button label="component">组件</el-radio-button>
          </el-radio-group>
        </div>
      </div>

      <div class="input-box">
        <span>标签</span>
        <el-input class="input-magin" v-model="contentObj.tag" placeholder="请输入标签"></el-input>
      </div>

      <el-input
        type="textarea"
        :autosize="{ minRows: 7, maxRows: 7}"
        placeholder="请输入简介"
        v-model="contentObj.content">
      </el-input>

      <div class="up-img-box">
        <!-- <el-upload
          class="upload-demo"
          drag
          :action="`${API}api/upload/uploadFile`"
          :on-success="mdAdd"
          :before-upload="beforeAvatarUpload"
          name="file"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">
              上传markdown文件
            </div>
          </template>
        </el-upload> -->

        <el-upload
          class="upload-demo"
          drag
          :action="`${API}api/upload/uploadFile`"
          :on-success="imgAdd"
          name="file"
          :before-upload="beforeAvatarUploadImage"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">
              上传文章封面图片
            </div>
          </template>
        </el-upload>
      </div>
    </div>

    <div class="md-sec">
      <div class="input-box">
        <span>タイトル</span>
        <div class="title-box">
          <el-input class="input-magin" v-model="contentObjJP.title" placeholder="タイトルを入力してください"></el-input>
        </div>
      </div>

      <div class="input-box">
        <span>作者</span>
        <div class="title-box">
          <el-input class="input-magin" v-model="contentObjJP.sakusya" placeholder="作者を入力してください"></el-input>
        </div>
      </div>

      <div class="input-box">
        <span>タグ</span>
        <el-input class="input-magin" v-model="contentObjJP.tag" placeholder="タグを入力してください"></el-input>
      </div>

      <el-input
        type="textarea"
        :autosize="{ minRows: 7, maxRows: 7}"
        placeholder="前書きを入力してください"
        v-model="contentObj.content">
      </el-input>

      <div class="up-img-box">
        <el-upload
          class="upload-demo"
          drag
          :action="`${API}api/upload/uploadFile`"
          :on-success="showUrl"
          name="file"
          :before-upload="beforeAvatarUploadImage"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">
              上传图片获得链接
            </div>
          </template>
        </el-upload>
      </div>

      <el-divider></el-divider>

      <span>
        {{imgUrl}}
      </span>
    </div>
  </div>

  <div class="md-box">
    <div class="flex-bw-box">
      <el-radio-group v-model="mdContentType" class="choose-button">
        <el-radio-button label="chinese">中文</el-radio-button>
        <el-radio-button label="japanese">日本語</el-radio-button>
      </el-radio-group>

      <el-button @click="upMdData" type="success" plain>新增/修改</el-button>
    </div>
    <v-md-editor
      v-if="mdContentType === 'chinese'"
      @save="saveMd"
      v-model="contentObj.markdownContent"
      height="100vh"></v-md-editor>

    <v-md-editor
      v-else
      @save="saveMdJa"
      v-model="contentObjJP.markdownContent"
      height="100vh"></v-md-editor>
  </div>
</div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { imageRegexp } from '../../../assets/ts/Regexp'

export default {
  setup () {
    const { ctx }:any = getCurrentInstance()
    const API = ctx.$API

    const state:any = reactive({
      // 获得图片链接
      imgUrl: '',
      // md类型
      mdContentType: 'chinese',
      // 中文文章信息
      contentObj: {
        // 文章标题
        title: '',
        // 作者
        sakusya: 'skuZxy',
        // 标签分类
        tag: '',
        // 文章内容
        content: '',
        // 是否置顶
        isTop: false,
        // 文章类型（属于哪一种页面）
        contentType: 'program',
        // 封面图片
        coverImg: '',
        // md内容
        markdownContent: '',
        // 语言
        lange: 'cn'
      },
      // 日语文章信息
      contentObjJP: {
        // 文章标题
        title: '',
        // 作者
        sakusya: 'skuZxy',
        // 标签分类
        tag: '',
        // 文章内容
        content: '',
        // 是否置顶
        isTop: computed(() => state.contentObj.isTop),
        // 文章类型（属于哪一种页面）
        contentType: computed(() => state.contentObj.contentType),
        // 封面图片
        coverImg: computed(() => state.contentObj.coverImg),
        // md内容
        markdownContent: '',
        // 语言
        lange: 'ja'
      },
      /**
       * @description: 检测上传类型是否为markdown
       * @param {*}
       * @return {*}
       */
      beforeAvatarUpload: (file:any):boolean => {
        if (file.type === 'text/markdown') {
          return true
        } else {
          ElMessage.error('请确认上传类型是否正确')
          return false
        }
      },
      /**
       * @description: 检测上传类型是否为图片
       * @param {*}
       * @return {*}
       */
      beforeAvatarUploadImage: (file:any):boolean => {
        const sizeFlag = file.size / 1024 / 1024 < 2

        if (imageRegexp.test(file.type) && sizeFlag) {
          return true
        } else if (!sizeFlag) {
          ElMessage.error('图片大小不能超过2MB')
          return false
        } else {
          ElMessage.error('请确认上传类型是否正确')
          return false
        }
      },
      /**
       * @description: 上传markdown
       * @param {*}
       * @return {*}
       */
      mdAdd: (res:any) => {
        let { url } = res
      },
      /**
       * @description: 上传封面图片
       * @param {*}
       * @return {*}
       */
      imgAdd: (res:any) => {
        let { url } = res
        console.log(url, 'img')
      },
      /**
       * @description: 获得图片链接
       * @param {*}
       * @return {*}
       */
      showUrl: (res:any):void => {
        state.imgUrl = res.url
        ElMessage.success('上传成功')
      },
      /**
       * @description: 保存markdown内容
       * @param {string} text
       * @param {string} html
       * @return {*}
       */
      saveMd: (text:string, html:string) => {
        localStorage.setItem('mdContent', text)
      },
      saveMdJa: (text:string, html:string) => {
        localStorage.setItem('mdContentJa', text)
      },
      /**
       * @description: 获得存储数据
       * @param {*}
       * @return {*}
       */
      getMd: () => {
        let text = localStorage.getItem('mdContent')

        if (text) {
          state.contentObj.markdownContent = text
        }
      },
      getMdJa: () => {
        let text = localStorage.getItem('mdContentJa')

        if (text) {
          state.contentObjJP.markdownContent = text
        }
      },
      /**
       * @description: 上传文章数据
       * @param {*}
       * @return {*}
       */
      upMdData: () => {

      }
    })

    onMounted(() => {
      state.getMd()
      state.getMdJa()
    })

    return {
      ...toRefs(state),
      API
    }
  }
}
</script>

<style lang="scss" scoped>
// 引入公共样式
@import '../../../assets/css/adminCss/adminCommon.scss';

.add-page {
  display: flex;
  justify-content: space-between;

  .content-sec {
    width: 47%;
    padding-right: 3%;
    border-right: 1px dashed #ccc;
  }
}

.md-sec {
  width: 47%;
}

.up-img-box {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.title-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.md-box {
  margin-top: 30px;

  .flex-bw-box {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .choose-button {
    margin-bottom: 10px;
  }
}
</style>
