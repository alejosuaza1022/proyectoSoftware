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
        lista_evaluadores: [
          {
            nombre: "Juan",
            apellido: "Mejia",
            cc: "110293",
            email: "mejiajuan@gmail.com",
            dirrecion: "cr 12 # 38-14",
            afiliacion: "UdeA",
            cargo: "Profesor",
            publicaciones: "libro1:descripcion. libro2:descripcion",
            acciones: true
          }
        ],
        
      };
    },
    methods: {
      crearEstudiante() {
        this.lista_evaluadores.push(this.evaluador);
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
 
      }
    }
  };