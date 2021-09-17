<template>
    <div class="add-movie">
        <h1 class="tl-ani">Thêm phim</h1>
        <form action="" @submit.prevent="sendMovie">
            <div class="form-input" v-for="(item, index) in formAddMovie" :key="index">
                <label :for="item.attr">{{ item.name }}</label>
                <input class="box-sd" :type="item.type" :name="item.attr" :id="item.attr" v-model="data.name">
            </div>
            <span class="validate-field" v-if="stateValidate.name.state">{{ stateValidate.name.mess }}</span>
            <div class="form-input">
                <label for="desc">Mô tả</label>
                <textarea class="box-sd" name="desc" id="desc" v-model="data.desc"></textarea>
            </div>
            <span class="validate-field" v-if="stateValidate.desc.state">{{ stateValidate.desc.mess }}</span>
            <button class="box-sd">Đăng</button>
            <span v-if="stateSending" class="status-send">{{ stateSending }}</span>
            <span v-if="stateDone" class="status-done">{{ stateDone }}</span>
        </form>
    </div>
</template>

<script>
    import { reactive, ref, watchEffect } from 'vue';

    export default {
        setup() {
            const stateSending = ref('');
            const formAddMovie = reactive([
                {
                    name: 'Tên',
                    attr: 'name',
                    data: '',
                    type: 'text',
                },
            ]);
            const data = reactive({
                name: '',
                desc: '',
            });
            const stateValidate = reactive({
                name: {
                    mess: 'Bạn chưa nhập tên mà!',
                    state: false,
                },
                desc: {
                    mess: 'Bạn chưa nhập mô tả mà!',
                    state: false,
                },
            });
            const stateDone = ref('');
            watchEffect(() => {
                !data.name ? stateValidate.name.state = true : stateValidate.name.state = false;
                !data.desc ? stateValidate.desc.state = true : stateValidate.desc.state = false;
            });
            return {
                data,
                formAddMovie,
                stateSending,
                stateValidate,
                stateDone,
            }
        },
        methods: {
            sendMovie() {
                if(!this.stateValidate.name.state && !this.stateValidate.desc.state) {
                    this.stateSending = 'Đang Tạo Phim!';
                    this.stateDone = '';
                    fetch('http://localhost:5000/admin/create-movie', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.data),
                    })
                    .then((response) => response.json())
                    .then(() => { 
                        this.aleart('Tạo Phim Thành Công!');
                    })
                    .catch(() => {
                        this.aleart('Có Lỗi Tạo Phim');
                    })
                }
            },
            aleart(message) {
                this.stateDone = message;
                this.stateSending = '';
                this.data.name = '';
                this.data.desc = '';
                setTimeout(() => {
                    this.stateDone = '';
                }, 4000);
            },
        },
    }
</script>

<style lang="scss" scoped>
    .add-movie {
        width: inherit;
        padding: 0.4rem;
        box-sizing: border-box;
        form {
            margin-top: 1rem;
            .validate-field {
                font-size: 1rem;
                margin-bottom: 0.4rem;
                display: block;
                font-style: italic;
                color: red;
            }
            .form-input {
                width: inherit;
                label {
                    display: block;
                    font-size: 1.2rem;
                    color: $base-color;
                    font-weight: 600;
                    font-style: italic;
                }
                input {
                    box-sizing: border-box;
                    display: block;
                    width: 100%;
                    outline: none;
                    font-size: 1.1rem;
                    margin: 0.4rem 0;
                    padding: 0.5rem 0.8rem;
                    font-style: italic;
                    border: 2px solid $base-color;
                    border-radius: 20px;
                    color: $base-color;
                    font-weight: 600;
                    transition: all 0.2s ease-in-out;
                    background-color: $light;
                    &:focus {
                        border-color: $main-color;
                    }
                }
                textarea {
                    width: 100%;
                    resize: vertical;
                    box-sizing: border-box;
                    outline: none;
                    font-size: 1.2rem;
                    margin: 0.4rem 0;
                    padding: 0.5rem 0.8rem;
                    font-style: italic;
                    border: 2px solid $base-color;
                    border-radius: 20px;
                    color: $base-color;
                    font-weight: 600;
                    min-height: 12rem;
                    transition: all 0.2s ease-in-out;
                    background-color: $light;
                    &:focus {
                        border-color: $main-color;
                    }
                }
            }
            button {
                display: block;
                font-size: 1.2rem;
                padding: 0.5rem 0.8rem;
                color: $base-color;
                background-color: #fff;
                border: 2px solid $base-color;
                border-radius: 20px;
                transition: all 0.1s ease-in-out;
                cursor: pointer;
                &:hover {
                    background-color: $main-color;
                    border-color: $main-color;
                    color: #fff;
                }
            }
            .status-send {
                display: block;
                font-size: 1.2rem;
                color: $base-color;
                margin: 1rem 0;
            }
            .status-done {
                display: block;
                font-size: 1.2rem;
                color: $base-color;
                margin: 1rem 0;
            }
        }
    }
</style>
