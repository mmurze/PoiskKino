<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Wrapper",
}
</script>

<style>
.wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto ;
  padding: 0 15px;
  font-size: 18px;
}

/*@media (max-width: 1200px) {
  .wrapper {
    max-width: 1200px;
    font-size: 18px;
  }
}*/

@media (max-width: 720px) {
  .wrapper{
    font-size: 15px;
  }
}

@media (max-width: 540px) {
  .wrapper{
    font-size: 12px;
  }
}

</style>
