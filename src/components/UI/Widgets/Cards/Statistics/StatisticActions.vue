<template>
    <v-list-item-action style="float:right !important;right:0 !important;" class="compact-action"  @click.prevent>
        <v-menu offset-y>
            <template v-slot:activator="{ on }">
                <v-btn icon small class="text-subtitle-1 pa-0 content-ma-0" v-on="on">
                    <v-icon small>more_vert</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item>
                    <v-list-item-title>
                      {{ $t("Analytical.day") }}
                    </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>
                      {{ $t("Analytical.week") }}
                    </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>
                      {{ $t("Analytical.month") }}
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-list-item-action>
</template>

<script>
    export default {
        name: "StatisticActions"
    }
</script>

<style scoped>

</style>