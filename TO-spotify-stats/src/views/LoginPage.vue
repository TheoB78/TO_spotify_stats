<template>
    <ion-page>
        <ion-header>
            <h2 class="center">
                Login   
            </h2>
        </ion-header>
        <ion-content>
            <div class="center">
                <ion-button @click="requesUserAuth()">Login</ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>


<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import api from '../api/api';

export default {
    name: "login-page",

    data() {
        return {
            
        };
    },

    methods: {
        requesUserAuth() {
            api.auth.requestUserAuth()
        }
    },
    setup() {
        
    }
}
</script>

<style>
    .middle {
        margin-top: 50%;
    }
</style>