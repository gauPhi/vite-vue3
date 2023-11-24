<template>
  <div class="py-2 px-4 bg-white h-500px">
    <div class="popup-wrap">
      <div class="popup-title">
        签字
      </div>
      <div class="popup-content">
        <div style="width: 100%;">
          <!--调用插件-->
          <Vue3Esign ref="vueEsignRef" :height="clientHeight" :width="clientWidth" :bgColor="vueEsignBgColor"
            :is-clear-bg-color="false" :is-crop="isCrop" :line-width="lineWidth" :line-color="lineColor" />
        </div>
      </div>
      <div class="popup-buttom mt-2 flex-l">
        <a-button type="primary" @click.stop="clearCanves">清除</a-button>
        <a-button @click.stop="saveCanves" danger>提交</a-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, UnwrapRef, watch, provide } from 'vue'

import { Vue3Esign } from 'vue3-esign'

const vueEsignRef = ref<any>(null)
const vueEsignBgColor = ref<string>('#f7f7f7')
const lineWidth = ref(2)
const lineColor = ref('#000000')
const isCrop = ref(false)
const img = ref('')

const clientWidth = ref(400)
const clientHeight = ref(250)
//打开弹框
// const openSign = async () => {
//   signPopup.value = true;
//   await nextTick();
// }
//清空
function clearCanves(): void {
  vueEsignRef.value.reset()
}
//保存
const saveCanves = async () => {
  try {
    const base64Data = await vueEsignRef.value.generate()
    console.log('res', base64Data)
    img.value = base64Data
    const blob = dataURLtoBlob(base64Data);

    const file = blobToFile(blob, "业主签字.png");

    const formData = new FormData();
    formData.append("file", file);

  }
  catch (error) {
    // Snackbar({
    //   content: "请先签字",
    //   position: 'top',
    //   duration: 1000
    // })
    img.value = ''
  }
}
//将base64转换为blob
function dataURLtoBlob(dataurl: string) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];

  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

//将blob转换为file
function blobToFile(theBlob: any, fileName: string) {
  const file = new File([theBlob], fileName)
  return file;
}


</script>