import { createRouter, createWebHashHistory } from 'vue-router'
import Connexion from '../views/Connexion.vue'
import RechercheCandidat from '../views/RechercheCandidat.vue'

const routes = [
 
  {
    path:'',
    name:'Connexion',
    component:Connexion
  },

  {
    path:'/recherche/candidat',
    name:'RechercheCandidat',
    component:RechercheCandidat
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
