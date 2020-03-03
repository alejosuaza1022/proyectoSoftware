export default {
    data() {
      return {
        mensaje: "Formulario nuevos evaluadores",
        enEdicion: false,
        evaluador: {
            nombre: "",
            apellido: "",
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
          evaluador => evaluador.id == item.id
        );
        this.lista_evaluadores.splice(posicion, 1);
      },
      cargarEstudiante({ item }) {
        let auxEvalua = this.lista_evaluadores.find(
          evaluador => evaluador.id == item.id
        );
        this.enEdicion = true;
        this.evaluador = Object.assign({}, auxEvalua);
      },
      actualizarEstudiante() {
        let posicion = this.lista_evaluadores.findIndex(
          evaluador => evaluador.id == this.evaluador.id
        );
        this.lista_evaluadores.splice(posicion, 1, this.evaluador);
        this.evaluador = {
            nombre: "",
            apellido: "",
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