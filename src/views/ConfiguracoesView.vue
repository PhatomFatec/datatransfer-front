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
          <input type="text" placeholder="Host" />
          <input type="password" placeholder="Password" />
          <input type="text" placeholder="URL" />
          <input type="text" placeholder="Chave SSH" />
        </div>
      </div>
      <button @click="anterior" class="btn-anterior" id="btnAnterior">ANTERIOR</button>
      <button @click="proximo" class="btn-proximo" id="btnProximo">PRÓXIMO</button>
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
    }
  }
}
</script>

<style>
@import '@/assets/css/configuracoes.css';
</style>