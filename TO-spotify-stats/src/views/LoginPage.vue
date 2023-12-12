<template>
    <ion-page>
        <HeaderContainer/>
        <ion-content>
            <h2 class="center">
                Login   
            </h2>
            <div class="center">
                <ion-button @click="requesUserAuth">Login</ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>


<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import HeaderContainer from '@/components/HeaderContainer.vue';
import api from '../api/api';

function requesUserAuth() {
    api.auth.requestUserAuth();
}
</script>

<style>
.middle {
    margin-top: 50%;
}
</style>