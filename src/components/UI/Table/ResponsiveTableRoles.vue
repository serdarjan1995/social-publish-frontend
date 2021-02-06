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
        :items="arrdata"
        :search="search"
        :sort-desc="[false, true]"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        multi-sort
        @page-count="pageCount = $event"
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
    <template v-if="pageCount > 1">
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
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
    arrdata: {
      type: Array,
      required: true
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
    }
  }
}
</script>