<template>
  <el-dialog title="电子签名" width="850px" :visible="visible" append-to-body destroy-on-close :close-on-click-modal="false"
    :before-close="() => { visible = false; }">
    <div>
      <!-- 画布对象 -->
      <div ref="grapDiv" style="width:800px;height:400px; background-color: #fff;" v-show="!isCommit">
        <canvas ref="grapCvs" id="container" style="width: 800px;height: 400px;background-color: #fff;"
          @mousedown.stop="mousedown" @mousemove.stop="mousemove" />
      </div>

      <!-- 提交的画布对象 -->
      <div style="width:800px;height:400px;background-color: #fff;" v-show="isCommit">
        <img :src="content">
      </div>

      <!-- 操作按钮 -->
      <div style="width:800px;padding-top: 10px;">
        <!-- <el-button @click="set()" v-show="!isCommit">画笔设置</el-button> -->
        <el-button @click="clear()" v-show="!isCommit">清除</el-button>
        <el-button type="primary" @click="commit()" v-show="!isCommit">提交</el-button>
        <el-button @click="goback()">返回</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { uploadFile } from "@/YDCLOUD/api/screenDesigner/index.js";

export default {
  props: ['signType'],
  data() {
    return {
      visible: false,
      canvas: null,       // cvs对象
      graphics: null,      // 画笔对象
      isDrawing: false,   // 是否可以进行画
      curMouseY: null,    // 当前鼠标在屏幕中的Y轴坐标
      curMouseX: null,     // 当前鼠标在屏幕中的X轴坐标
      offsetY: null,       // cvs在屏幕中的Y轴偏移量
      xoffsetX: null,      // cvs在屏幕中的X轴偏移量
      cvsWidth: 800,       // cvs的宽度
      cvsHeight: 400,      // cvs的高度
      isCommit: false,     // 画笔是否提交
      content: null,       // 画布提交的内容
      ifGraph: false,      // 是否画过(提交的用于检验是否有签字过)
      ifSet: false,        // 是否打开设置面板
      ifSetController: false,  // 是否打开画笔设置面板
      fontSize: 1,          // 字体大小
      fontColor: "#000000"  // 画笔默认颜色
    }
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          // 获取cvs的容器
          this.$nextTick(() => {
            var canvas = document.getElementById("container");
            canvas.width = this.cvsWidth;            // 设置cvs的宽度
            canvas.height = this.cvsHeight;          // 设置cvs的高度
            this.offsetY = canvas.offsetTop;         // 设置容器在屏幕中的顶部偏移量
            this.offsetX = canvas.offsetLeft;        // 设置容器在屏幕中的左边偏移量
            this.graphics = canvas.getContext("2d"); // 获取2d类型的画布对象
            this.canvas = canvas;                    // cvs对像

            // 鼠标松开后，就不允许在画
            document.addEventListener('mouseup', e => {
              this.isDrawing = false;
              this.graphics.closePath()
            })
          })

        }
      },
      deep: true
    }
  },
  methods: {
    // 鼠标点击按下事件
    mousedown(e) {
      // 鼠标点击的时候设置，变量标志可以画了
      this.isDrawing = true;
      // 获取当前鼠标的位置(鼠标在屏幕中的坐标减去容器在屏幕中的偏移量即可得到鼠标当前的坐标)
      this.curMouseX = e.offsetX;
      this.curMouseY = e.offsetY
      // 从当前鼠标的位置开始画
      this.graphics.beginPath()
      this.graphics.moveTo(this.curMouseX, this.curMouseY);

      // 鼠标离开，则关闭控制面板
      this.ifSetController = false
      this.ifSet = false
      this.$refs.grapDiv.style.cssText = "width:800px;height:400px; border-radius: 10px;"
    },
    // 鼠标移动事件
    mousemove(e) {
      // 可以画的标志为true，代表可以进行画了
      if (this.isDrawing) {
        // 设置画笔属性
        this.graphics.strokeStyle = this.fontColor;
        this.graphics.lineWidth = this.fontSize;

        // 设置从哪里开始画
        this.curMouseX = e.offsetX
        this.curMouseY = e.offsetY
        // 获取当前鼠标的位置(鼠标在屏幕中的坐标减去容器在屏幕中的偏移量即可得到鼠标当前的坐标)
        this.graphics.lineTo(this.curMouseX, this.curMouseY)
        this.graphics.stroke()
        // 设置当前已经开始绘画了
        this.ifGraph = true
      }
    },
    // 清除画布
    clear() {
      this.ifGraph = false
      this.$refs.grapCvs.width = this.$refs.grapCvs.width
    },
    // 提交画布
    commit() {
      // 内容过滤
      if (!this.ifGraph) {
        this.$message.error('没有可提交的内容！')
        return
      }
      // this.$confirm('确定提交?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      // }).then(() => {
      this.isCommit = true
      this.ifSetController = false
      this.ifSet = false
      const imageData = this.graphics.getImageData(0, 0, 800, 400);
      for (let i = 0; i < imageData.data.length; i += 4) {
        // 当该像素是透明的，则设置成白色
        if (imageData.data[i + 3] === 0) {
          imageData.data[i] = 255;
          imageData.data[i + 1] = 255;
          imageData.data[i + 2] = 255;
          imageData.data[i + 3] = 255;
        }
      }
      this.graphics.putImageData(imageData, 0, 0);
      this.content = this.canvas.toDataURL()

      this.uploadSign(this.content, this.signType)
    },

    //上传签名
    uploadSign(val, name) {
      let postData = {
        fileName: name,
        fileSize: this.calcBase64ToFileSize(val),
        fileExtension: '.png',
        base64Img: val.split(',')[1],
      };
      // uploadFile(postData)
      //   .then((res) => {
      //     if (res.code == "200") {
      //       this.$emit('commit', res.data.data, name)
      //       this.goback()
      //     }
      //   })
      //   .catch((error) => { console.log(error); });
    },
    calcBase64ToFileSize(str) {
      let padding = 0;
      str = str.substring(str.indexOf(",") + 1);
      if (str.endsWith("==")) {
        padding = 2;
      } else if (str.endsWith("=")) {
        padding = 1;
      }
      return Math.ceil(str.length / 4) * 3 - padding;
    },
    // 返回
    goback() {
      this.ifGraph = false
      this.$refs.grapCvs.width = this.$refs.grapCvs.width
      this.isCommit = false
      this.visible = false
    }
  },

};
</script>
<style>
/* 选中的li改变样式 */
.activeteLi {
  box-shadow: 0 0 3px rgb(0 0 0 / 95%);
  transform: scale(1.2);
}
</style>