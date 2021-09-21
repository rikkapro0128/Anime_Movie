<template>
    <teleport v-if="toggle" to="section">
        <div class="toast" :style="{ animation: 'toast ' + time + 's 1s 1 cubic-bezier(.05,1,.02,1)' }">
            <h1>Thông báo</h1>
            <span>{{ message }}</span>
        </div>
    </teleport>
</template>

<script>
import { watch, ref } from 'vue';
export default {
    props: {
        toggle: {
            type: Boolean,
        },
        message: {
            type: String,
        },
        status: {
            type: String,
        }
    },
    emits: ['changeToggle'],
    setup(props, { emit }) {
        const time = ref(5); // second
        watch(
            () => props.toggle,
            (state) => {
                if(state) {
                    setTimeout(() => {
                        emit('changeToggle');
                    }, time.value * 1000);
                }
            }
        )
        return {
            time,
        }
    },
}
</script>

<style scoped lang="scss">
    .toast {
        position: absolute;
        width: 15rem;
        height: 4rem;
        top: 0;
        right: 10px;
        background-color: #ffa9be;
        border-radius: 10px;
        padding: 1rem;
        color: $color-toast;
        box-shadow: 0 0 10px $main-color;
        transition: animation opacity 0.2s ease-in-out;
        transform: translateX(calc(100% + 20px));
        margin-top: 1rem;
        opacity: 0;
        h1 {
            font-size: 1.5rem;
        }
        span {
            font-size: 1rem;
            color: $base-color;
            margin: 0.2rem 0;
        }
    }
</style>
