import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import category from './category.module'
import post from './post.module'

export default new Vuex.Store({

  
  modules: {
    category,
    post
  }
})
