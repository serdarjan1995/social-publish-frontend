<template>
    <v-data-table
            :headers="headers"
            :items="items"
            class="neu-glow-inset"
    >
    </v-data-table>
</template>

<script>
    import {Projects} from "@/data/widgets/project";

    export default {
        props: {
            items: {
                type: Array
            },
            headers: {
                type: Array
            }
        },
        computed: {
            projects() {
                return Projects;
            },
        },
    };
</script>
