import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import CharactersList from 'views/characters/CharactersList.vue'
import CharacterDetails from 'views/characters/CharacterDetails.vue'

export const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/characters'
        }, {
            path: '/characters',
            name: 'CharacterList', 
            component: CharactersList
        }, {
            path: '/characters/:id',
            name: 'CharacterDetails',
            component: CharacterDetails
        }
    ]
})