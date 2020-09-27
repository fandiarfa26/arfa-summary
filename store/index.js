import axios from 'axios'

export const state = () => ({
  books: ['Buku A', 'Buku B', 'Buku C', 'Buku D']
})

export const mutations = {
  SET_BOOKS (state, data) {
    state.books = data
  }
}

export const actions = {
  async GET_BOOKS ({ commit }) {
    await axios.get('https://fandiarfa26.pythonanywhere.com/api/data').then((res) => {
      commit('SET_BOOKS', res.data)
    })
  }
}
