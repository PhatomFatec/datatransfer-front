<script setup>
import BreadcrumbArrow from '/src/components/icons/BreadcrumbArrow.vue'
</script>


<template>
  <div class="configuracoes">
    <div class="breadcrumbs">
      <p class="active">ESCOLHA O PROVEDOR</p>
      <BreadcrumbArrow />
      <p>CONFIGURAÇÕES DA CONEXÃO</p>
      <BreadcrumbArrow />
      <p>FLUXO</p>
      <BreadcrumbArrow />
      <p>DIRETÓRIOS E CRIAÇÃO</p>
    </div>

    <div class="form">
      <!-- <div class="tela-form" id="escolhaProvedor">
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
          <input type="text" placeholder="Host" />
          <input type="password" placeholder="Password" />
          <input type="text" placeholder="URL" />
          <input type="text" placeholder="Chave SSH" />
          <button class="btn">Finalizar conexão</button>
        </div>
      </div> -->
      <div class="fluxo terceira tela" id="fluxo">
        <h1>3. Selecione o fluxo das conexões que irão realizar a transferência</h1>
        <div class="opcoes-fluxo">
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
        </div>
        <input type="radio" id="fromDrive" checked>
        <input type="radio" id="fromAWS">
        <input type="radio" id="toDrive" checked>
        <input type="radio" id="toAWS">
      </div>
      <button @click="anterior" class="btn btn-anterior" id="btnAnterior">ANTERIOR</button>
      <button @click="proximo" class="btn btn-proximo" id="btnProximo">PRÓXIMO</button>
    </div>
  </div>
</template>

<script>
export default {
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
    proximo: () => {
      var radioGoogle = document.getElementById('radioGoogle').checked
      var radioAWS = document.getElementById('radioAWS').checked
      var telaProvedor = document.getElementById('escolhaProvedor')
      var telaConexao = document.getElementById('configuraConexao')
      var btnProximo = document.getElementById('btnProximo')
      var btnAnterior = document.getElementById('btnAnterior')

      if (radioGoogle || radioAWS) {
        telaProvedor.style.display = 'none'
        telaConexao.style.display = 'flex'
        btnProximo.classList.remove('active')
        btnAnterior.classList.add('active')
      }
    },
    anterior: () => {
      var telaProvedor = document.getElementById('escolhaProvedor')
      var telaConexao = document.getElementById('configuraConexao')
      var btnProximo = document.getElementById('btnProximo')
      var btnAnterior = document.getElementById('btnAnterior')

      telaProvedor.style.display = 'flex'
      telaConexao.style.display = 'none'
      btnProximo.classList.add('active')
      btnAnterior.classList.remove('active')
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
    }
  }
}
</script>

<style>
@import '@/assets/css/configuracoes.css';
</style>