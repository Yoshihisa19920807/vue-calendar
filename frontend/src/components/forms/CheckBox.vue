<template>
  <!-- <v-container
    class="px-0"
    fluid
  > -->
    <v-checkbox
      :label="label"
      :value="value"
      @change="$emit('input', $event)"
      dense
      hide-details=true
    ></v-checkbox>
  <!-- </v-container> -->
</template>

<script>
  export default {
    name: 'CheckBox',
    props: ['value', 'label'],
  }
</script>
