<template>
    <div>
        <div class="title-container">
            <h2 class="title-content">Rick &amp; Morty Characters</h2>
            <button
                v-if="!isLoading"
                @click="clickToFetch"
                class="title-button"
            >
                <span class="title-button-title" title="Refresh">R</span>
            </button>
            <CircleLoader
                v-else
                class="loader-container"
            />
        </div>

        <SearchBar />

        <div class="cards-container">
            <div
                class="card"
                v-for="row in rows"
                :key="row.id"
                @click="goToDetails(row)"
            >   
                <figure class="card-img-container">
                    <img
                        :src="row.image"
                        :alt="row.name"
                        class="card-img"
                    >
                </figure>
                <div class="card-title-container" :title="row.name">
                    {{ row.name | truncate(15) }}
                </div>
            </div>
            <div
                v-show="currentPage !== totalPages"
                class="card card-more"
            >
                <div
                    class="button-more"
                    @click="fetchNextRows($event)"
                    title="Load More"
                >
                    &plus;
                </div>
                <div class="mt-4">{{ rows.length }} / {{ totalRows }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    import CircleLoader from 'components/loaders/CircleLoader.vue'
    import SearchBar from 'components/SearchBar.vue'

    import { FIND_ONE_CHARACTER_END } from 'store/characters/constants'

    export default {
        name: 'CharactersList',
        components: {
            CircleLoader,
            SearchBar
        },
        data: () => {
            return {}
        },
        computed: {
            ...mapState({
                rows: s => s.characters.rows,
                isLoading: s => s.characters.isLoading,
                currentPage: s => s.characters.currentPage,
                totalPages: s => s.characters.totalPages,
                totalRows: s => s.characters.totalRows,
            })
        },
        created: async function() {
            await this.fetchRows();
        },
        methods: {
            /**
             * Fetch Characters via Store
             */
            fetchRows: async function() {
                return await this.$store.dispatch('characters/findAll', { page: 1, reset: true });
            },
            /**
             * Fetch Characters via Store
             */
            fetchNextRows: async function(e) {
                return await this.$store.dispatch('characters/findAll', { page: this.currentPage + 1 });
            },
            /**
             * User click to fetch Rows
             */
            clickToFetch: async function() {
                return await this.fetchRows();
            },
            /**
             * Go to CharacterDetails route
             * Load data from row automatically
             */
            goToDetails(row) {
                this.$store.commit(`characters/${FIND_ONE_CHARACTER_END}`, row);
                this.$router.push({
                    name: 'CharacterDetails',
                    params: {
                        id: row.id
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
</style>