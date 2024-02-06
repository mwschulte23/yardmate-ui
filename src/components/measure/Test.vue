<template>
    <v-app>
      <v-container>
        <!-- Text Field for Search Input -->
        <v-text-field
          label="Search"
          v-model="searchQuery"
          @input="filterOptions"
          @focus="menuOpen = true"
          @blur="menuOpen = false"
          append-outer-icon="mdi-search"
          :class="{ 'menu-active': menuOpen }"
        ></v-text-field>
  
        <v-menu
          v-model="menuOpen"
          :close-on-content-click="false"
          offset-y
          attach
        >
          <template v-slot:activator="{ on, attrs }">
            <!-- Binding the activator directly is not needed here as we manage the menu through v-model -->
          </template>
  
          <v-list dense>
            <v-list-item
              v-for="(item, index) in filteredOptions"
              :key="index"
              @click="selectItem(item)"
            >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>
    </v-app>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const searchQuery = ref('');
  const menuOpen = ref(false);
  const options = ['Apple', 'Banana', 'Orange', 'Mango', 'Grape', 'Watermelon'];
  const filteredOptions = ref([]);
  
  const filterOptions = () => {
    if (searchQuery.value.length > 3) {
      filteredOptions.value = options.filter(option =>
        option.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
      menuOpen.value = filteredOptions.value.length > 0;
    } else {
      filteredOptions.value = [];
      menuOpen.value = false;
    }
  };
  
  const selectItem = (item) => {
    console.log("Selected item:", item);
    // Perform action on item select
    // Close menu upon selection
    menuOpen.value = false;
  };
  </script>
  
  <style>
  .menu-active {
    /* Styles to indicate active state, if needed */
  }
  </style>
  