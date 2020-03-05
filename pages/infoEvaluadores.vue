
<template>

  <div class="content">
    <b-container>
      <!-- Content here -->

      <h1>Formulario de evaluadores</h1>
      <br />

      <b-form action="javascript:void(0)" >
        <b-form-group label="Nombre" label-for="nombre">
          <b-form-input
            class="form-control"
            type="text"
            v-model="evaluador.nombre"
            placeholder="Ingrese su nombre"
            id="nombre"
          />
        </b-form-group>
        <b-form-group label="Apellido" label-for="apellido">
          <b-form-input
            class="form-control"
            v-model="evaluador.apellido"
            placeholder="Ingrese su apellido"
            id="apellido"
          />
        </b-form-group>
          
        <b-form-group label="Cédelua" label-for="cc">
          <b-form-input
            class="form-control"
            v-model="evaluador.cc"
            type="number"
            placeholder="Ingrese su cédula"
            id="cc"
          />
        </b-form-group>
          
        <b-form-group label="Email" label-for="email">
          <b-form-input
            class="form-control"
            type="email"
            v-model="evaluador.email"
            placeholder="Ingrese su email"
            id="email"
          />
        </b-form-group>

        <b-form-group label="Dirección" label-for="direccion">
          <b-form-input
            class="form-control"
            type="text"
            v-model="evaluador.direccion"
            id="direccion"
            placeholder="Ingrese su dirección"
          />
        </b-form-group>

        <b-form-group label="Afiliación institucional" label-for="afiliacion">
          <b-form-input
            class="form-control"
            type="text"
            v-model="evaluador.afiliacion"
            id="afiliacion"
            placeholder="Ingrese su afiliación institucional"
          />
        </b-form-group>

        <b-form-group label="Cargo" label-for="cargo">
          <b-form-input
            class="form-control"
            type="text"
            v-model="evaluador.cargo"
            id="cargo"
            placeholder="Ingrese su cargo"
          />
        </b-form-group>

        <b-form-group label="Publicaciones previas" label-for="publicaciones">
          <b-form-textarea
            class="form-control"
            type="textbox"
            v-model="evaluador.publicaciones"
            id="publicaciones"
            placeholder="Ingrese sus publicaciones anteriores"
          ></b-form-textarea>
        </b-form-group>

        <b-button @click="crearEstudiante()" variant="danger" v-if="!enEdicion" class="submit-button">Crear evaluador</b-button>
        <b-button @click="actualizarEstudiante()" variant="danger" v-else class="submit-button">Actualizar evaluador</b-button>
      </b-form>

      <b-table striped hover :items="lista_evaluadores">
        <template v-slot:cell(acciones)="row">
          <b-button size="sm" @click="cargarEstudiante(row)" class="mr-2 acciones" >Modificar</b-button>
          <b-button size="sm" @click="eliminarEstudiante(row)" class="mr-2 acciones" >Eliminar</b-button>
        </template>
      </b-table>
    </b-container>
  </div>
</template>

<style>
    @import '../assets/sizes.css';
    
    textarea{
        min-height: 100px;
        text-decoration: none;
    }
    
    input:focus, textarea:focus {
    border : 2px solid rgb(238, 36, 36) !important;
    box-shadow: 0 0 0px !important;
 
    }
    
    
</style>

<script src="@/assets/infoEvaluadores.js"/>