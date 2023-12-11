<template>
  <ion-page id="main-content">
    <HeaderContainer name="Recommendations"/>
  </ion-page>
</template>

<script lang="ts">
import { IonPage } from '@ionic/vue';
import HeaderContainer from '@/components/HeaderContainer.vue';

export default {
  name: "tab-2",

  data() {
    return {};
  },
  methods: {

  },
  components: {
    HeaderContainer,
    IonPage
  },
}

</script>
