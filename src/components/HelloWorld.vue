<!--  -->
<template>
  <div class="hello_world">
    1112
  </div>
</template>

<script>
import {ElMessage} from "element-plus"
export default {
  name:'HelloWorld',
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted(){
    ElMessage.warning('111')
  },

  methods: {}
}

</script>
<style  scoped>
</style>
