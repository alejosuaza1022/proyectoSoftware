export default {
    data() {
      return {
        mensaje: "Formulario nuevos evaluadores",
        enEdicion: false,
        evaluador: {
            nombre: "",
            apellido: "",
            cc: "",
            email: "",
            direccion: "",
            afiliacion: "",
            cargo: "",
            publicaciones: "",
            acciones: true
        },
        lista_evaluadores: [],
        
      };
    },
    mounted(){
      this.created()
    },
    methods: {

      crearEstudiante() {
        this.lista_evaluadores.push(this.evaluador);
        this.agregarInfoLS();
        this.evaluador = {
            nombre: "",
            apellido: "",
            cc: "",
            email: "",
            direccion: "",
            afiliacion: "",
            cargo: "",
            publicaciones: "",
            acciones: true
        };
      },
      eliminarEstudiante({ item }) {
        let posicion = this.lista_evaluadores.findIndex(
          evaluador => evaluador.cc == item.cc
        );
        this.lista_evaluadores.splice(posicion, 1);
        this.agregarInfoLS();
      },
      agregarInfoLS() {
        localStorage.setItem('registroEvalu', JSON.stringify(this.lista_evaluadores));
      },  
      cargarEstudiante({ item }) {
        let auxEvalua = this.lista_evaluadores.find(
          evaluador => evaluador.cc == item.cc
        );
        this.enEdicion = true;
        this.evaluador = Object.assign({}, auxEvalua);
      },
      actualizarEstudiante() {
        this.enEdicion = false
        let posicion = this.lista_evaluadores.findIndex(
          evaluador => evaluador.cc == this.evaluador.cc
        );
        this.lista_evaluadores.splice(posicion, 1, this.evaluador);
        this.evaluador = {
            nombre: "",
            apellido: "",
            cc: "",
            email: "",
            direccion: "",
            afiliacion: "",
            cargo: "",
            publicaciones: "",
            acciones: true
        };
        this.agregarInfoLS();
 
      },
      // verificar existencia de datos o creación de intancia nueva
      created() {
        let datosLS = JSON.parse(localStorage.getItem('registroEvalu'));
        if (!datosLS)
          this.lista_evaluadores = [];
        else
          this.lista_evaluadores = datosLS;
      },

    }
  };