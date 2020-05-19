<template>
  <div>
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
    </b-modal>
        <b-modal
      id="modal-3"
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
         <template v-slot:modal-ok>
          <b-button
            variant="outline-danger"
            size="sm"
            class="float-right"
            @click="aceptar1"
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
        {{message}}
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

    <b-container v-if="eval">
      <!-- Content here -->
      <b-card class="bcard">
      <h1>Gestión de correción de propuestas</h1>
      <br />

      <b-form action="javascript:void(0)" @submit="abrir_model_evl">
        <b-form-group
          label="organización de contenido"
          label-for="organizacion_contenido"
          description="ingrese valor númerico"
        >
          <b-form-input
            class="form-control"
            type="number"
            v-bind:required="true"
            v-model="correcion.organizacion"
            id="organizacion_contenido"
            placeholder="ingrese organizacion contenido"
          />
        </b-form-group>

        <b-form-group
          label="estilo"
          label-for="estilo"
          description="ingrese valor númerico"
        >
          <b-form-input
            class="form-control"
            type="number"
            v-model="correcion.estilo"
            id="estilo"
            v-bind:required="true"
            placeholder="Ingrese estilo"
          />
        </b-form-group>

        <b-form-group
          label="aportes de obra"
          label-for="aportes_de_obra"
          description="ingrese valor númerico"
        >
          <b-form-input
            class="form-control"
            type="number"
            v-bind:required="true"
            v-model="correcion.aportes_obras"
            id="aportes_de_obra"
            placeholder="Ingrese aportes de obra"
          />
        </b-form-group>

        <b-form-group
          label="temporalidad"
          label-for="temporalidad"
          description="ingrese valor númerico"
        >
          <b-form-input
            class="form-control"
            type="number"
            v-model="correcion.temporalidad"
            id="temporalidad"
            v-bind:required="true"
            placeholder="Ingrese temporalidad"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="concepto"
          label-for="concepto"
          description="ingrese valor númerico"
        >
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
          >Evaluar correcion</b-button
        >

    
      </b-form>
      </b-card>
    </b-container>
    <b-container v-else>
      <h1>Gestión de correción de propuestas</h1>
      <div>
        <div>
          <b-card
            img-src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2 card-pdf"
          >
            <b-card-text>
              por favor adjunte su pdf correción aquí
            </b-card-text>

            <b-form-file
              accept=".pdf"
              class="upload-file"
              v-model="archivo"
              :state="Boolean(archivo)"
              placeholder="Seleccione su archivo..."
              drop-placeholder="Drop file here..."
            ></b-form-file>

            <b-button
              variant="outline-danger"
              @click="abrir_model_retro"
              class="upload-file margin"
              >Cargar Documento</b-button
            >
          </b-card>
        </div>
      </div>
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
.bcard{margin-top: 30px;
  background-color: white;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: stretch;
  -webkit-box-shadow: -7px 7px 26px 0px rgba(150, 150, 150, 1);
  -moz-box-shadow: -7px 7px 26px 0px rgba(150, 150, 150, 1);
  box-shadow: -7px 7px 26px 0px rgba(150, 150, 150, 1);
}
</style>
<script src="../assets/registroEvaluaciones.js" />
