export default {
  data() {
    return {
      mensaje: "Formulario nuevos correciones",
      enEdicion: false,
      correcion: {
        id: "1",
        id_autor: "",
        fecha: "",
        documento_guia: "Seleccione una guía",
        fecha_vencimiento: "",
        organizacion_contenido: null,
        estilo: null,
        aportes_de_obra: null,
        temporalidad: null,
        resultado_final: null,
        acciones: true
      },
      lista_correciones: [],

      opciones_carrera: [
        { value: null, text: "Seleccione una guía", disabled: true },
        { value: "001", text: " guía 1" },
        { value: "002", text: " guía 2" },
      ]
    };
  },
  created() {
    let datosLS = JSON.parse(localStorage.getItem('registroEvDB'));
    if (!datosLS) 
      this.lista_correciones = [];
    else 
      this.lista_correciones = datosLS;
    
    console.log(lista_correciones);
  },
  methods: {
    crearCorrecion() {
      this.correcion.id =
        parseInt(this.lista_correciones[this.lista_correciones.length - 1].id) + 1;

      this.correcion.fecha_vencimiento = this.formatDate()
      this.puntajeTotal();
      this.lista_correciones.push(this.correcion);
      this.correcion = {
        id_autor: "autor",
        id: "",
        fecha: "",
        documento_guia: "Seleccione una guía",
        fecha_vencimiento: "",
        organizacion_contenido: null,
        estilo: null,
        aportes_de_obra: null,
        temporalidad: null,
        resultado_final: null,
        acciones: true
      }
      this.agregarInfoLS();
    },
    get_position(id) {
      return this.lista_correciones.findIndex(
        correcion => correcion.id == id
      );
    },
    eliminar_correcion({ item }) {
      this.lista_correciones.splice(this.get_position(item.id), 1);
      this.agregarInfoLS();
    },
    cargar_correcion({ item }) {
      let auxCorre = this.lista_correciones.find(
        correcion => correcion.id == item.id
      );
      this.enEdicion = true;
      this.correcion = Object.assign({}, auxCorre);

    },
    actualizar_correcion() {
      this.correcion.fecha_vencimiento = this.formatDate()
      this.puntajeTotal();
      this.lista_correciones.splice(this.get_position(this.correcion.id), 1, this.correcion);
      this.correcion = {
        id: "",
        id_autor: "",
        id_propuesta: "",
        fecha: "",
        documento_guia: "Seleccione una guía",
        fecha_vencimiento: "",
        organizacion_contenido: null,
        estilo: null,
        aportes_de_obra: null,
        temporalidad: null,
        resultado_final: null,
        acciones: true
      };
      this.agregarInfoLS();
      this.enEdicion = false
    },
    formatDate() {
      var date = new Date(this.correcion.fecha)
      date.setDate(date.getDate() + 16)
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      return [year, month, day].join('-');
    },
    agregarInfoLS() {
      localStorage.setItem('registroEvDB', JSON.stringify(this.lista_correciones));
    }


    ,
    puntajeTotal() {
      var p1 = parseFloat(this.correcion.organizacion_contenido)
      var p2 = parseFloat(this.correcion.estilo)
      var p3 = parseFloat(this.correcion.aportes_de_obra)
      var p4 = parseFloat(this.correcion.temporalidad)

      this.correcion.resultado_final = p1 * 0.25 + p2 * 0.25 + p3 * 0.25 + p4 * 0.25
    }
  },


};