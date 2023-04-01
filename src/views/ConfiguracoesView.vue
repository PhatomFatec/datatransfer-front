<script setup>
import BreadcrumbArrow from '/src/components/icons/BreadcrumbArrow.vue'
</script>


<template>
  <div class="configuracoes">
    <!-- <div class="breadcrumbs">
      <p class="active">ESCOLHA O PROVEDOR</p>
      <BreadcrumbArrow />
      <p>CONFIGURAÇÕES DA CONEXÃO</p>
      <BreadcrumbArrow />
      <p>FLUXO</p>
      <BreadcrumbArrow />
      <p>DIRETÓRIOS E CRIAÇÃO</p>
    </div> -->

    <div class="form">
      <div class="tela-form" id="escolhaProvedor">
        <h1>1. Selecione o provedor do serviço</h1>
        <div class="opcoes">
          <div @click="escolheGoogle" class="card" id="cardGoogle">
            <p>Google Drive</p>
            <img src="@/assets/images/Google_Drive_logo.png" alt="" srcset="" />
          </div>
          <input type="radio" name="googleDrive" id="radioGoogle" />
          <div @click="escolheAWS" id="cardAWS" class="card">
            <p>Google Drive</p>
            <img src="@/assets/images/AWS_logo.png" alt="" srcset="" />
          </div>
          <input type="radio" name="amazonWebService" id="radioAWS" />
        </div>
      </div>
      <div class="tela-form segunda-tela" id="configuraConexao">
        <h1>2. Preencha os campos para criar a conexão o provedor escolhido:</h1>
        <div class="opcoes-conexao">
          <input id="i1" @change="proximo" type="text" placeholder="Host" />
          <input id="i2" @change="proximo" type="password" placeholder="Password" />
          <input id="i3" @change="proximo" type="text" placeholder="URL" />
          <input id="i4" @change="proximo" type="text" placeholder="Chave SSH" />
          <!-- <button class="btn">Finalizar conexão</button> -->
        </div>
      </div>

      <div class="fluxo terceira-tela" id="fluxo">
        <h1>3. Selecione o fluxo das conexões que irão realizar a transferência</h1>
        <div class="homeoptions">
          <select name="pastas" id="pastas">
            <option value=""></option>
          </select>
          <button>Enviar</button>
          <input type="file" name="file" id="file" />
          <button @click="enviaArquivo">envia essa merda logo</button>
        </div>
        <!-- <div class="opcoes-fluxo">
          <div class="opcao">
            <div @click="fluxoEsqAWS" class="imagem awsimg" id="fluxoEsqAWS">
              <img src="@/assets/images/AWS_logo.png" alt="Logo AWS" />
            </div>
            <div @click="fluxoEsqDrive" class="imagem driveimg" id="fluxoEsqDrive">
              <img src="@/assets/images/Google_Drive_logo.png" alt="" srcset="" />
            </div>
          </div>

          <svg
            width="454"
            height="38"
            viewBox="0 0 454 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M452.768 20.7531C453.744 19.7768 453.744 18.1939 452.768 17.2176L436.857 1.30819C435.881 0.331913 434.298 0.331965 433.322 1.30831C432.345 2.28465 432.345 3.86756 433.322 4.84384L447.464 18.9855L433.323 33.1281C432.346 34.1045 432.347 35.6874 433.323 36.6636C434.299 37.6399 435.882 37.6399 436.858 36.6635L452.768 20.7531ZM8.09129e-05 21.5L451 21.4854L451 16.4854L-8.09129e-05 16.5L8.09129e-05 21.5Z"
              fill="#777171"
            />
          </svg>

          <div class="opcao">
            <div @click="fluxoDirAWS" class="imagem awsimg" id="fluxoDirAWS">
              <img src="@/assets/images/AWS_logo.png" alt="Logo AWS" />
            </div>
            <div @click="fluxoDirDrive" class="imagem driveimg" id="fluxoDirDrive">
              <img src="@/assets/images/Google_Drive_logo.png" alt="" srcset="" />
            </div>
          </div>
        </div> -->
        <input type="radio" id="fromDrive" checked />
        <input type="radio" id="fromAWS" />
        <input type="radio" id="toDrive" checked />
        <input type="radio" id="toAWS" />
      </div>
      <button @click="anterior" class="btn btn-anterior" id="btnAnterior">ANTERIOR</button>
      <button @click="proximo('a')" class="btn btn-proximo" id="btnProximo">PRÓXIMO</button>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  setup() {
    const pastas = reactive({
      pasta: [],
    });

    return {
      pastas,
    };
  },

  methods: {
    escolheGoogle: () => {
      var cardGoogle = document.getElementById('cardGoogle')
      var cardAWS = document.getElementById('cardAWS')
      var radioGoogle = document.getElementById('radioGoogle')
      var radioAWS = document.getElementById('radioAWS')
      var btnProximo = document.getElementById('btnProximo')

      cardGoogle.classList.add('active')
      cardAWS.classList.remove('active')
      radioGoogle.checked = true
      radioAWS.checked = false
      btnProximo.classList.add('active')
    },
    escolheAWS: () => {
      var cardGoogle = document.getElementById('cardGoogle')
      var cardAWS = document.getElementById('cardAWS')
      var radioGoogle = document.getElementById('radioGoogle')
      var radioAWS = document.getElementById('radioAWS')
      var btnProximo = document.getElementById('btnProximo')

      cardGoogle.classList.remove('active')
      cardAWS.classList.add('active')
      radioGoogle.checked = false
      radioAWS.checked = true
      btnProximo.classList.add('active')
    },
    proximo: (a) => {
      var radioGoogle = document.getElementById('radioGoogle').checked
      var radioAWS = document.getElementById('radioAWS').checked
      var telaProvedor = document.getElementById('escolhaProvedor')
      var telaConexao = document.getElementById('configuraConexao')
      var btnProximo = document.getElementById('btnProximo')
      var btnAnterior = document.getElementById('btnAnterior')
      let terceiraTela = document.querySelector('.terceira-tela')
      let i1 = document.querySelector('#i1').value.trim()
      let i2 = document.querySelector('#i2').value.trim()
      let i3 = document.querySelector('#i3').value.trim()
      let i4 = document.querySelector('#i4').value.trim()

      if (radioGoogle || radioAWS) {
        if (telaProvedor.style.display != 'none') {
          telaConexao.style.display = 'flex'
          telaProvedor.style.display = 'none'
          btnProximo.classList.remove('active')
          btnAnterior.classList.add('active')
        } else if (
          telaConexao.style.display != 'none' &&
          i1 != '' &&
          i2 != '' &&
          i3 != '' &&
          i4 != ''
        ) {
          btnProximo.classList.add('active')
          if (a == 'a') {
            telaConexao.style.display = 'none'
            terceiraTela.style.display = 'flex'
            btnProximo.classList.remove('active')

            var myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/json')

            var requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
            }

            fetch('http://localhost:8081/folders', requestOptions)
              .then((response) => response.text())
              .then((result) => (this.pastas = result))
              .catch((error) => console.log('error', error))
          }
        } else {
          btnProximo.classList.remove('active')
        }

        // telaProvedor = 'none'
        // telaConexao = 'flex'
        // btnProximo.classList.remove('active')
        // btnAnterior.classList.add('active')
        console.log(this.$root.$options.meuValorGlobal)
      }
    },
    anterior: () => {
      var telaProvedor = document.getElementById('escolhaProvedor')
      var telaConexao = document.getElementById('configuraConexao')
      var btnProximo = document.getElementById('btnProximo')
      var btnAnterior = document.getElementById('btnAnterior')
      let terceiraTela = document.querySelector('.terceira-tela')

      if (telaConexao.style.display != 'none') {
        telaProvedor.style.display = 'flex'
        telaConexao.style.display = 'none'
        btnProximo.classList.add('active')
        btnAnterior.classList.remove('active')
      } else if (terceiraTela.style.display != 'none') {
        telaConexao.style.display = 'flex'
        terceiraTela.style.display = 'none'
        btnProximo.classList.add('active')
      }

      // telaProvedor.style.display = 'flex'
      // telaConexao.style.display = 'none'
      // btnProximo.classList.add('active')
      // btnAnterior.classList.remove('active')
    },
    fluxoEsqDrive: () => {
      let aws = document.getElementById('fluxoEsqAWS')
      let drive = document.getElementById('fluxoEsqDrive')
      let fromDrive = document.getElementById('fromDrive')
      let fromAWS = document.getElementById('fromAWS')

      fromDrive.checked = true
      fromAWS.checked = false

      aws.style = `top: 127px;
                   right: 0px;
                   width: 80px;
                   height: 80px;
                   transition: 0.2s;`

      drive.style = `top: 0px;
                     left: 50px;
                     width: 150px;
                     height: 150px;
                     transition: 0.2s;`
    },
    fluxoEsqAWS: () => {
      let aws = document.getElementById('fluxoEsqAWS')
      let drive = document.getElementById('fluxoEsqDrive')
      let fromDrive = document.getElementById('fromDrive')
      let fromAWS = document.getElementById('fromAWS')

      fromDrive.checked = false
      fromAWS.checked = true

      aws.style = `top: 0px;
                   right: 50px;
                   width: 150px;
                   height: 150px;
                   transition: 0.2s;`

      drive.style = `top: 127px;
                     left: 0px;
                     width: 80px;
                     height: 80px;
                     transition: 0.2s;`
    },
    fluxoDirDrive: () => {
      let aws = document.getElementById('fluxoDirAWS')
      let drive = document.getElementById('fluxoDirDrive')
      let toDrive = document.getElementById('toDrive')
      let toAWS = document.getElementById('toAWS')

      toDrive.checked = true
      toAWS.checked = false

      aws.style = `top: 127px;
                   right: 0px;
                   width: 80px;
                   height: 80px;
                   transition: 0.2s;`

      drive.style = `top: 0px;
                     left: 50px;
                     width: 150px;
                     height: 150px;
                     transition: 0.2s;`
    },
    fluxoDirAWS: () => {
      let aws = document.getElementById('fluxoDirAWS')
      let drive = document.getElementById('fluxoDirDrive')
      let toDrive = document.getElementById('toDrive')
      let toAWS = document.getElementById('toAWS')

      toDrive.checked = false
      toAWS.checked = true

      aws.style = `top: 0px;
                   right: 50px;
                   width: 150px;
                   height: 150px;
                   transition: 0.2s;`

      drive.style = `top: 127px;
                     left: 0px;
                     width: 80px;
                     height: 80px;
                     transition: 0.2s;`
    },
    enviaArquivo: () => {
      var input = document.querySelector('input[type="file"]')

      var data = new FormData()
      data.append('file', input.files[0])
      data.append('user', 'hubot')

      fetch('http://localhost:8081/upload', {
        method: 'POST',
        body: data
      })
    }
  }
}
</script>

<style>
@import '@/assets/css/configuracoes.css';
@import '@/assets/css/home.css';
</style>