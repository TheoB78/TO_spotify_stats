<template>
  <ion-page>
    <HeaderContainer name="Recommendations"/>
    <ion-content>
      <ion-button @click="test">
        blabla
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage } from '@ionic/vue';
import HeaderContainer from '@/components/HeaderContainer.vue';
import api from '@/api/api';

function test () {
  api.auth.getRefreshToken();
}



</script>
