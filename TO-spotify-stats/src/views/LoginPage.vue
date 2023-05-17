<template>
    <ion-page>
        <ion-header>
            test
        </ion-header>
        <ion-content>
            <ion-button @click="test()">Login</ion-button>
            <div>Hallo halli</div>
        </ion-content>
    </ion-page>
</template>


<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

export default {
    name: "login-page",

    methods: {
        test() {
           alert('Test') 
        }
    },
    setup() {

    }
}
</script>