<template>
    <div class="sign">
        <div class="sign__form">
            <h3>Đăng Nhập Nào!</h3>
            <span>Chào mừng bạn, hãy nhập đầy đủ thông tin bên dưới để đăng nhập vào hệ thống bạn nhé
                - sau khi đăng nhập thành công sẽ có nhiều thứ để trải nghiệm lắm đó (^^) nyan~!
            </span>
            <Input v-for="(input, index) in setInput" :key="index" :data="input" />
            <button class="log">
                <i class="fas fa-sign-in-alt"></i>
                Đăng Nhập</button>
            <h4>Ngoài Ra</h4>
            <h1>|= Bạn cũng có thể đăng nhập bằng =|</h1>
            <h2>Hoặc đăng ký tài khoản 
                <router-link to="/dang-ky">tại đây</router-link></h2>
            <button class="google">
                <i class="fab fa-google"></i>
                Google
            </button>
            <button class="facebook">
                <i class="fab fa-facebook"></i>
                Facebook
            </button>
        </div>
    </div>
</template>

<script>
    import Input from '../components/Input.vue';
    import { reactive } from 'vue';
    export default {
        components: { Input },
        setup() {
            const setInput = reactive([
                // {
                //     labelName: 'Tên của bạn là gì?',
                //     inputName: 'name',
                //     type: 'text',
                // },
                {
                    labelName: 'Email của bạn là gì?',
                    inputName: 'email',
                    type: 'text',
                },
                {
                    labelName: 'Nhập mật khẩu vào bên dưới nhé?',
                    inputName: 'password',
                    type: 'password',
                },
            ]);
            return {
                setInput,
            }
        },
    }
</script>

<style scoped lang="scss">
     @include sign;
</style>
