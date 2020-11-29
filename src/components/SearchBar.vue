<template>
    <div class="search-bar">
        <button
            class="search-bar-toggle"
            @click="toggleSearchBar()"
            title="Search"
        >S</button>

        <input
            v-model="search"
            class="search-bar-input"
            :class="{
                'show': showInput
            }"
            placeholder="Ex: rick"
            @keyup="filter()"
        />
    </div>
</template>

<script>
    export default {
        name: 'SearchBar',
        data: () => {
            return {
                search: '',
                showInput: false,
                timeout: null,
            }   
        },
        methods: {
            /**
             * Filter row 
             */
            async filter() {
                clearTimeout(this.timeout);
                this.timeout = setTimeout(async () => {
                    await this.$store.dispatch('characters/findBy', { name: this.search });
                }, 500);
            },
            /**
             * toggle SearchBar 
             */
            toggleSearchBar() {
                this.showInput = !this.showInput;
            },
        },
    }
</script>