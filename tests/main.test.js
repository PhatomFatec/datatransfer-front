const { toHome, toHistory, notifyOk } = require('../app/main')

// importe as funções a serem testadas
require('../app/main')

describe('toHome', () => {
  test('deve mostrar a seção de home e esconder as outras', () => {
    document.body.innerHTML = `
    <div class="home"></div>
    <div class="configuration"></div>
    <div class="history"></div>
    <div class="menu-home"></div>
    <div class="menu-configuration"></div>
    <div class="menu-history"></div>
    `

    // execute a função que será testada
    toHome()

    const home = document.querySelector('.home')
    const history = document.querySelector('.history')
    const configuration = document.querySelector('.configuration')
    const menuHome = document.querySelector('.menu-home')
    const menuHistory = document.querySelector('.menu-history')
    const menuConfiguration = document.querySelector('.menu-configuration')

    // verifique se o resultado esperado foi alcançado
    expect(home.style.display).toBe('flex')
    expect(history.style.display).toBe('none')
    expect(configuration.style.display).toBe('none')
    expect(menuHome.className).toBe('menu-home active')
    expect(menuHistory.className).toBe('menu-history')
    expect(menuConfiguration.className).toBe('menu-configuration')
  })
})

describe('toHistory', () => {
  test('deve mostrar a seção de histórico e esconder as outras', () => {
    document.body.innerHTML = `
    <div class="home"></div>
    <div class="configuration"></div>
    <div class="history"></div>
    <div class="menu-home"></div>
    <div class="menu-configuration"></div>
    <div class="menu-history"></div>
    `

    // execute a função que será testada
    toHistory()

    const home = document.querySelector('.home')
    const history = document.querySelector('.history')
    const configuration = document.querySelector('.configuration')
    const menuHome = document.querySelector('.menu-home')
    const menuHistory = document.querySelector('.menu-history')
    const menuConfiguration = document.querySelector('.menu-configuration')

    // verifique se o resultado esperado foi alcançado
    expect(home.style.display).toBe('none')
    expect(history.style.display).toBe('flex')
    expect(configuration.style.display).toBe('none')
    expect(menuHome.className).toBe('menu-home')
    expect(menuHistory.className).toBe('menu-history active')
    expect(menuConfiguration.className).toBe('menu-configuration')
  })
})