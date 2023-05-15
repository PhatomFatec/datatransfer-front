let currentPage = document.querySelector('.currentPage')

// Home page
homePage = `
<div class="home">
<iframe title="DataTransfer - Relatório" width="100%" height="100%" src="https://app.powerbi.com/reportEmbed?reportId=85dd70db-85b5-47a4-9286-8f49a8de29ca&autoAuth=true&ctid=cf72e2bd-7a2b-4783-bdeb-39d57b07f76f" frameborder="0" allowFullScreen="true"></iframe>
</div>
`;

// Configurations page
configurationPage = `
<div class="configuration">

<div class="area-fluxo">

  <input id="check-fluxo" type="checkbox">

  <img id="amazon" src="https://cdn.icon-icons.com/icons2/2407/PNG/512/aws_icon_146074.png" alt="">

  <svg id="switch-fluxo" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
    <polyline points="17 1 21 5 17 9"></polyline>
    <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
    <polyline points="7 23 3 19 7 15"></polyline>
    <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
  </svg>

  <img id="drive" src="https://cdn-icons-png.flaticon.com/512/2913/2913963.png" alt="">

</div>

    <div class="half">
    <h1>CREDENCIAIS</h1>
    <div class="cred">
            <div class="form">
                <label>Client ID</label>
                <input type="text" name="" id="client_id" placeholder="client_id">
                <label>Client Secret</label>
                <input type="text" name="" id="client_secret" placeholder="client_secret">
                <label>Project ID</label>
                <input type="text" name="" id="project_id" placeholder="project_id">
                <label>Redirect URIS</label>
                <input type="text" name="" id="redirect_uris" placeholder="redirect_uris">
                <button id="bt1" onclick="sendCredentials()"><p id="b1">Gerar</p><img id="gif1" src="../assets/loading.gif"></button>
            </div>
        </div>
    </div>
    <div class="half">
        <div class="file-input-container">
        <input type="file" id="file-input" multiple>
        <label for="file-input" class="file-input-label" id="input">
            <i class="fas fa-cloud-upload-alt"></i>
            <span id="text-input" class="text-input">Arraste e solte os arquivos aqui ou clique para selecionar</span>
        </label>
        <div id="file-list"></div>
        <button id="bt3" onclick="sendFile()"><p id="b3">Enviar</p><img id="gif3" src="../assets/loading.gif"></button>
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
    changeInput();
    setFluxo()
}
function toHistory() {
    currentPage.innerHTML = historyPage
    activeMenu('history');
    getHistory();
}

function setFluxo() {
    let switchFluxo = document.querySelector('#switch-fluxo')
    let checkFluxo = document.querySelector('#check-fluxo')
    let amazon = document.querySelector('#amazon')
    let drive = document.querySelector('#drive')


    switchFluxo.addEventListener('click', function () {
        if (checkFluxo.checked) {
            checkFluxo.checked = false
            drive.style.right = '150px'
            amazon.style.right = '0px'
        }
        else {
            checkFluxo.checked = true
            drive.style.right = '0px'
            amazon.style.right = '150px'
        }
    })
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

function changeInput() {
    let inputArea = document.querySelector('#file-input')
    let textInput = document.querySelector('#text-input')
    inputArea.addEventListener('change', function () {
        textInput.innerHTML = inputArea.files[0].name
        textInput.style.color = '#388a09'
    })
}

window.onload = toHome();
// window.onload = toConfig();