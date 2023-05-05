let currentPage = document.querySelector('.currentPage')

// Home page
homePage = `
<div class="home">
    <iframe title="Report Section" width="100%" height="100%" src="https://app.powerbi.com/view?r=eyJrIjoiY2QxOWU3N2EtYzQ5Ny00OTAwLWJkNTEtZjk3MTkzMGZjN2NjIiwidCI6ImRkNDg5YTlkLTU4Y2EtNGI3Ny1iM2RkLWQ5MzYyZGJkMjdlZCJ9" frameborder="0" allowFullScreen="true"></iframe>
</div>
`;

// Configurations page
configurationPage = `
<div class="configuration">
    <div class="half">
        <h1>CREDENCIAIS</h1>
        <div class="form">
        <label>Client ID</label>
        <input type="text" name="" id="client_id" placeholder="client_id">
        <label>Client Secret</label>
        <input type="text" name="" id="client_secret" placeholder="client_secret">
        <label>Project ID</label>
        <input type="text" name="" id="project_id" placeholder="project_id">
        <label>Redirect URIS</label>
        <input type="text" name="" id="redirect_uris" placeholder="redirect_uris">
        <button onclick="sendCredentials()">Gerar</button>
        </div>
    </div>
    <div class="half">
        <div class="file-input-container">
        <input type="file" id="file-input" multiple>
        <label for="file-input" class="file-input-label">
            <i class="fas fa-cloud-upload-alt"></i>
            <span class="text-input">Arraste e solte os arquivos aqui ou clique para selecionar</span>
        </label>
        <div id="file-list"></div>
        <button onclick="sendFile()">Enviar</button>
        </div>
    </div>
</div>
`;

// History page
historyPage = `<div class="history"><table></table></div>`;

function toHome() {
    currentPage.innerHTML = homePage
    activeMenu('home');
}
function toConfig() {
    currentPage.innerHTML = configurationPage
    activeMenu('config');
}
function toHistory() {
    currentPage.innerHTML = historyPage
    activeMenu('history');
    getHistory();
}

function activeMenu(menu) {
    let menuHome = document.querySelector('.menu-home')
    let menuHistory = document.querySelector('.menu-history')
    let menuConfiguration = document.querySelector('.menu-configuration')
    switch (menu) {
        case 'home':
            menuHome.classList.add('active');
            menuHistory.classList.remove('active');
            menuConfiguration.classList.remove('active');
            break;
        case 'history':
            menuHome.classList.remove('active');
            menuHistory.classList.add('active');
            menuConfiguration.classList.remove('active');
            break;
        case 'config':
            menuHome.classList.remove('active');
            menuHistory.classList.remove('active');
            menuConfiguration.classList.add('active');
            break;
        default:
            break;
    }
}

function getHistory() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:8081/history", requestOptions)
      .then(response => response.text())
      .then(result => {
        historyList = JSON.parse(result)
        // console.log(historyList)
        let tabela = document.querySelector('table')
        tabela.innerHTML = '<tr><th>Arquivo</th><th>Tempo (s)</th><th>Tamanho (Kb)</th><th>Data</th><th>Status</th></tr>'
        historyList.forEach(e => {
          tabela.innerHTML += `<tr><td>${e.nome_arquivo}</td><td>${e.tempo}</td><td>${e.tamanho}</td><td>${e.data_envio}</td><td>${e.status}</td></tr>`
        })
      })
      .catch(error => console.log('error', error));
  }

window.onload = toHome();