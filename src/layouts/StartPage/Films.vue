<template>
  <wrapper>
    <ul class="films">
      <li v-for="item in showArray"
          :key="item.id"
          class="film"
          @click="toFilm(item)"
      >
        <div class="pic">
          <img :src="item.poster.url" :alt="item.name"/>
        </div>
        <p>{{item.name}}</p>
      </li>
    </ul>
    <v-pagination
        v-model="page"
        :length="lengthPagination"
        v-if="settingsCSS.pagination"
        class="w-50 d-flex"
        style="margin: 0 auto"
    />
  </wrapper>
</template>

<script>
import Wrapper from "../../helpers/Wrapper.vue";
export default {
  name: "Films",
  components: {Wrapper},
  props: {
    propsArray:{
      type: Array,
      required: true
    },
    perPage:{
      type: Number,
      required: true
    },
    typePage:{
      type: Number
    }
  },
  data(){
    return{
      page: 1
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
    },
    settingsCSS(){
      if(this.typePage === 1){
        return {
          fontSize: "20px",
          width: "270px",
          pagination: true
        }
      }
      else {
        return {
          fontSize: "14px",
          width: "150px",
          pagination: false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.films{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
}
.film{
  display: flex;
  flex-direction: column;
  width: 31%;
  .pic{
    transition: transform 4s ease-in-out 1s;
    :hover{
      transform: scale(105%);
      box-shadow: 0 0 30px rgba(248, 245, 245, 0.15);
    }
  }
  img{
    border-radius: 10px;
    object-fit: cover;
  }
}
@media (min-width: 720px) {
  .film {
    gap: 3px;
  }
}
</style>
