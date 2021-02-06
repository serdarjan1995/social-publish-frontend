<template>
  <v-card class="width-100">
    <v-card-title> {{ tableTitle }}
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="$t('DataTables.search')"
          single-line
          hide-details
          @input="filterSearch"
      ></v-text-field>
    </v-card-title>

    <v-data-table
        :headers="headers"
        :items="permissionList"
        :search="search"
        :sort-desc="[false, true]"
        :items-per-page="itemsPerPage"
        hide-default-footer
        multi-sort
        class="elevation-1"
    >
      <template v-slot:header.name="{ header }">
              <span v-if="header.i18n">
                {{ $t(header.i18n) }}
              </span>
        <span v-else>
                {{ header.text }}
              </span>
      </template>
      <template v-slot:item.actions="{item}" v-if="showActions">
        <v-icon
            small
            class="mr-2"
            @click="editFunction(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            small
            @click="deleteFunction(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <template v-if="lastPage > 1">
      <div class="text-center pt-2">
        <v-pagination v-model="currentPage"
                      :length="lastPage"
                      @input="getDataFromApi"></v-pagination>
      </div>
    </template>
  </v-card>
</template>

<script>
export default {
  props: {
    tableTitle: {
      type: String,
      default: '',
    },
    headers: {
      type: Array,
    },
    itemsPerPage: {
      type: Number,
      required: true,
      default: 5
    },
    showActions: {
      type: Boolean,
      default: false
    },
    deleteFunction: {
      type: Function,
    },
    editFunction: {
      type: Function,
    },
    filterSearch: {}
  },
  data() {
    return {
      search: '',
      page: 1,
      totalItems: 0,
      items: [],
      pageCount: 0,
      current_page: 1,
      last_page: 1
    }
  },
  methods: {
    getDataFromApi(page) {
      this.$store.dispatch('permissions/getPermissionList', page)
    },
  },
  computed:{
    currentPage:{
      get(){
        return this.$store.state.permissions.current_page
      },
      set(newValue){
        this.$store.state.permissions.current_page = newValue
      }
    },
    lastPage:{
      get(){
        return this.$store.state.permissions.last_page
      },
      set(newValue){
        this.$store.state.permissions.last_page = newValue
      }
    },
    permissionList:{
      get(){
        return this.$store.state.permissions.permissionList
      },
      set(newValue) {
        this.$store.state.permissions.permissionList.data = newValue
      }
    }
  },
  created() {
    this.getDataFromApi(1)
  }
}
</script>