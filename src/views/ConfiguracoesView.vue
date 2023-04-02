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
      <button>Gerar</button>
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

    // async function handleDrop(event) {
    //   event.preventDefault()
    //   var files = event.dataTransfer.files
    //   console.log(files)
    // }

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
      const client_id = document.querySelector('#client_id').value
      const client_secret = document.querySelector('#client_secret').value
      const project_id = document.querySelector('#project_id').value
      const redirect_uris = document.querySelector('#redirect_uris').value
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

      fetch('http://localhost:8081/folders/select', requestOptions)
        .then((response) => response.text())
        .catch((error) => console.log('error', error))
    }
  },

  mounted() {
    this.getPastas()
  }

  // escolheGoogle: () => {
  //   var cardGoogle = document.getElementById('cardGoogle')
  //   var cardAWS = document.getElementById('cardAWS')
  //   var radioGoogle = document.getElementById('radioGoogle')
  //   var radioAWS = document.getElementById('radioAWS')
  //   var btnProximo = document.getElementById('btnProximo')
  //   cardGoogle.classList.add('active')
  //   cardAWS.classList.remove('active')
  //   radioGoogle.checked = true
  //   radioAWS.checked = false
  //   btnProximo.classList.add('active')
  // },
  // escolheAWS: () => {
  //   var cardGoogle = document.getElementById('cardGoogle')
  //   var cardAWS = document.getElementById('cardAWS')
  //   var radioGoogle = document.getElementById('radioGoogle')
  //   var radioAWS = document.getElementById('radioAWS')
  //   var btnProximo = document.getElementById('btnProximo')
  //   cardGoogle.classList.remove('active')
  //   cardAWS.classList.add('active')
  //   radioGoogle.checked = false
  //   radioAWS.checked = true
  //   btnProximo.classList.add('active')
  // },
  // proximo: (a) => {
  //   var radioGoogle = document.getElementById('radioGoogle').checked
  //   var radioAWS = document.getElementById('radioAWS').checked
  //   var telaProvedor = document.getElementById('escolhaProvedor')
  //   var telaConexao = document.getElementById('configuraConexao')
  //   var btnProximo = document.getElementById('btnProximo')
  //   var btnAnterior = document.getElementById('btnAnterior')
  //   let terceiraTela = document.querySelector('.terceira-tela')
  //   let i1 = document.querySelector('#i1').value.trim()
  //   let i2 = document.querySelector('#i2').value.trim()
  //   let i3 = document.querySelector('#i3').value.trim()
  //   let i4 = document.querySelector('#i4').value.trim()
  //   if (radioGoogle || radioAWS) {
  //     if (telaProvedor.style.display != 'none') {
  //       telaConexao.style.display = 'flex'
  //       telaProvedor.style.display = 'none'
  //       btnProximo.classList.remove('active')
  //       btnAnterior.classList.add('active')
  //     } else if (
  //       telaConexao.style.display != 'none' &&
  //       i1 != '' &&
  //       i2 != '' &&
  //       i3 != '' &&
  //       i4 != ''
  //     ) {
  //       btnProximo.classList.add('active')
  //       if (a == 'a') {
  //         telaConexao.style.display = 'none'
  //         terceiraTela.style.display = 'flex'
  //         btnProximo.classList.remove('active')
  //         var myHeaders = new Headers()
  //         myHeaders.append('Content-Type', 'application/json')
  //         var requestOptions = {
  //           method: 'GET',
  //           headers: myHeaders,
  //           redirect: 'follow'
  //         }
  //         fetch('http://localhost:8081/folders', requestOptions)
  //           .then((response) => response.text())
  //           // .then((result) => (this.pastas = result))
  //           .then((results) => (console.log(results)))
  //           .catch((error) => console.log('error', error))
  //       }
  //     } else {
  //       btnProximo.classList.remove('active')
  //     }
  //     // telaProvedor = 'none'
  //     // telaConexao = 'flex'
  //     // btnProximo.classList.remove('active')
  //     // btnAnterior.classList.add('active')
  //     console.log(this.$root.$options.meuValorGlobal)
  //   }
  // },
  // anterior: () => {
  //   var telaProvedor = document.getElementById('escolhaProvedor')
  //   var telaConexao = document.getElementById('configuraConexao')
  //   var btnProximo = document.getElementById('btnProximo')
  //   var btnAnterior = document.getElementById('btnAnterior')
  //   let terceiraTela = document.querySelector('.terceira-tela')
  //   if (telaConexao.style.display != 'none') {
  //     telaProvedor.style.display = 'flex'
  //     telaConexao.style.display = 'none'
  //     btnProximo.classList.add('active')
  //     btnAnterior.classList.remove('active')
  //   } else if (terceiraTela.style.display != 'none') {
  //     telaConexao.style.display = 'flex'
  //     terceiraTela.style.display = 'none'
  //     btnProximo.classList.add('active')
  //   }
  //   // telaProvedor.style.display = 'flex'
  //   // telaConexao.style.display = 'none'
  //   // btnProximo.classList.add('active')
  //   // btnAnterior.classList.remove('active')
  // },
  // fluxoEsqDrive: () => {
  //   let aws = document.getElementById('fluxoEsqAWS')
  //   let drive = document.getElementById('fluxoEsqDrive')
  //   let fromDrive = document.getElementById('fromDrive')
  //   let fromAWS = document.getElementById('fromAWS')
  //   fromDrive.checked = true
  //   fromAWS.checked = false
  //   aws.style = `top: 127px;
  //                right: 0px;
  //                width: 80px;
  //                height: 80px;
  //                transition: 0.2s;`
  //   drive.style = `top: 0px;
  //                  left: 50px;
  //                  width: 150px;
  //                  height: 150px;
  //                  transition: 0.2s;`
  // },
  // fluxoEsqAWS: () => {
  //   let aws = document.getElementById('fluxoEsqAWS')
  //   let drive = document.getElementById('fluxoEsqDrive')
  //   let fromDrive = document.getElementById('fromDrive')
  //   let fromAWS = document.getElementById('fromAWS')
  //   fromDrive.checked = false
  //   fromAWS.checked = true
  //   aws.style = `top: 0px;
  //                right: 50px;
  //                width: 150px;
  //                height: 150px;
  //                transition: 0.2s;`
  //   drive.style = `top: 127px;
  //                  left: 0px;
  //                  width: 80px;
  //                  height: 80px;
  //                  transition: 0.2s;`
  // },
  // fluxoDirDrive: () => {
  //   let aws = document.getElementById('fluxoDirAWS')
  //   let drive = document.getElementById('fluxoDirDrive')
  //   let toDrive = document.getElementById('toDrive')
  //   let toAWS = document.getElementById('toAWS')
  //   toDrive.checked = true
  //   toAWS.checked = false
  //   aws.style = `top: 127px;
  //                right: 0px;
  //                width: 80px;
  //                height: 80px;
  //                transition: 0.2s;`
  //   drive.style = `top: 0px;
  //                  left: 50px;
  //                  width: 150px;
  //                  height: 150px;
  //                  transition: 0.2s;`
  // },
  // fluxoDirAWS: () => {
  //   let aws = document.getElementById('fluxoDirAWS')
  //   let drive = document.getElementById('fluxoDirDrive')
  //   let toDrive = document.getElementById('toDrive')
  //   let toAWS = document.getElementById('toAWS')
  //   toDrive.checked = false
  //   toAWS.checked = true
  //   aws.style = `top: 0px;
  //                right: 50px;
  //                width: 150px;
  //                height: 150px;
  //                transition: 0.2s;`
  //   drive.style = `top: 127px;
  //                  left: 0px;
  //                  width: 80px;
  //                  height: 80px;
  //                  transition: 0.2s;`
  // },
  // enviaArquivo: () => {
  //   var input = document.querySelector('input[type="file"]')
  //   var data = new FormData()
  //   data.append('file', input.files[0])
  //   data.append('user', 'hubot')
  //   fetch('http://localhost:8081/upload', {
  //     method: 'POST',
  //     body: data
  //   })
  // }
  // }
}
</script>

<style>
@import '@/assets/css/configuracoes.css';
@import '@/assets/css/home.css';
</style>
