
<template>

  <div class="content">
     <b-modal
      id="modal-2"
      :header-bg-variant="model_header_color"
      :body-text-variant="model_tbody_color"
      header-class="text-center"
      body-class="text-center"
      title="Udem dice"
      ok-only
    >
      <h4>
        {{ message }}
      </h4>
     <template v-slot:modal-footer>
        <b-button
          variant="outline-success"
          size="sm"
          class="float-right"
          @click="aceptar1"
        >
          Aceptar
        </b-button>
      </template>
    </b-modal>
     <b-modal
      id="modal-3"
      header-bg-variant="success"
      body-text-variant="dark"
      header-class="text-center"
      footer-bg-variant="light"
      body-class="text-center"
      title="Udem dice"
      ok-only
    >
      <h4>
       Se ha actualizado su información
      </h4>
      <template v-slot:modal-footer>
        <b-button
          variant="outline-success"
          size="sm"
          class="float-right"
          @click="aceptar2"
        >
          Aceptar
        </b-button>
      </template>
    </b-modal>
    <b-modal
      id="modal-1"
      header-bg-variant="danger"
      body-text-variant="danger"
      header-class="text-center"
      body-class="text-center"
      title="¡ADVERTENCIA!"
    >
      <h4>
        ¿Desea registrarse con estos datos? 
             </h4>

      <p class="my-4"></p>
      <template v-slot:modal-footer>
        <div class="w-200">
          <b-button
            variant="outline-danger"
            size="sm"
            class="float-right"
            @click="aceptar"
          >
            Aceptar
          </b-button>
          <b-button
            variant="outline-danger"
            size="sm"
            class="float-md-right"
            @click="cancelar"
          >
            Cancelar
          </b-button>
        </div>
      </template>
    </b-modal>


    <b-container>
       <b-card class="bcard">
      <!-- Content here -->

      <h1>Formulario de evaluadores</h1>
      <br />

      <b-form action="javascript:void(0)" @submit="mostrar" >
        <b-form-group label="Nombre" label-for="nombre">
          <b-form-input
            class="form-control"
            type="text"
            v-bind:required="true"
            v-model="evaluador.nombre"
            placeholder="Ingrese su nombre"
            id="nombre"
          />
        </b-form-group>
        <b-form-group label="Apellidos" label-for="apellido">
          <b-form-input
            class="form-control"
            v-bind:required="true"
            v-model="evaluador.apellidos"
            placeholder="Ingrese sus apellidos"
            id="apellido"
          />
        </b-form-group>
          
        <b-form-group label="Cédelua" label-for="cc" v-if="!aux">
          <b-form-input
            class="form-control"
            v-bind:required="true"
            v-model="evaluador.idevaluador"
            type="number"
            placeholder="Ingrese su cédula"
            id="cc"
          />
        </b-form-group>
          
        <b-form-group label="Email" label-for="email">
          <b-form-input
            class="form-control"
            v-bind:required="true"
            type="email"
            v-model="evaluador.correo"
            placeholder="Ingrese su email"
            id="email"
          />
        </b-form-group>


        <b-form-group label="Afiliación institucional" label-for="afiliacion">
          <b-form-input
            class="form-control"
            type="text"
            v-bind:required="true"
            v-model="evaluador.afiliacion"
            id="afiliacion"
            placeholder="Ingrese su afiliación institucional"
          />
        </b-form-group>

        <b-form-group label="Cargo" label-for="cargo">
          <b-form-input
            class="form-control"
            type="text"
            v-bind:required="true"
            v-model="evaluador.cargo"
            id="cargo"
            placeholder="Ingrese su cargo"
          />
        </b-form-group>
         <b-form-group label="Clave" label-for="clave"  v-if="!aux">
          <b-form-input
            class="form-control"
            type="password"
            v-bind:required="true"
            
            v-model="evaluador.clave"
            id="clave"
            placeholder="Ingrese su clave"
          />
        </b-form-group>

        <b-button type="submit" variant="danger" v-if="!aux" class="submit-button">Crear evaluador</b-button>
        <b-button  @click="actualizarEvaluador()"  variant="danger" v-else class="submit-button">Actualizar evaluador</b-button>
      </b-form>

      <!-- <b-table striped hover :items="lista_evaluadores" v-if="enEdicion">
        <template v-slot:cell(acciones)="row">
          <b-button size="sm" @click="cargarEstudiante(row)" class="mr-2 acciones" >Modificar</b-button>
          <b-button size="sm" @click="eliminarEstudiante(row)" class="mr-2 acciones" >Eliminar</b-button>
        </template>
      </b-table> -->
       </b-card>
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

<script src="../assets/infoEvaluadores.js"/>