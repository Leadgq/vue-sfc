<template>
  <div class="w-full h-full bg-violet-200">
    <el-button @click="startRecording">捕获屏幕</el-button>
    <video width="200" height="200" autoplay ref='video'></video>
    <div class="w-full h-[1px] bg-red-500 mb-[10px] mt-[10px]"></div>
    <el-button @click="share">分享</el-button>
    <span>这个api现在支持不好</span>
    <div class="w-full h-[1px] bg-red-500 mb-[10px] mt-[10px]"></div>
    <el-button @click="copyHandler">剪贴</el-button>
    <div class="w-full h-[1px] bg-red-500 mb-[10px] mt-[10px]"></div>
    <el-button @click="getOrientation">获取屏幕方向</el-button>
    <el-button @click="lockHandler">锁屏</el-button>
    <div class="w-full h-[1px] bg-red-500 mb-[10px] mt-[10px]"></div>
    <el-button @click="transfer">文字转换语音</el-button>
    <el-button @click="transfers">语音转换文字</el-button>
    <div class="w-full h-[1px] bg-red-500 mb-[10px] mt-[10px]"></div>
    <el-button @click="getGeolocation">获取位置信息</el-button>
    <div class="w-full h-[1px] bg-red-500 mb-[10px] mt-[10px]"></div>
  </div>
</template>

<script setup lang="ts">
let video = ref<HTMLVideoElement | null>(null);
const startRecording = async () => {
  video.value!.srcObject = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: true
  })
}
const share = async () => {
  if (!navigator.canShare()) return;
  const res = await navigator.share({
    title: 'WebShare API Demo',
    text: 'mdn',
    url: 'https://developer.mozilla.org',
  })
  console.log(res);
}
// 剪贴板
const copyHandler = async () => {
  try {
    await navigator.clipboard.readText()
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err);
    return;
  }
  const text = "这是需要剪切的内容";
  await navigator.clipboard.writeText(text);
}
const lockHandler = async () => {
  await screen.orientation.lock("portrait");
}
// 获取屏幕方向
const getOrientation = () => {
  return screen.orientation.type;
}
const transfer = () => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance("Hello World");
  synth.speak(utterance);
}
// 麦克风坏了、测不了
const transfers = () => {
  const SpeechRecognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.start();
  recognition.onresult = (event: any) => {
    const speechToText = event.results[0][0].transcript;
    console.log(speechToText);
  };
}
// 获取地理信息
const getGeolocation = () => {
  navigator.permissions.query({name: "geolocation"}).then((result) => {
    if (result.state === "granted") {
      navigator.geolocation.getCurrentPosition(({coords}) => {
        console.log(coords);
      }, () => {

      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    }
  });
}
</script>
