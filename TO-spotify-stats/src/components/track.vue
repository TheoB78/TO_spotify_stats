<template>
    <ion-card>
        <img v-bind:src="image"/>
        <ion-card-header>
            <ion-card-title>{{ name }}</ion-card-title>
            <ion-card-subtitle>{{ artists }}</ion-card-subtitle>
        </ion-card-header>
        
        <ion-card-content>
            Here's a small text description for the card content. Nothing more, nothing less.
        </ion-card-content>
    </ion-card>
</template>

<script setup lang="ts">

defineProps({
    name: String,
    album: String,
    artists: String,
    image: String,
    })
    
</script>