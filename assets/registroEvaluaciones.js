export default {
    data() {
      return {
        mensaje: "Formulario nuevos correciones",
        enEdicion: false,
        correcion: {
            id: "",
            id_autor:"",
            fecha: "",
            documento_guia: "Seleccione una guía",
            fecha_vencimiento: "",
            organizacion_contenido: null,
            estilo: null,
            aportes_de_obra:null,
            temporalidad:null,
            resultado_final:null,    
            acciones: true
        },
        lista_correciones: [
          {
            id: "1",
            id_autor:"autor",
            fecha: "2020-03-03",
            documento_guia: "guía 1",
            fecha_vencimiento: "2020-03-03",
            organizacion_contenido: 10,
            estilo: 10,
            aportes_de_obra:10,
            temporalidad:10,
            resultado_final:5.0,   
            acciones: true
          }
        ],
        opciones_carrera: [
          { value: null, text: "Seleccione una guía", disabled: true },
          { value: "001", text: " guía 1" },
          { value: "002", text: " guía 2" },
        ]
      };
    },
    methods: {
      crearCorrecion() {
        this.correcion.id = parseInt(this.lista_correciones[this.lista_correciones.length-1].id) + 1;
        this.correcion.fecha_vencimiento =  this.formatDate()
        this.puntajeTotal();
        this.lista_correciones.push(this.correcion);
        this.correcion = {
            id_autor:"autor",
            id: "",
            fecha: "",
            documento_guia: "Seleccione una guía",
            fecha_vencimiento: "",
            organizacion_contenido: null,
            estilo: null,
            aportes_de_obra:null,
            temporalidad:null,
            resultado_final:null,    
            acciones: true
        }
      },
      get_position({item}){
        return  this.lista_correciones.findIndex(
            correcion => correcion.id == this.item
          );
      },
      eliminar_correcion({ item }) {
        this.lista_correciones.splice(this.get_position(item), 1);
      },
      cargar_correcion({ item }) {
        let auxCorre = this.lista_correciones.find(
          correcion => correcion.id == item.id
        );
        this.enEdicion = true;
        this.correcion = Object.assign({}, auxCorre);
      },
      actualizar_correcion() {
        this.correcion.fecha_vencimiento =  this.formatDate()
        this.puntajeTotal(); 
        this.lista_correciones.splice(this.get_position(this.correcion), 1, this.correcion);
        this.correcion = {
            id: "",
            id_autor:"",
            id_propuesta: "",
            fecha: "",
            documento_guia: "Seleccione una guía",
            fecha_vencimiento: "",
            organizacion_contenido: null,
            estilo: null,
            aportes_de_obra:null,
            temporalidad:null,
            resultado_final:null,    
            acciones: true
        };
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

    puntajeTotal(){
      var p1 = parseFloat(this.correcion.organizacion_contenido)
      var p2 = parseFloat(this.correcion.estilo)
      var p3 = parseFloat(this.correcion.aportes_de_obra)
      var p4 = parseFloat(this.correcion.temporalidad)

      this.correcion.resultado_final = p1*0.125+p2*0.125+p3*0.125+p4*0.125
    }

    }

    
  };