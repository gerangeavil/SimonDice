const verde = document.getElementById('verde')
const rojo = document.getElementById('rojo')
const azul = document.getElementById('azul')
const amarillo = document.getElementById('amarillo')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10
let tiempo
let contadorTiempo

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    this.iniciaTiempo()
    setTimeout(this.siguienteNievel(), 500)
  }

  inicializar() {
    this.elegirColor = this.elegirColor.bind(this)
    this.siguienteNievel = this.siguienteNievel.bind(this)
    this.toggleBtnEmpezar()
    this.puntaje = 0
    this.nivel = 1
    this.colores = {
      verde,
      rojo,
      azul,
      amarillo
    } 
  }

  iniciaTiempo() {
    tiempo = 1
    contadorTiempo =setInterval(function(){
      document.getElementById('tiempo').innerHTML = tiempo
      tiempo++
    }, 1000)
  }

  detieneTiempo() {
    clearInterval(contadorTiempo)
  }

  toggleBtnEmpezar() {
    if (btnEmpezar.classList.contains('hide')) {
      btnEmpezar.classList.remove('hide')
    } else {
      btnEmpezar.classList.add('hide')
    }
  }
  
  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  siguienteNievel() {
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregarEventoClick()
    this.puntaje = this.nivel * 5
    document.getElementById('nivel').innerHTML = this.nivel
    document.getElementById('puntaje').innerHTML = this.puntaje
  }

  transformarNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return 'verde'
      case 1:
        return 'rojo'
      case 2:
        return 'azul'
      case 3:
        return 'amarillo'
    }
  }

  transformarColorANumero(color) {
    switch (color) {
      case 'verde':
        return 0
      case 'rojo':
        return 1
      case 'azul':
        return 2
      case 'amarillo':
        return 3
    }
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i])
      setTimeout(() => this.iluminarColor(color), 900 * i)
    }
  }

  iluminarColor(color){
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 350)
  }

  apagarColor(color) {
    this.colores[color].classList.remove('light')
  }

  agregarEventoClick() {
    this.colores.verde.addEventListener('click', this.elegirColor)
    this.colores.rojo.addEventListener('click', this.elegirColor)
    this.colores.azul.addEventListener('click', this.elegirColor)
    this.colores.amarillo.addEventListener('click', this.elegirColor)
  }

  eliminarEventosClick() {
    this.colores.verde.removeEventListener('click', this.elegirColor)
    this.colores.rojo.removeEventListener('click', this.elegirColor)
    this.colores.azul.removeEventListener('click', this.elegirColor)
    this.colores.amarillo.removeEventListener('click', this.elegirColor)
  }

  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColorANumero(nombreColor)
    this.iluminarColor(nombreColor)

    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++
      if (this.subnivel === this.nivel) {
        this.nivel++
        this.eliminarEventosClick()
        if (this.nivel === (ULTIMO_NIVEL +1)) {
          this.ganoElJuego()
        } else {
          setTimeout(this.siguienteNievel, 1500)
        }
      }
    } else {
      this.perdioElJuego()
    }
  }

  ganoElJuego() {
    this.detieneTiempo()
    swal('Simón dice:', 'Felicitaciones Ganaste el Juego', 'success')
      .then(this.inicializar)
  }

  perdioElJuego() {
    this.detieneTiempo()
    swal('Simón dice:', 'Lo lamentamos, perdiste el Juego :(', 'error')
      .then(() => {
        this.eliminarEventosClick()
        this.inicializar()
      })
  }
}

function empezarJuego() {
  window.juego = new Juego()
}
