<template>
  <ion-page id="main-content">
    <HeaderContainer name="Top Items"/>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-item>
          <ion-select label="Search parameter" placeholder="Select Item">
            <ion-select-option value="track">Track</ion-select-option>
            <ion-select-option value="artist">Artist</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-button @click="getTopTracks()">tracks</ion-button>
        </ion-item>
        <ion-item>
          <ion-button @click="getRefreshToken()">token</ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSelect, IonList } from '@ionic/vue';
import HeaderContainer from '@/components/HeaderContainer.vue';
import api from '../api/api';

export default {
    name: "tab-1",
    
    data() {
        return {};
    },
    methods: {
        getRefreshToken() {
            api.auth.getRefreshToken();
        },
        getTopTracks() {
            api.track.getTopTracks();
        },
        alertHI() {
          alert('hi')
        }
    },
    mounted() {
        api.auth.checkAuthorization();
    },
    components: { 
      HeaderContainer,
      IonPage
    },
}
</script>
