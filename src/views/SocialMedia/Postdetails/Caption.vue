<template>
  <div class="vuse-content-wrapper">
    <v-breadcrumbs :items="breadcrumbs_items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-btn class="float-right mt-10" @click="openDialog" color="indigo" dark>
      <v-icon dark>add</v-icon>
      {{$t('Caption.addCaption')}}
    </v-btn>
    <vuse-section-definition
        :title="page"
        icon="dashboard"
    ></vuse-section-definition>


    <v-container fluid>
      <v-row>
        <v-col sm="3" v-for="(item, index) in textList" :key="index">
          <v-card>
            <v-list-item two-line>
              <v-list-item-content>
                <v-text-field :placeholder="$t('Caption.title')" v-model="item.title" :value="item.title" required/>
                <v-textarea class="outlined" :placeholder="$t('Caption.description')" v-model="item.description" height="75" :value="item.description" required/>
                <v-text-field :placeholder="$t('Caption.tags')" v-model="item.tags" :value="item.tags" required/>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-btn class="ma-1" tile x-small outlined size="15" @click="updateItem(item)" color="success">
                {{$t('Global.update')}}
              </v-btn>
              <v-btn @click="openDeleteDialog(item)" class="ma-1" tile x-small outlined size="15" color="error"
              >{{$t('Global.delete')}}
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <template>
      <v-row justify="center">
        <v-form>
          <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{$t('Caption.addCaption')}}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                        :label="$t('Caption.title')"
                        type="text"
                        v-model="title"
                        required
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                        :label="$t('Caption.description')"
                        type="text"
                        v-model="description"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                        :label="$t('Caption.tags')"
                        type="text"
                        v-model="tags"
                        required
                    ></v-text-field>
                  </v-col>

                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="ma-2" tile outlined color="error" @click="dialog = false"
              >{{$t('Caption.close')}}
              </v-btn
              >
              <v-btn class="ma-2" tile outlined color="success" @click="addCaption">
                {{$t('Global.Add')}}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        </v-form>
      </v-row>
    </template>
    <delete-dialog :delete-dialog="deleteDialog" v-if="deleteDialog" :onDelete="deleteFunction" :postDeleteItem="this.dialogItem"></delete-dialog>
  </div>
</template>
<script>

import EventBus from "@/plugins/event-bus";
import DeleteDialog from "@/views/SocialMedia/Postdetails/Components/DeleteDialog";

export default {
  components: {
    DeleteDialog
  },
  data() {
    return {
      menuItems: [
        {
          title: "Edit",
          id:   0,
        },
        {
          title: "Delete",
          id:   1,
        },
      ],
      page: "Caption",
      dataStorageStatus: 33,
      breadcrumbs_items: [
        {
          text: 'Post Details',
          disabled: true,
          href: '.breadcrumbs_dashboard',
        },
        {
          text: 'Caption',
          disabled: true,
          href: '/post_details/addCaptioncaption',
        }
      ],
      valid: true,
      title: '',
      description: '',
      tags: '',
      searchKey: '',
      dialog: false,
      dialogItem: null,
      deleteDialog: false
    };
  },
  mounted(){
    EventBus.$on('closeDeleteDialog', () => {
      this.deleteDialog=false;
    })
  },
  methods: {
    updateItem(item){
      const obj = {
        id: item.id,
        title: item.title,
        description: item.description,
        tags: item.tags
      }
      this.$store.dispatch("text_templates/updateText", obj)
    },
    deleteFunction(item){
      const obj = {
        id: item.id
      }
      this.$store.dispatch("text_templates/deleteText", obj)
      this.deleteDialog=false;
    },
    openDeleteDialog(item){
      this.dialogItem=item;
      this.deleteDialog=true;
    },
    openDialog(){
      this.dialog = true;
    },
    addCaption() {
      const obj = {
        title: this.title,
        description: this.description,
        tags: this.tags
      }
      this.$store.dispatch("text_templates/createText", obj)
    }
  },
  computed:{
    textList:{
      get(){
        return this.$store.state.text_templates.textList
      },
      set(newValue) {
        this.$store.state.text_templates.textList = newValue
      }
    }
  },
  created() {
    this.$store.dispatch("text_templates/getTextList")
  }
};
</script>
