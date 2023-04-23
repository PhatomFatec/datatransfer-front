let home = document.querySelector('.home')
let history = document.querySelector('.history')
let configuration = document.querySelector('.configuration')
let menuHome = document.querySelector('.menu-home')
let menuHistory = document.querySelector('.menu-history')
let menuConfiguration = document.querySelector('.menu-configuration')

function toConfig() {
  home.style.display = 'none'
  history.style.display = 'none'
  configuration.style.display = 'flex'
  menuHome.classList.remove('active')
  menuHistory.classList.remove('active')
  menuConfiguration.classList.add('active')
}

function toHome() {
  home.style.display = 'flex'
  history.style.display = 'none'
  configuration.style.display = 'none'
  menuHome.classList.add('active')
  menuHistory.classList.remove('active')
  menuConfiguration.classList.remove('active')
}

function toHistory() {
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
    .then((response) => {
      response.text()
      notifyOk()
    })
    .catch((error) => {
      console.log('error', error)
      notifyNotOk()
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

let pastas

window.onload = function getPastas() {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  }
  fetch('http://localhost:8081/folders', requestOptions)
    .then((response) => response.text())
    .then((results) => (pastas = JSON.parse(results)))
    .catch((error) => console.log('error', error))

  pastas.forEach(pasta => {
    document.querySelector('select').innerHTML = `<option>${pasta.nome}</option>`
  })
}

function sendFile() {
  const folderName = document.querySelector('select').value
  let folderCode = ''
  pastas.forEach((element) => {
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
  })
    .then((response) => {
      response.text()
      notifyOk()
    })
    .catch((error) => {
      console.log('error', error)
      notifyNotOk()
    })
}

const fileInput = document.getElementById('file-input');
const fileList = document.getElementById('file-list');

fileInput.addEventListener('change', (event) => {
  fileList.innerHTML = '';
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const li = document.createElement('li');
    li.innerHTML = files[i].name;
    fileList.appendChild(li);
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
