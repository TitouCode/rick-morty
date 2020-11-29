<template>
  <div>
    <div class="app-view-container">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'App',
        data: () => {
            return {}
        },
        computed: {},
        methods: {}
    }
</script>

<style lang="scss">
    @import 'styles/main.scss';
</style>