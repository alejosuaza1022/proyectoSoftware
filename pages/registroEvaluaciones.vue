<template>
  <div>
    <b-container>
      <!-- Content here -->

      <h1>Gestión de correción de propuestas</h1>
      <br />

      <b-form action="javascript:void(0)" @submit="crearCorrecion">
        
    
   
        <b-form-group label="fecha de realización" label-for="fecha">
          <b-form-input
            class="form-control"
            v-model="correcion.fechaevaluacion"
            type="date"
            
            v-bind:required="true"
            placeholder="Ingrese la fecha de realización"
            id="fecha"
          />
        </b-form-group>
      

      
          <b-form-group label="organización de contenido" label-for="organizacion_contenido" description="ingrese valor númerico">
            <b-form-input
              class="form-control"
              type="number"
              v-bind:required="true"
              v-model="correcion.organizacion"
              id="organizacion_contenido"
              placeholder="ingrese organizacion contenido"
            />
          </b-form-group>

          <b-form-group label="estilo" label-for="estilo"  description="ingrese valor númerico">
            <b-form-input
              class="form-control"
              type="number"
              v-model="correcion.estilo"
              id="estilo"
              v-bind:required="true"
              placeholder="Ingrese estilo"
            />
          </b-form-group>

          <b-form-group label="aportes de obra" label-for="aportes_de_obra"  description="ingrese valor númerico">
            <b-form-input
              class="form-control"
              type="number"
              v-bind:required="true"
              v-model="correcion.aportesobras"
              id="aportes_de_obra"
              placeholder="Ingrese aportes de obra"
            />
          </b-form-group>

          <b-form-group label="temporalidad" label-for="temporalidad"  description="ingrese valor númerico">
            <b-form-input
              class="form-control"
              type="number"
              v-model="correcion.temporalidad"
              id="temporalidad"
              v-bind:required="true"
              placeholder="Ingrese temporalidad"
            ></b-form-input>
          </b-form-group>
           <b-form-group label="concepto" label-for="concepto"  description="ingrese valor númerico">
            <b-form-input
              class="form-control"
              type="number"
              v-model="correcion.concepto"
              id="temporalidad"
              v-bind:required="true"
              placeholder="Ingrese concepto"
            ></b-form-input>
          </b-form-group>
           <b-form-group label="comentarios " label-for="comentarios">
          <b-form-textarea
            class="form-control"
            type="textbox"
            v-model="correcion.comentarios"
            id="comentarios"
            placeholder="Ingrese comentarios"
          ></b-form-textarea>
        </b-form-group>

  
        <b-button
          type="submit"
          variant="danger"
          class="submit-button"
          v-if="!enEdicion"
        >Evaluar correcion</b-button>

        <b-button
          @click="actualizar_correcion()"
          variant="danger"
          class="submit-button"
          v-else
        >Actualizar Correcion</b-button>
      </b-form>

      <b-table striped hover :items="lista_correciones">
        <template v-slot:cell(acciones)="row" v-if="!mostrar">
          <b-button size="sm" @click="cargar_correcion(row)" class="mr-2 acciones">Modificar</b-button>
          <b-button size="sm" @click="eliminar_correcion(row)" class="mr-2 acciones">Eliminar</b-button>
        </template>
      </b-table>
    </b-container>
  </div>
</template>
<style>
@import "../assets/sizes.css";
input:focus,
select:focus,
option:focus {
  border: 2px solid rgb(238, 36, 36) !important;
  box-shadow: 0 0 0px !important;
}
.buttonM {
  margin-left: 100px;
}
</style>
<script src="../assets/registroEvaluaciones.js"/>