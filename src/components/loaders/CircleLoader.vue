<template>
  <div class="circle-loader-container">
  </div>
</template>

<script>
    export default {
        name: 'CircleLoader',
        data: () => {
            return {}   
        },
        computed: {},
        methods: {}
    }
</script>

<style lang="scss">
    @import 'styles/_variables.scss';

    .circle-loader-container {
        animation: 3s infinite linear spin;
        border: solid 3px $green-fade;
        border-top: solid 3px $green;
        border-radius: 50%;
        height: 25px;
        position: relative;
        width: 25px;
    }
    @keyframes spin {
        100% { transform: rotate(360deg); }
    }
    
</style>