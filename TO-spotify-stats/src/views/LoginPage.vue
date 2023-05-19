<template>
    <ion-page>
        <ion-header>
            test
        </ion-header>
        <ion-content>
            <div>harrow</div>
            <ion-button @click="requesUserAuth()">Login</ion-button>
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
            alert(api.auth.getCodeFromUrl())
        }
    },
    setup() {
        
    }
}
</script>