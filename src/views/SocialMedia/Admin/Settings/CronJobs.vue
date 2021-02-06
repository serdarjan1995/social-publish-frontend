<template>
    <div class="vuse-content-wrapper">
        <vuse-section-definition
                :title="page"
                icon="dashboard"
        ></vuse-section-definition>
        <v-container >
            <v-sheet color="transparent">
                <template v-if="1">
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-col cols="12" md="12">
                                <span>  <v-icon>mdi-airplane-takeoff</v-icon>
                                    {{$t('CronJobs.post_schedules')}}</span>
                                <v-alert type="black">
                                     <a style="color:White" href="#" target="_blank">curl https://example.com/post/cron?key=5eb6e14877bd5 >/dev/null 2>&1</a>
                                </v-alert>
                            </v-col>
                            <v-col cols="12" md="12">
                                <span>  <v-icon>mdi-facebook</v-icon>
                                    {{$t('CronJobs.facebook_schedules')}}</span>
                                <v-alert type="black">
                                    <a style="color:White" href="#" target="_blank">curl https://example.com/facebook_livestream/cron?key=5eb6e14877bd5 >/dev/null 2>&1</a>
                                </v-alert>
                            </v-col>

                            <v-col cols="12" md="12">
                                <span>  <v-icon>mdi-instagram</v-icon>
                                    {{$t('CronJobs.instagram_schedules')}}</span>
                                <v-alert type="black">
                                    <a style="color:White" href="#" target="_blank">curl https://example.com/instagram_activity/cron?key=5eb6e14877bd5 >/dev/null 2>&1</a>
                                </v-alert>
                            </v-col>
                        </v-col>




                    </v-row>
                </template>


            </v-sheet>
        </v-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                page: "CronJobs",
                breadcrumbs: [
                    {
                        text: "CronJobs",
                        disabled: true,
                    },
                ],
            };
        },
    };
</script>