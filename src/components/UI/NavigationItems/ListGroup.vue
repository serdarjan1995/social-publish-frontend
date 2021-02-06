<template>
  <!-- 1 -->
  <v-list-group :group="group" active-class="act-menu">
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title>
          <v-icon class="mr-1" size="18">{{icon}}</v-icon> {{ title }}
        </v-list-item-title>
      </v-list-item-content>
    </template>
    <template v-for="(subitem, i) in getActive">


      <ListSubGroup
        v-if="Object.keys(subitem).includes('items')"
        v-bind="subitem"
        :key="`${i}-subitems`"
        :toBind="genChildTarget"
      />
      <v-list-item
        v-else
        :to="genChildTarget(subitem)"
        :key="i"
        :href="Object.keys(subitem).includes('href') ? subitem.href : null"
        :disabled="Object.keys(subitem).includes('disabled') && subItem.disabled"
        :target="Object.keys(subitem).includes('target') ? subItem.target : ''"
        ripple
      >
        <ItemIcon :icon="subitem.icon" :title="subitem.title"/>
        <v-list-item-title v-text="subitem.title" class="ml-1"></v-list-item-title>
        <v-badge inline :content="subitem.badge" v-if="subitem.badge"></v-badge>
      </v-list-item>
    </template>
  </v-list-group>
</template>
<script>
import { camel } from "@/utils/helpers"
import ListSubGroup from "./ListSubGroup"
import ItemIcon from "./ItemIcon"
import {navfilter} from "@/utils/helpers"
export default {
  props: {
    group: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
    },
    component: {
      type: String,
      default: "",
    },
  },
  components: {
    ListSubGroup,
    ItemIcon,
  },
  computed:{

    getActive(){
       return this.get_role.filter((item)=>{
        if(typeof item.isActive === 'undefined'){
          return item
        }else if(item.isActive){
            return item
          }else{
            return null
        }
      })
    },
    get_role(){
     return  this.items.filter((item)=>{
        if(typeof item.permission !== 'undefined'){
          if (navfilter(item.permission) !== false){
            return item
          }else{
            return null
          }
        }
     })
    }
  },
  methods: {
    genChildTarget(subItem) {
      if (Object.keys(subItem).includes("href")) return;
      if (this.component !== "") {
        return {
          name: this.component,
          params: {
            section: this.group,
            component: subItem.name,
          },
        };
      }
      if(typeof subItem.social === 'undefined'){
        return { name: `${this.group}/${camel(subItem.name)}` }
      }
      else{
        return {
          path: `/${this.group}/share/${subItem.name}/${subItem.social}` }
      }
    },
  },
};
</script>
