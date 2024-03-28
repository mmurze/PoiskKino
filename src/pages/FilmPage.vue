<template>
  <film-card :film="film"/>
  <recommendation :film="film"/>
</template>

<script>
import {useFilmsStore} from '../stores/films.js'
import FilmCard from "../layouts/FilmPage/FilmCard.vue";
import Films from "../layouts/StartPage/Films.vue";
import Recommendation from "../layouts/FilmPage/Recommendation.vue";
export default {
  name: "FilmPage",
  props: ['id'],
  components: {Recommendation, Films, FilmCard},
  setup(){
    const fs = useFilmsStore()
    return {fs}
  },
  data(){
    return{
      film: null,
    }
  },
  watch:{
    film(newFilm){
      localStorage.setItem('currentFilm', JSON.stringify(newFilm))
    },
  },
  beforeRouteLeave(to, from, next){
    localStorage.removeItem('currentFilm')
    next()
  },
  beforeRouteUpdate(to, from, next){
    const id = to.params.id
    this.film = this.fs.films.find(film => film.id === id)
    localStorage.setItem('currentFilm', JSON.stringify(this.film))
    if (!this.film){
      localStorage.removeItem('currentFilm')
      this.$router.push({name: 'home'})
    }
    next()
  },
  created() {
    const data = JSON.parse(localStorage.getItem('currentFilm'))
    if(data == null){
      const id = this.$route.params.id
      this.film = this.fs.films.find(film => film.id === id)
      if (!this.film){
        this.$router.push({name: 'home'})
      }
    }
    else{
      this.film = data
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
