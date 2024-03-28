<template>
  <wrapper>
    <ul :class="[typeFilmCard ? 'films_combine' : 'films_horizontal']">
      <li v-for="item in showArray"
          :key="item.id"
          @click="toFilm(item)"
      >
        <film-component :item="item" :type="typeFilmCard"/>
      </li>
    </ul>
    <v-pagination
        v-model="page"
        :length="lengthPagination"
        class="w-50 d-flex"
        style="margin: 0 auto"
    />
  </wrapper>
</template>

<script>
import Wrapper from "../../helpers/Wrapper.vue";
import FilmComponent from "../../components/FilmComponent.vue";
export default {
  name: "Films",
  components: {FilmComponent, Wrapper},
  props: {
    propsArray:{
      type: Array,
      required: true
    },
    perPage:{
      type: Number,
      required: true
    },
    typeFilmCard:{
      type: Boolean,
      required: true
    }
  },
  data(){
    return{
      page: 1
    }
  },
  watch:{
    propsArray(){
      this.page = 1
    }
  },
  methods:{
    toFilm(item){
      return this.$router.push({name : 'film', params: {id: item.id}})
    }
  },
  computed:{
    showArray(){
      return this.propsArray.slice((this.page - 1) * this.perPage, this.page * this.perPage)
    },
    lengthPagination(){
      return Math.ceil(this.propsArray.length / this.perPage)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  margin-top: 20px;
}
.films_combine{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.films_horizontal{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
  gap: 20px;
}
@media (max-width: 540px) {
  .films_combine, .films_horizontal{
    gap: 10px;
  }
}
</style>
