<template>
  <v-container
    class="px-0"
    fluid
  >
    <v-checkbox
      :label="'hoge'"
      :value="value"
      @input="$emit('input', $event)"
    ></v-checkbox>
  </v-container>
</template>

<script>
  export default {
    name: 'CheckBox',
    props: ['value'],
  }
</script>