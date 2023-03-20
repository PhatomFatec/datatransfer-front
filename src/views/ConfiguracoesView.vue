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

    <h1>1. Selecione o provedor do serviço</h1>

    <div class="form">
      <div class="escolha-o-provedor">
        <div for="googleDrive" class="card">
          <p>Google Drive</p>
          <img src="@/assets/images/Google_Drive_logo.png" alt="" srcset="" />
        </div>
        <input type="radio" name="googleDrive" id="googleDrive" />
        <div for="amazonWebService" class="card">
          <p>Google Drive</p>
          <img src="@/assets/images/AWS_logo.png" alt="" srcset="" />
        </div>
        <input type="radio" name="amazonWebService" id="amazonWebService" />
      </div>
      <button class="btn-proximo">PRÓXIMO</button>
    </div>
  </div>
</template>

<style>
@import '@/assets/css/configuracoes.css';
</style>