<template>
  <div class="container-fluid">
    <h1>Bootsrap Card</h1>
    <div class="row">
      <div class="col-6">
        <card type="success" title="Success" :canCollapse="true">
          <template #default>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <loader color="danger" :loading="true">
              <i class="fas fa-2x fa-sync-alt fa-spin"></i>
            </loader>
          </template>
        </card>
        <card
          title="Warning"
          type="warning"
          style="margin-top:5px;"
          :canClose="true"
        >
          <template #header>
            Titulo
          </template>
          <template #default>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <loader color="danger" :loading="true" />
          </template>
        </card>
        <card
          title="Warning Outline"
          type="warning"
          :outline="true"
          style="margin-top:5px;"
          :canCollapse="true"
          :canClose="true"
        >
          <template #default>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </template>
        </card>
        <card title="Defautl" style="margin-top:5px;">
          <template #default>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </template>
        </card>
      </div>
      <div class="col-6">
        <card
          title="Titulo 2"
          type="primary"
          :canCollapse="true"
          :canClose="true"
        >
          <template #default>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </template>
        </card>
        <card
          title="Titulo 2"
          type="danger"
          style="margin-top:5px;"
          :canCollapse="true"
          :canClose="true"
        >
          <template #default>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <loader color="info" :loading="true" type="grow" />
          </template>
        </card>
        <card
          title="Titulo 2"
          type="primary"
          :outline="true"
          style="margin-top:5px;"
        >
          <template #default>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </template>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/elements/Card.vue';
import Loader from '@/components/elements/Loader.vue';

export default {
  name: 'CardExample',
  components: { Card, Loader },
};
</script>

<style></style>
