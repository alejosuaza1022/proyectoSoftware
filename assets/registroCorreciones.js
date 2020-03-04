export default {
    data() {
      return {
        mensaje: "Formulario nuevos correciones",
        enEdicion: false,
        correcion: {
            id: "",
            id_autor:"autor",
            fecha: "",
            documento_guia: "",
            fecha_vencimiento: "",
            organizacion_contenido: 0.0,
            estilo: 0.0,
            aportes_de_obra:0.0,
            temporalidad:0.0,
            resultado_final:0.0,    
            acciones: true
        },
        lista_correciones: [
          {
            id: "1",
            id_autor:"autor",
            fecha: "2020-03-03",
            documento_guia: "vacio",
            fecha_vencimiento: "2020-03-03",
            organizacion_contenido: 10,
            estilo: 10,
            aportes_de_obra:10,
            temporalidad:10,
            resultado_final:5.0,   
            acciones: true
          }
        ],
        
      };
    },
    methods: {
      crearCorrecion() {
        this.lista_correciones.push(this.correcion);
        this.correcion = {
            id_autor:"autor",
            id: "",
            fecha: "",
            documento_guia: "",
            fecha_vencimiento: "",
            organizacion_contenido: 0.0,
            estilo: 0.0,
            aportes_de_obra:0.0,
            temporalidad:0.0,
            resultado_final:0.0,    
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
        
        this.lista_correciones.splice(this.get_position(this.correcion), 1, this.correcion);
        this.correcion = {
            id: "",
            id_autor:"autor",
            id_propuesta: "",
            fecha: "",
            documento_guia: "",
            fecha_vencimiento: "",
            organizacion_contenido: 0.0,
            estilo: 0.0,
            aportes_de_obra:0.0,
            temporalidad:0.0,
            resultado_final:0.0,    
            acciones: true
        };
        //this.enEdicion = false
      }
    }
  };