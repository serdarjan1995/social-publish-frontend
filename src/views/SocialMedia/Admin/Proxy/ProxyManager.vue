<template>
    <div class="vuse-content-wrapper">
        <vuse-section-definition :title="page" icon="dashboard"></vuse-section-definition>
        <v-container fluid class="fill-height">
            <inner-base-layout baseLayerClass="neu-glow-inset" innerContainerClass="transparent" class="ml-3 mr-3" >
                <template v-slot:header>
                    <div>
                        <proxy-toolbar @open-create-dialog="createDialog=true"
                           name="proxy"
                           :drawer="drawer"
                           :onUnselectAll="unselectAll"
                           :search="search"
                           :onSelectAll="selectAll"
                        />
                    </div>
                    <v-divider></v-divider>
                </template>
                <template v-slot:content>
                    <v-sheet height="100%" color="transparent" v-if="myProxyList.length">
                        <v-list two-line flat class="transparent" :style="{ 'overflow-x': 'hidden' }">
                            <template>
                                <proxy-row
                                  :selectedAction="selectedAction"
                                  :onEdit="edit"
                                  :items="filteredProxies"
                                  :headers="headers"
                                >
                                </proxy-row>
                            </template>
                        </v-list>
                    </v-sheet>
                </template>
            </inner-base-layout>
        </v-container>
        <show-dialog @close="showDialogClose" v-if="showDialog" :item="showDialogItem"/>
        <create-dialog v-if="createDialog" :myProxyList="myProxyList" @create="create" @close="createDialog=false"/>
    </div>

</template>
<script>
    import InnerBaseLayout from "@/layouts/Inner/Layout"
    import ProxyRow from "@/views/SocialMedia/Admin/Proxy/component/ProxyRow"
    import ProxyToolbar from "@/views/SocialMedia/Admin/Proxy/component/ProxyToolbar";
    import ShowDialog from "@/views/SocialMedia/Admin/Proxy/component/ShowDialog";
    import CreateDialog from "@/views/SocialMedia/Admin/Proxy/component/CreateDialog";
    import { filter } from "lodash";
    import EventBus from "@/plugins/event-bus";

    export default {
        data() {
            return {
                selectedStatus: false,
                headers: [
                    { text: "", value: "" },
                    { text: "Proxy Name ", value: "proxy_name" },
                    { text: "Location", value: "location", align: "location" },
                    { text: "Status", value: "status", align: "status" },
                ],
                page: "ProxyManager",
                breadcrumbs: [
                    {
                        text: "ProxyManager",
                        disabled: true,
                    },
                ],
                myProxyList:[],
                namespace: "Applications",
                date: null,
                drawer: true,
                search: '',
                createDialog:false,
                showDialog: false,
                showDialogItem:null,
                selectedProxy:false
            };

        },
        components: {
            InnerBaseLayout,
            ProxyToolbar,
            ShowDialog,
            ProxyRow,
            CreateDialog
        },
        methods:{
            selectedAction(data) {
              console.log("selected actino click", this.myProxyList)
              this.selectedStatus = data
            },
            showDialogClose() {
                this.showDialogItem = null;
                this.showDialog = false;
            },
            edit(item) {
                this.showDialogItem = item;
                this.showDialog=true;
            },
            async create(form) {
                // axios.post(url,form)
                await new Promise((r) => {
                    setTimeout(() => {
                        r(form)
                    },2000)
                })
                this.createDialog = false;
            },
            selectAll() {
              console.log("selectAll", this.selectedProxy)
                if (!this.selectedProxy) {
                    this.myProxyList.forEach((element) => {
                        element.selected = true;
                    });
                }
            },
            unselectAll() {
              console.log("unselectAll", this.selectedProxy)
              if (!this.selectedProxy) {
                    this.myProxyList.forEach((element) => {
                        element.selected = false;
                    });
                }
            },
        },
        computed: {
            selectedProxies() {
                return filter(this.myProxyList, (element) => element.selected);
            },
            unselectedProxies() {
                return filter(this.myProxyList, (element) => !element.selected);
            },
            hasContentSlot() {
                return !!this.$slots["content"];
            },
            filteredProxies(){
                const myProxyList = this.myProxyList.map((list) => {
                    return { ...list };
                });
                return myProxyList.filter((items) =>
                    items.proxy_name.toLowerCase().includes(this.search.toLowerCase())
                );
            }

        },
        mounted(){
            EventBus.$on('changeSearchProxyToolbar', newValue => {
                this.search = newValue;
            });
        },
        created() {
          this.$store.dispatch("proxy_manager/getProxy", this.form).then((response) => {
            this.myProxyList = response.data.get_proxy;
            console.log("get proxy response", response)
          })
          .catch((e) => {
            console.log(e)
          })
        },
        watch: {
          selectedProxy(data){
            console.log(data)
          },
          selectedStatus(data){
            console.log("selected status : " + data)
          }
        }
    };
</script>
