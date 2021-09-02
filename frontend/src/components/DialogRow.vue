<template>
  <div>
    <v-row>
      <!-- justify: 左右 -->
      <v-col cols="2" class="d-flex justify-center align-center">
        <v-icon size="20px" :color="color">{{ icon }}</v-icon>
      </v-col>
      <v-col cols="10" class="d-flex align-center">
        <slot></slot>
      </v-col>
    </v-row>
    <v-row v-show="append" class="ma-0 pa-0">
      <v-col cols="2" class="d-flex justify-center align-center">
        <!-- <v-icon size="20px" :color="color">{{ icon }}</v-icon> -->
      <!-- <div></div> -->
      </v-col>
      <v-col cols="10" class="d-flex align-center">
        <slot name="append"></slot>
      </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
  name: 'DialogRow',
  props: ['icon', 'color', 'append'],
};
</script>
