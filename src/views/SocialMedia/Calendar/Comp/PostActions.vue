<template>
    <v-card-actions>
        <v-btn
                color="primary"
                @click="openEDialog(item)"
                text
        >
            <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
                color="primary"
                @click="openDDialog(item)"
                text
        >
            <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn
                color="primary"
                text
        >
            <v-icon>mdi-web</v-icon>
        </v-btn>
    </v-card-actions>
</template>
<script>
    export default {
        props: {
            openEDialog: {type: Function},
            openDDialog: {type: Function},
            onGo: String,
            item:Object
        }
    }
</script>