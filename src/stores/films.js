import {defineStore} from 'pinia'

export const useFilmsStore = defineStore('films', {
	state: () => {
		return {
			films: [],
			currentFilm: null,
		}
	},
	getters: {},
	actions: {
		recommendation(film){
			let recFilm = this.films.filter(item => {
				return item.type === film.type
					&& (film.rating.kp >= (item.rating.kp*0.6) && film.rating.kp <= (item.rating.kp*1.4))
					&& (film.year > (item.year - 5) && film.year < (item.year + 5))
					&& film.id !== item.id
			}).sort(() => 0.5 - Math.random()).splice(0, 5)
			if (recFilm.length === 0){
				recFilm = this.films.filter(item => {
					return (film.rating.kp >= (item.rating.kp*0.5) && film.rating.kp <= (item.rating.kp*1.5))
						&& (film.year > (item.year - 10) && film.year < (item.year + 10))
						&& film.id !== item.id
				}).sort(() => 0.5 - Math.random()).splice(0, 5)
			}
			return recFilm
		}
	}
})
