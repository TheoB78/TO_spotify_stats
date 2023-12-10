<template>
    <ion-page>
        <HeaderContainer/>
        <ion-content>
            <h2 class="center">
                Login   
            </h2>
            <div class="center">
                <ion-button @click="requesUserAuth()">Login</ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>


<script lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import HeaderContainer from '@/components/HeaderContainer.vue';
import api from '../api/api';

export default {
    name: "login-page",

    data() {
        return {
            
        };
    },

    methods: {
        requesUserAuth() {
            api.auth.requestUserAuth();
            api.auth.getAccessToken();
        }

    },
    setup() {
        
    },
    components: {
        HeaderContainer,
        IonPage,
    },
}
</script>

<style>
    .middle {
        margin-top: 50%;
    }
</style>