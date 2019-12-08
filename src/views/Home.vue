<template>
  <div class="home">
    <mainComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import mainComponent from "@/components/mainComponent";

export default {
  name: "home",
  components: {
    mainComponent
  }
};
</script>
