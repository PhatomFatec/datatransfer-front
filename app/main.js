var imported = document.createElement('script');
imported.src = 'home.js';
document.head.appendChild(imported);

let home = document.querySelector('.home')
let history = document.querySelector('.history')
let configuration = document.querySelector('.configuration')
let menuHome = document.querySelector('.menu-home')
let menuHistory = document.querySelector('.menu-history')
let menuConfiguration = document.querySelector('.menu-configuration')
let historyList = []

// function toConfig() {
//   let home = document.querySelector('.home')
//   let history = document.querySelector('.history')
//   let configuration = document.querySelector('.configuration')
//   let menuHome = document.querySelector('.menu-home')
//   let menuHistory = document.querySelector('.menu-history')
//   let menuConfiguration = document.querySelector('.menu-configuration')

//   home.style.display = 'none'
//   history.style.display = 'none'
//   configuration.style.display = 'flex'
//   menuHome.classList.remove('active')
//   menuHistory.classList.remove('active')
//   menuConfiguration.classList.add('active')
// }

function toHome() {
  let home = document.querySelector('.home')
  let history = document.querySelector('.history')
  let configuration = document.querySelector('.configuration')
  let menuHome = document.querySelector('.menu-home')
  let menuHistory = document.querySelector('.menu-history')
  let menuConfiguration = document.querySelector('.menu-configuration')

  home.style.display = 'flex'
  history.style.display = 'none'
  configuration.style.display = 'none'
  menuHome.classList.add('active')
  menuHistory.classList.remove('active')
  menuConfiguration.classList.remove('active')
}

function toHistory() {
  let home = document.querySelector('.home')
  let history = document.querySelector('.history')
  let configuration = document.querySelector('.configuration')
  let menuHome = document.querySelector('.menu-home')
  let menuHistory = document.querySelector('.menu-history')
  let menuConfiguration = document.querySelector('.menu-configuration')

  home.style.display = 'none'
  history.style.display = 'flex'
  configuration.style.display = 'none'
  menuHome.classList.remove('active')
  menuHistory.classList.add('active')
  menuConfiguration.classList.remove('active')
}

function sendCredentials() {
  let client_id = document.querySelector('#client_id').value
  let client_secret = document.querySelector('#client_secret').value
  let project_id = document.querySelector('#project_id').value
  let redirect_uris = document.querySelector('#redirect_uris').value
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Access-Control-Allow-Origin', '*')
  document.querySelector('#b1').style.display = "none"
  document.querySelector('#gif1').style.display = "block"
  document.querySelector('#bt1').disabled = true
  document.querySelector('#bt1').style.background = 'gray'

  var raw = JSON.stringify({
    id: 1,
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
    .then((response) => {
      response.text()
      notifyOk()
      document.querySelector('#b1').style.display = "block"
      document.querySelector('#gif1').style.display = "none"
      document.querySelector('#bt1').disabled = false
      document.querySelector('#bt1').style.background = '#6E07B2'
    })
    .catch((error) => {
      console.log('error', error)
      notifyNotOk()
      document.querySelector('#b1').style.display = "block"
      document.querySelector('#gif1').style.display = "none"
      document.querySelector('#bt1').disabled = false
      document.querySelector('#bt1').style.background = '#6E07B2'
    })

  document.querySelector('#client_id').value = ''
  document.querySelector('#client_secret').value = ''
  document.querySelector('#project_id').value = ''
  document.querySelector('#redirect_uris').value = ''
}

function notifyOk() {
  let toast = document.querySelector('.message-container')
  let loading = document.querySelector('.loading')
  toast.style.right = '20px'
  setTimeout(() => {
    loading.style.width = '0px'
  }, '1000')
  setTimeout(() => {
    toast.style.right = '-315px'
  }, '4000')
  setTimeout(() => {
    loading.style.width = '312px'
  }, '5000')
}

function notifyNotOk() {
  let toast = document.querySelector('.message-container-error')
  let loading = document.querySelector('.loading-error')
  toast.style.right = '20px'
  setTimeout(() => {
    loading.style.width = '0px'
  }, '1000')
  setTimeout(() => {
    toast.style.right = '-315px'
  }, '4000')
  setTimeout(() => {
    loading.style.width = '312px'
  }, '5000')
}

function sendFile() {
  document.querySelector('#b3').style.display = "none"
  document.querySelector('#gif3').style.display = "block"
  document.querySelector('#bt3').disabled = true
  document.querySelector('#bt3').style.background = 'gray'
  const fluxo = document.querySelector('#check-fluxo')
  let endpoint
  if (fluxo.checked) {
    endpoint = 'upload/aws'
  }
  else {
    endpoint = 'upload'
  }

  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  var input = document.querySelector('input[type="file"]')
  var data = new FormData()
  data.append('file', input.files[0])
  data.append('user', 'hubot')
  fetch(`http://localhost:8081/${endpoint}`, {
    method: 'POST',
    body: data
  })
    .then((response) => {
      response.text()
      notifyOk()
      document.querySelector('#b3').style.display = "block"
      document.querySelector('#gif3').style.display = "none"
      document.querySelector('#bt3').disabled = false
      document.querySelector('#bt3').style.background = '#6E07B2'
      document.querySelector('text-input').innerHTML = 'Arraste e solte os arquivos aqui ou clique para selecionar'
      document.querySelector('text-input').style.color = '#aaa'
    })
    .catch((error) => {
      console.log('error', error)
      notifyNotOk()
      document.querySelector('#b3').style.display = "block"
      document.querySelector('#gif3').style.display = "none"
      document.querySelector('#bt3').disabled = false
      document.querySelector('#bt3').style.background = '#6E07B2'
    })
}



window.onload = function onload() {
  const fileInput = document.getElementById('file-input');
  const fileList = document.getElementById('file-list');
  let textInput = document.querySelector('.text-input')

  fileInput.addEventListener('change', (event) => {
    fileList.innerHTML = '';
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const li = document.createElement('li');
      li.innerHTML = files[i].name;
      fileList.appendChild(li);
      textInput.innerHTML = files[0].name
      textInput.style.color = '#00c723'
      document.querySelector('.file-input-label').style.borderColor = '#00c723'
    }
  });

  fileInput.addEventListener('dragover', (event) => {
    event.preventDefault();
    fileInput.classList.add('drag-over');
  });

  fileInput.addEventListener('dragleave', (event) => {
    event.preventDefault();
    fileInput.classList.remove('drag-over');
  });

  fileInput.addEventListener('drop', (event) => {
    event.preventDefault();
    fileInput.classList.remove('drag-over');
    fileList.innerHTML = '';
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      const li = document.createElement('li');
      li.innerHTML = files[i].name;
      fileList.appendChild(li);
    }
  });
}

// function getHistory() {
//   var requestOptions = {
//     method: 'GET',
//     redirect: 'follow'
//   };

//   fetch("http://localhost:8081/history", requestOptions)
//     .then(response => response.text())
//     .then(result => {
//       historyList = JSON.parse(result)
//       // console.log(historyList)
//       let tabela = document.querySelector('table')
//       tabela.innerHTML = '<tr><th>Arquivo</th><th>Tempo (s)</th><th>Tamanho (Kb)</th><th>Data</th><th>Status</th></tr>'
//       historyList.forEach(e => {
//         tabela.innerHTML += `<tr><td>${e.nome_arquivo}</td><td>${e.tempo}</td><td>${e.tamanho}</td><td>${e.data_envio}</td><td>${e.status}</td></tr>`
//       })
//     })
//     .catch(error => console.log('error', error));
// }


function mandaTempo(){
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  var tempo = document.querySelector('#tempoDeEnvio').value

  var raw = JSON.stringify({
    id: 1,
    time: tempo
  })

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  fetch('http://localhost:8081/alterar', requestOptions)
    .then((response) => {
      response.text()
      notifyOk()
    })
    .catch((error) => {
      console.log('error', error)
      notifyNotOk()
    })
}

function mandaCredencial2 (){
  let accessKey = document.querySelector('#accessKey').value
  let secretKey = document.querySelector('#secretKey').value
  let region = document.querySelector('#region').value
  let bucketName = document.querySelector('#bucketName').value
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Access-Control-Allow-Origin', '*')
  document.querySelector('#b2').style.display = "none"
  document.querySelector('#gif2').style.display = "block"
  document.querySelector('#bt2').disabled = true
  document.querySelector('#bt2').style.background = 'gray'

  var raw = JSON.stringify({
    id: 1,
    accessKey: accessKey,
    secretKey: secretKey,
    region: region,
    bucketName: bucketName,
  })

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  fetch('http://localhost:8081/credentials/aws', requestOptions)
    .then((response) => {
      response.text()
      notifyOk()
      document.querySelector('#b2').style.display = "block"
      document.querySelector('#gif2').style.display = "none"
      document.querySelector('#bt2').disabled = false
      document.querySelector('#bt2').style.background = '#6E07B2'
    })
    .catch((error) => {
      console.log('error', error)
      notifyNotOk()
      document.querySelector('#b2').style.display = "block"
      document.querySelector('#gif2').style.display = "none"
      document.querySelector('#bt2').disabled = false
      document.querySelector('#bt2').style.background = '#6E07B2'
    })

  document.querySelector('#accessKey').value = ''
  document.querySelector('#secretKey').value = ''
  document.querySelector('#region').value = ''
  document.querySelector('#bucketName').value = ''
}



module.exports = { toHome, toHistory, notifyOk };