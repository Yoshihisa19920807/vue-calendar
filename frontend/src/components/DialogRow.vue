<template>
  <v-row>
    <!-- justify: 左右 -->
    <v-col cols="2" class="d-flex justify-center align-center">
      <v-icon size="20px" :color="color">{{ icon }}</v-icon>
    </v-col>
    <v-col cols="10" class="d-flex align-center">
      <slot></slot>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DialogRow',
  props: ['icon', 'color'],
};
</script>
