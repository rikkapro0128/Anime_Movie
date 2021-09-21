<template>
    <div class="detail-ani">
        <h1 class=""><router-link class="tl-ani tl-ani-hov" to="/admin/danh-sach-anime">Danh Sách Anime</router-link> / <span class="tl-ani">{{ detailAnimeData.name }}</span></h1>
        <div class="detail-ani__name">
            <input class="box-sd" type="text" v-model="detailAnimeData.name" :readonly="!state.editName">
            <div v-if="!state.editName" class="overlay" @click="state.editName = true"><span>Chỉnh sửa tên</span></div>
            <button class="btn box-sd" @click="saveInfo(detailAnimeData.name, 'name')" v-else>Lưu</button>
        </div>
        <div class="detail-ani__wrap">
            <div class="detail-ani__wrap--img box-sd">
                <img v-if="detailAnimeData.image" :src="`http://localhost:5000${detailAnimeData.image}`" :alt="detailAnimeData.name">
                <img v-if="imageLocal" :src="imageLocal" :alt="'load'">
                <div class="no-img" @mouseenter="changeText" @mouseleave="changeText">
                    <span v-if="!textImage.state">{{ !detailAnimeData.image && !imageLocal ? 'Không có ảnh!' : 'Thay đổi!'}}</span>
                    <span v-else>{{ textImage.message }}</span>
                    <label for="load-image"></label>
                    <input type="file" id="load-image" accept="image/*" :multiple="false" hidden @change="getFileImage($event)">
                </div>
                <span v-if="stateButtonSaveImage" @click="sendImage()">Lưu ảnh</span>
            </div>
            <div class="detail-ani__wrap--desc box-sd">
                <span>Mô tả</span>
                <textarea v-model="detailAnimeData.desc" :readonly="!state.editDesc" spellcheck="false"></textarea>
                <div v-if="!state.editDesc" @click="state.editDesc = true" class="overlay"><span>Chỉnh sửa mô tả!</span></div>
                <button v-else @click="saveInfo(detailAnimeData.desc, 'desc')" class="btn">Lưu</button>
            </div>
        </div>
        <div class="detail-ani__add-movie">
            <h1>Để thêm video Admin vui lòng thêm video vào thư mục
                <span>"{{ pathDirStorage.split('\\\\').join('\\') }}"</span>
            </h1>
            <input type="file" ref="inputPathFileVideo" accept="video/*" :multiple="true" @change="getPathFile($event)" hidden>
            <button class="btn box-sd" @click="$refs.inputPathFileVideo.click()">Thêm Video</button>
        </div>
        <table>
            <tr>
                <th>STT</th>
                <th>Thời gian đăng</th>
                <th>Tập</th>
                <th>Xoá</th>
            </tr>
            <tr v-for="(video, index) in detailAnimeData.videos" :key="index">
                <td>{{ index }}</td>
                <td>{{ video.createAt }}</td>
                <td>{{ video.esp }}</td>
                <td class="hov-remove" :id_video="video._id" @click="removeVideo(video.esp, video._id)"><i class="far fa-trash-alt"></i></td>
            </tr>
        </table>
    </div>
</template>

<script>
import { ref, reactive, } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
    name: 'Detail Anime',
    setup() {
        const route = useRoute();
        const store = useStore();
        const stateButtonSaveImage = ref(false);
        const imageLocal = ref('');
        const labelAnime = ref(route.params.label_anime);
        const detailAnimeData = ref({});
        const fileImage = ref({});
        const pathDirStorage = ref('');
        const nameVideo = ref(null);
        const textImage = reactive({
            message: 'Tải ảnh',
            state: false,
        });
        const state = reactive({
            editDesc: false,
            editName: false,
        });
        (async () => {
            await store.dispatch('getMovieByLabel', { label: labelAnime.value, options: { esp: 'all' } });
            pathDirStorage.value = await store.dispatch('getPathDirStorage');
            detailAnimeData.value = store.state.movie;
        })();
        return {
            state,
            store,
            fileImage,
            nameVideo,
            textImage,
            imageLocal,
            labelAnime,
            pathDirStorage,
            detailAnimeData,
            stateButtonSaveImage,
        }
    },
    methods: {
        changeText() {
            this.textImage.state = !this.textImage.state;
        },
        getFileImage(event) {
            this.fileImage = event.target.files[0];
            this.imageLocal = URL.createObjectURL(event.target.files[0]);
            this.detailAnimeData.image = '';
            this.stateButtonSaveImage = true;
        },
        async sendImage() {
            const state = await this.$store.dispatch('sendImage', {
                fieldImage: 'image', 
                url: `${process.env.VUE_APP_HOST_SERVER}/admin/up-img-mv/options?label_ani=${this.labelAnime}`,
                file: this.fileImage,
            });
            if(state) { 
                this.imageLocal = '';
                this.stateButtonSaveImage = !this.stateButtonSaveImage;
                this.$router.go(0);
            }
        },
        async getPathFile(event) {
            const arrayPath = [];
            for(const file of event.target.files) { arrayPath.push(file.name); }
            const state = await this.$store.dispatch('sendNameVideo', {
                url: `${process.env.VUE_APP_HOST_SERVER}/admin/post-video?label_ani=${this.labelAnime}`,
                pathVideo: arrayPath,
            });
            event.target.value = null;
            if(state) { this.reLoadData(); }
        },
        async removeVideo(esp, id_esp) {
            const result = await this.$store.dispatch('removeVideoByLabel', { label: this.labelAnime, options: { esp: esp, id_esp: id_esp }});
            if(result) { this.reLoadData(); } 
        },
        async saveInfo(value, type) {
            const result = await this.$store.dispatch('updateMovie', { label: this.labelAnime, options: { data: value, type } });
            if(result) { 
                this.reLoadData();
                this.state.editDesc = false;
                this.state.editName = false;
            } 
        },
        async reLoadData() {
            await this.$store.dispatch('getMovieByLabel', { label: this.labelAnime, options: { esp: 'all' } });
            this.detailAnimeData = this.store.state.movie;
        },
    }
}
</script>

<style lang="scss" scoped>
    .detail-ani {
        padding: 0.4rem;
        &__name {
            position: relative;
            input {
                width: 100%;
                display: block;
                font-size: 1.4rem;
                color: $base-color;
                margin: 0.8rem 0;
                outline: none;
                padding: 0.5rem;
                border-radius: 10px;
                border: 2px solid $main-color;
                box-sizing: border-box;
            }
            .overlay {
                cursor: pointer;
                position: absolute;
                width: 100%;
                height: calc(1.4rem + 2*0.5rem + 8px);
                border-radius: 10px;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease-in-out;
                span {
                    font-size: 1.2rem;
                    color: transparent;
                    font-style: italic;
                    font-weight: 600;
                }
                &:hover {
                    background-color: $base-color;
                    span {
                        color: #fff;
                    }
                }
            }
            button {
                position: absolute;
                top: 50%;
                right: 0.1rem;
                transform: translateY(-50%) scale(0.8);
                font-size: 1.4rem;
                padding: 0.4rem 0.8rem;
            }
        }
        &__wrap {
            display: flex;
            width: 100%;
            &--img {
                min-width: 10rem;
                height: 12rem;
                border: 2px solid $main-color;
                border-radius: 10px;
                background-color: #fff;
                cursor: pointer;
                overflow: hidden;
                position: relative;
                div {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    top: 0;
                    left: 0;
                    transition: background-color 0.2s ease-in-out;
                    span {
                        display: block;
                        font-size: 1.2rem;
                        color: $main-color;
                    }
                    label {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        cursor: pointer;
                    }
                    & + span {
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        padding: 0.5rem;
                        background-color: rgba(255, 255, 255, 0.925);
                        border-radius: 10px;
                        margin-bottom: 0.4rem;
                        margin-right: 0.4rem;
                        color: $main-color;
                        border: 2px solid $main-color;
                        transition: transform 0.1s ease-in-out;
                        &:active {
                            transform: scale(0.95);
                        }
                    }
                    &:hover {
                        background-color: rgba(0, 0, 0, 0.479);
                    }
                }
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            &--desc {
                margin-left: 1rem;
                border: 2px solid $main-color;
                border-radius: 10px;
                background-color: #fff;
                padding: 0.8rem;
                width: inherit;
                position: relative;
                span:first-child {
                    display: block;
                    color: $base-color;
                    font-size: 1.2rem;
                    font-style: italic;
                    font-weight: 600;
                }
                textarea {
                    display: block;
                    color: $base-color;
                    margin-top: 0.6rem;
                    width: 100%;
                    height: calc(100% - (1.2rem + 0.6rem));
                    padding: 0.5rem;
                    box-sizing: border-box;
                    resize: none;
                    outline: none;
                    border: 2px solid $base-color;
                    border-radius: 10px;
                    font-size: 1rem;
                }
                div {
                    position: absolute;
                    bottom: 0.8rem;
                    width: calc(100% - 2*0.8rem);
                    height: calc(100% - (1.2rem + 0.6rem + 2*0.8rem));
                    box-sizing: border-box;
                    border-radius: 10px;
                    &.overlay {
                        cursor: pointer;
                        transition: all 0.2s ease-in-out;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        span {
                            color: transparent;
                        }
                        &:hover {
                            background-color: $base-color;
                            span {
                                color: #fff;
                            }
                        }
                    }
                }
                button {
                    position: absolute;
                    right: 0.5rem;
                    top: -0.2rem;
                    transform: scale(0.8);
                    font-size: 1.4rem;
                    padding: 0.4rem 0.8rem;
                }
            }
        }
        &__add-movie {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            margin-top: 0.8rem;
            align-items: center;
            h1 {
                margin-right: 1rem;
                color: $base-color;
            }
        }
    }
</style>
