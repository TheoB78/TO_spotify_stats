<template>
    <ion-page>
        <ion-content>
            <h1>Logging In</h1>
        </ion-content>
    </ion-page>
</template>


<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import api from '@/api/api';
import { onMounted } from 'vue';

onMounted(() => {
    api.auth.getAccessToken();
    })
</script>