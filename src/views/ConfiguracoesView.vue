<script setup>
import BreadcrumbArrow from '/src/components/icons/BreadcrumbArrow.vue'
</script>


<template>
  <div class="configuracoes">
    <div class="credentials-generator">
      <h1>CREDENCIAIS</h1>
      <div class="fields">
        <label for="">Client ID</label>
        <input type="text" placeholder="client_id" id="client_id"/>
        <label for="">Client Secret</label>
        <input type="text" placeholder="client_secret" id="client_secret"/>
        <label for="">Project ID</label>
        <input type="text" placeholder="project_id"  id="project_id"/>
        <label for="">Redirect URIS</label>
        <input type="text" placeholder="redirect_uris" id="redirect_uris"/>
      </div>
      <button @click="sendCredentials">Gerar</button>
    </div>

    <div class="file">
      <div class="choose-folder">
        <select name="folder" id="folder">
          <option v-for="pasta in state.listaPastas" :key="pasta.codigo">{{ pasta.nome }}</option>
        </select>
      </div>

      <div class="send-file">
        <div
          class="file-input"
          @dragover.prevent
          @dragenter.prevent
          @drop="handleDrop"
          @click="selectFile"
          :class="{ 'is-dragover': isDragover }"
        >
          <p class="drop-input-label">Arraste seus arquivos aqui ou clique para selecionar</p>
          <input
            type="file"
            ref="fileInput"
            class="file-input__input"
            multiple
            @change="handleFileInput"
          />
        </div>
        <button @click="sendFile">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  data() {
    const state = reactive({
      listaPastas: Array
    })

    async function getPastas() {
      let pastas
      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      }
      await fetch('http://localhost:8081/folders', requestOptions)
        .then((response) => response.text())
        .then((results) => (pastas = JSON.parse(results)))
        .catch((error) => console.log('error', error))
      state.listaPastas = pastas
      return
    }
    async function sendFile() {
      const folderName = document.querySelector('select').value
      let folderCode = ''
      state.listaPastas.forEach((element) => {
        if (folderName == element.nome) {
          folderCode = element.codigo
        }
      })

      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      var raw = JSON.stringify({
        codigo: folderCode,
        nome: folderName
      })

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      fetch('http://localhost:8081/folders/select', requestOptions)
        .then((response) => response.text())
        .catch((error) => console.log('error', error))

      var input = document.querySelector('input[type="file"]')
      var data = new FormData()
      data.append('file', input.files[0])
      data.append('user', 'hubot')
      fetch('http://localhost:8081/upload', {
        method: 'POST',
        body: data
      }).then(alert('Arquivo enviado'))
    }

    return {
      state,
      getPastas,
      sendFile,
      isDragover: false
    }
  },

  methods: {
    handleFileInput(event) {
      const files = event.target.files
      console.log('1')
      console.log(files)
      let dropInputLabel = document.querySelector('.drop-input-label')
      dropInputLabel.innerHTML = files[0].name
      // fazer algo com os arquivos
    },

    handleDrop(event) {
      event.preventDefault()
      const files = event.dataTransfer.files
      let dropInputLabel = document.querySelector('.drop-input-label')
      dropInputLabel.innerHTML = files[0].name
      console.log('2')
      console.log(files[0].name)
      // fazer algo com os arquivos
      this.isDragover = false
    },

    selectFile() {
      let dropInputLabel = document.querySelector('.drop-input-label')
      this.$refs.fileInput.click()
      dropInputLabel.innerHTML = files[0].name
    },

    sendCredentials() {
      let client_id = document.querySelector('#client_id').value
      let client_secret = document.querySelector('#client_secret').value
      let project_id = document.querySelector('#project_id').value
      let redirect_uris = document.querySelector('#redirect_uris').value
      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      var raw = JSON.stringify({
        client_id: client_id,
        client_secret: client_secret,
        project_id: project_id,
        redirect_uris: redirect_uris
      })

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      fetch('http://localhost:8081/credentials', requestOptions)
        .then((response) => response.text())
        .then(alert('Credencial gerada'))
        .catch((error) => console.log('error', error))
      
      client_id = ''
      client_secret = ''
      project_id = ''
      redirect_uris = ''
    }
  },

  mounted() {
    this.getPastas()
  }
}
</script>

<style>
@import '@/assets/css/configuracoes.css';
@import '@/assets/css/home.css';
</style>
