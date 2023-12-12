<template>
  <ion-page id="main-content">
    <HeaderContainer name="Top Items"/>
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item>
          <ion-select label="Search parameter" placeholder="Select Item">
            <ion-select-option value="track">Track</ion-select-option>
            <ion-select-option value="artist">Artist</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-button id="open-modal" expand="block">Openr</ion-button>
          <p>{{ message }}</p>
          <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
            <ion-header>
              <ion-toolbar>
                <ion-buttons slot="start">
                  <ion-button @click="cancel">Cancel</ion-button>
                </ion-buttons>
                <ion-title>Welcome</ion-title>
                <ion-buttons slot="end">
                  <ion-button :strong="true" @click="confirm">Confirm</ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
              <ion-item>
                <ion-input
                label="Enter your name"
                label-placement="stacked"
                ref="input"
                type="text"
                placeholder="Your name"
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-datetime presentation="month-year"></ion-datetime>
              </ion-item>
            </ion-content>
          </ion-modal>
        </ion-item>
        <ion-item>
          <ion-button @click="getTopTracks">Tracks</ion-button>
        </ion-item>
        <ion-item>
          <ion-button @click="getRefreshToken">token</ion-button>
        </ion-item>
      </ion-list>
      <ion-list>
        <ion-item v-for="item in items">
          Name = {{ item.name }}
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSelect, IonList, IonModal, IonDatetime } from '@ionic/vue';
import { ref } from 'vue';
import { OverlayEventDetail } from '@ionic/core/components'
import HeaderContainer from '@/components/HeaderContainer.vue';
import api from '@/api/api';

let items = ref();

function getRefreshToken() {
  api.auth.getRefreshToken();
};

function  getTopTracks() {
  api.track.getTopTracks().then( response => items.value = response);

};

const message = ref('This modal example uses triggers to automatically open a modal when the button is clicked.');

const modal = ref();
const input = ref();

const cancel = () => modal.value.$el.dismiss(null, 'cancel');

const confirm = () => {
  const name = input.value.$el.value;
  modal.value.$el.dismiss(name, 'confirm');
};

const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
  if (ev.detail.role === 'confirm') {
    message.value = `Hello, ${ev.detail.data}!`;
  }
};

</script>
