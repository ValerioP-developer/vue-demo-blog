import Vue from 'vue'
import { sleep } from '@/lib/util';
import {catJson} from '@/jsonresponse'

const state={
    categories:{}
};
const getters={
    getCategories(state){
      return state.categories;
    },
    getCategory :(state,getters) => (paramkey) =>{
        if(getters.getCategories){
           let found = getters.getCategories.find(el => { return el.key == paramkey})
           if(found){
            return found;
           }else{
            return null;
           }
        }
        return null;
    }
};
const actions={
    fetchCategories(context,payload){
      return sleep(500).then(()=>{
     //   console.log('##############fetchCategories#########################');
     //   console.log(catJson);
        context.commit('setCategories',catJson);
        //save the loaded categories from the 
        console.log(context+payload);
      }).catch((error)=>{
        throw new Error(error);
      })
      
    }
};
const mutations={
   setCategories(state,payload){
    state.categories =payload ;
   },
   setCategory(state,payload){
    Vue.set(state.categories,payload.key,payload);
  }
};

export default {
  namespaced:true,
  state,
  getters,
  actions,
  mutations
}