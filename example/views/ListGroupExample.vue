<template>
  <div class="container-fluid">
    <h1>Bootstrap List group</h1>
    <div class="row">
      <div class="col-6">
       <ListGroupWrapper>
         <ListGroupItem :active="true">
            Elemento 1 active
         </ListGroupItem>
         <ListGroupItem :disabled="true">
            Elemento 2 disabled
         </ListGroupItem>
         <ListGroupItem to="/">
            Router Link
         </ListGroupItem>
         <ListGroupItem href="/">
            Href Link
         </ListGroupItem>
       </ListGroupWrapper>
      </div>
    </div>
  </div>
</template>

<script>
import ListGroupWrapper from '@/components/elements/ListGroup/Container.vue';
import ListGroupItem from '@/components/elements/ListGroup/Item.vue';

export default {
  name: 'ListGroupExample',
  components: { ListGroupWrapper, ListGroupItem },
};
</script>

<style></style>
