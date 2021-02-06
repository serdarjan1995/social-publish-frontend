<template>
  <v-container  fluid>
    <v-row class="child-flex">
      <v-sheet  class="mx-6 mx-3 neu-glow-inset">
        <v-row class="child-flex">
          <v-col cols="12" sm="6" class="pa-0">
            <v-toolbar >
              <v-container fluid >
                <v-row style="max-height: 30px">
                  <v-text-field
                        :label="$t('FileManager.search')"
                        prepend-icon="mdi-magnify"
                        v-model="searchText"
                        @keyup="$emit('file-manager-search-text-changed', searchText)"
                        dense
                        solo
                  ></v-text-field>
                </v-row>
              </v-container>
            </v-toolbar>
          </v-col>
          <v-col cols="12" sm="6"  class="pa-0">
            <v-toolbar >
              <v-container fluid  >
                <v-row style="max-height: 30px">
                  <v-autocomplete
                        prepend-icon="mdi-filter"
                        v-model="filtersSelected"
                        @change="emitEvent()"
                        :items="getFilters"
                        filled
                        chips
                        :label="$t('FileManager.filter')"
                        multiple
                        outlined
                        dense
                  >
                    <template v-slot:selection="data">
                      <v-chip
                            v-bind="data.attrs"
                            :input-value="data.selected"
                            close
                            small
                            @click="data.select"
                            @click:close="remove(data.item)"
                            >
                        {{ data.item }}
                      </v-chip>
                    </template>
                    <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-item-content v-text="data.item"></v-list-item-content>
                      </template>
                      <template v-else>
                        <v-list-item-content>
                          <v-list-item-title
                                v-html="data.item"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-row>
              </v-container>
            </v-toolbar>
          </v-col>
        </v-row>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        data: () => ({
            filtersSelected: [],
            mappedTranslations: {},
            searchText: ""
        }),
        computed:{
            getFilters(){
                this.mapTranslations();
                return Object.values(this.mappedTranslations);
            }
        },
        props: {
            filters: {
                type: Array,
                default: () => [],
            }
        },
        methods: {
            remove(item) {
                const index = this.filtersSelected.indexOf(item);
                if (index >= 0) this.filtersSelected.splice(index, 1);
                this.emitEvent();
            },
            mapTranslations(){
                this.filters.forEach((filter) => {
                    this.mappedTranslations[filter] = this.$i18n.t('FileManager.'+filter)
                })
            },
            emitEvent(){
                let selectedItems = [];
                let mappedKeys = Object.keys(this.mappedTranslations);
                let mappedValues = Object.values(this.mappedTranslations);
                this.filtersSelected.forEach(
                   (filter) => {
                       for(let i=0; i<mappedValues.length; i++){
                           if(filter ===mappedValues[i]){
                               selectedItems.push(mappedKeys[i])
                           }
                       }
                   }
                )
                this.$emit('file-manager-filters-changed',selectedItems)
            }
        },
    }
</script>

<style scoped>

</style>