import Vue from 'vue'

Vue.filter('truncate', (txt, limit) => {
    if (txt && txt.length > limit) {
        txt = txt.substring(0, (limit - 3)) + '...';
    }
    return txt
})