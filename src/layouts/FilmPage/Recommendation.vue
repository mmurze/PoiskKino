<template>
  <wrapper>
    <h2>Рекомендации:</h2>
    <ul>
      <li
          v-for="item in recommendation"
          :key="item.id"
          @click="toFilm(item)"
      >
        <div class="pic">
          <img :src="item.poster.url" :alt="item.name"/>
        </div>
        <p>{{item.name}}</p>
      </li>
    </ul>
  </wrapper>
</template>

<script>
import {useFilmsStore} from '../../stores/films.js'
import Wrapper from "../../helpers/Wrapper.vue";
export default {
  name: "Recommendation",
  props: ['film'],
  components: {Wrapper},
  setup(){
    const fs = useFilmsStore()
    return {fs}
  },
  computed:{
    recommendation(){
      return this.fs.recommendation(this.film)
    }
  },
  methods:{
    toFilm(item){
      return this.$router.push({name : 'film', params: {id: item.id}})
    }
  },
}
</script>

<style lang="scss" scoped>
.wrapper{
  margin-top: 40px;
  margin-bottom: 40px;
}
ul{
  margin-top: 20px;
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  gap: 20px
}
li{
  min-width: 130px;
  width: 100%;
  max-width: 200px;
}
@media (max-width: 540px) {
  li{
    max-width: 150px;
  }
}
</style>
