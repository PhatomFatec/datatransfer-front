<template>
  <div class="message-container">
    <p>Operação bem sucedida</p>
    <div class="loading"></div>
  </div>
  <div class="message-container-error">
    <p>Ocorreu um erro</p>
    <div class="loading-error"></div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  // props: {
  //   msg: String,
  //   msgError: String
  // }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.message-container {
  width: 312px;
  position: absolute;
  box-shadow: 0 1px 10px #0000001a, 0 2px 15px #0000000d;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  right: -315px;
  top: 50px;
  transition: 1s;
}
.message-container p{
  padding: 14px;
  height: calc(100% - 5px);
  display: flex;
  height: 40px;
  align-items: center;
}
.message-container .loading {
    height: 5px;
    width: 312px;
    transition: width 3s;
    background: rgb(0, 193, 0);
}

.message-container-error {
  width: 312px;
  position: absolute;
  box-shadow: 0 1px 10px #0000001a, 0 2px 15px #0000000d;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  right: -315px;
  top: 50px;
  transition: 1s;
}
.message-container-error p{
  padding: 14px;
  height: calc(100% - 5px);
  display: flex;
  height: 40px;
  align-items: center;
}
.message-container-error .loading-error {
    height: 5px;
    width: 312px;
    transition: width 3s;
    background: rgb(193, 0, 0);
}

</style>