<template>
  <div action="javascript:void(0)">
    <b-modal
      id="modal-1"
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
    <b-container>
      <b-card class="bcard margin2" >
        <b-form @submit="login" >
          <b-form-group
            id="input-group-1"
            label="Numero de identificación: "
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="evaluador.idevaluador"
              type="text"
              required
              placeholder="ingrese id"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Clave"
            label-for="input-2"
            description="esta información es privada"
          >
            <b-form-input
              id="input-2"
              type="password"
              v-model="evaluador.clave"
              required
              placeholder="ingrese  clave"
            ></b-form-input>
          </b-form-group>
          
        </b-form>
        <b-button block variant="danger" class="acciones" @click="login()"
            >Log in</b-button
          >

          <b-button href="infoEvaluadores?actu=0" block variant="outline-danger"
            >Regitrarme </b-button
          >
      </b-card>
      
    </b-container>
  </div>
</template>

<script src="../assets/loginEvaluador.js" />

<style>
.margin2{
  margin-top:100px ;
}
</style>
