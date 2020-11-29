<template>
    <div
        class="full-center bg-full-image"
        :class="`bg-image-${bgImgNumber}`"
    >
        <div class="card-user">
            <CircleLoader
                v-if="isLoading"
                class="loader-container"
            />
            <template v-else>
                <figure class="card-img-container">
                    <img
                        :src="row.image"
                        :alt="row.name"
                        class="card-img"
                    >
                    <div
                        class="card-status"
                        :class="`card-status-${row.status.toLowerCase()}`"
                    >
                        {{ row.status }}
                    </div>
                </figure>
                <div class="card-details">
                    <div class="card-details-title">
                        {{ row.name }}
                        <small class="card-details-small">~ {{ row.species}}</small>
                    </div>

                    <div class="card-details-item">
                        <svg class="text-green" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                            <path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"/>
                        </svg>
                        <div>{{ row.origin.name }}</div>
                    </div>

                    <div class="card-details-tags">
                        <div>Episodes:</div>
                        <div
                            v-for="(episode, i) in row.episode"
                            :key='i'
                            class="tag"
                        >{{ getEpisode(episode) }}</div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import CircleLoader from 'components/loaders/CircleLoader.vue'

    import { ASSETS_PATH } from 'config/config'

    export default {
        name: 'CharacterDetails',
        components: {
            CircleLoader
        },
        data: () => {
            return {
                bgImgNumber: 1,
            }
        },
        computed: {
            ...mapState({
                row: s => s.characters.row,
                isLoading: s => s.characters.isLoading
            })
        },
        created: async function() {
            this.getBackgroundImg();

            if (Object.keys(this.row).length === 0) {
                this.fetchRow();
            }
        },
        methods: {
            /**
             * Fetch Character via Store
             */
            fetchRow: async function() {
                return await this.$store.dispatch('characters/findOne', {
                    id: this.$route.params.id
                });
            },
            /**
             * Get Random Background
             */
            getBackgroundImg() {
                const min = Math.ceil(1);
                const max = Math.floor(10);
                this.bgImgNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            },
            /**
             * Get Episode number from URL
             */
            getEpisode(url) {
                return url.split('/').pop();
            },
        }
    }
</script>

<style lang="scss">
</style>