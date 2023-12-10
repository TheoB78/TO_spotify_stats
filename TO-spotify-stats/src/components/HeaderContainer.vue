<template>
    <ion-header>
        <ion-toolbar mode="ios">
            <ion-title>{{ name }}</ion-title>
            <ion-buttons slot="end">
                <ion-button id="logOutButton">
                    <ion-icon slot="start" :icon="logOutOutline"/>
                </ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-alert
    trigger="logOutButton"
    header="Log Out?"
    message="Are you sure?"
    :buttons="alertButtons"
    ></ion-alert>    
</template>

<script setup lang="ts">
import router from '@/router';
import { IonAlert, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonIcon} from '@ionic/vue'
import { logOutOutline } from 'ionicons/icons';

defineProps({
    name: String,
});
const alertButtons = [
{
    text: 'Cancel',
    role: 'cancel',
    handler: () => {
        console.log('Alert canceled');
    },
},
{
    text: 'OK',
    role: 'confirm',
    handler: () => {
        console.log('Alert confirmed');
        localStorage.clear();
        router.push('/login');
    },
},
];
const logResult = (ev: CustomEvent) => {
    console.log(`Dismissed with role: ${ev.detail.role}`);
};
function logOut() {
    alert('hi')
};
</script>