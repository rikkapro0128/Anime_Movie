<template>
	<div class="slider">
		<span id="button-prev-miru"></span>
		<span id="button-next-miru"></span>
		<swiper
			:navigation="{ nextEl: '#button-next-miru', prevEl: '#button-prev-miru' }"
			:autoplay="{ 'delay': 4000, 'disableOnInteraction': false }"
			:pagination="{ 'clickable': true }"
			:loop="true"
			:breakpoints="{
				1200: {
					slidesPerView: 6,
					spaceBetween: 20,
				},
				1024: {
					slidesPerView: 6,
					spaceBetween: 20,
				},
				768: {
					slidesPerView: 5,
					spaceBetween: 20,
				},
				680: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
				470: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				0: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
			}"
		>
<!--			@swiper="onSwiper"-->
<!--			@slideChange="onSlideChange"-->
			<swiper-slide v-for="n in 10" :key="n">
				<div class="slider--item">
					<div class="slider--item__image">
						<img :src="`${host}/res-image/no_image.png`" alt="">
					</div>
					<span class="slider--item__name"></span>
				</div>
			</swiper-slide>
		</swiper>
	</div>
</template>
<script>
// Import Swiper Vue.js components
import { ref } from 'vue';
import SwiperCore, {
	Autoplay, Pagination, Navigation
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

// install Swiper modules
SwiperCore.use([Navigation, Autoplay, Pagination]);

// Import Swiper styles
import 'swiper/swiper-bundle.min.css';

export default {
	components: {
		Swiper,
		SwiperSlide,
	},
	setup() {
		const host = ref(process.env.VUE_APP_HOST_SERVER);
		const onSwiper = (swiper) => {
			console.log(swiper);
		};
		const onSlideChange = () => {
			console.log('slide change');
		};
		return {
			host,
			onSwiper,
			onSlideChange,
		};
	},
};
</script>

<style lang="scss" scoped>
.slider {
	margin: 1rem 0;
	width: 100%;
	position: relative;
	#button-prev-miru {
		cursor: pointer;
		position: absolute;
		width: 50px;
		height: calc(50px * 15 / 11);
		top: 50%;
		left: 0;
		transform: translate(0, -50%);
		background-image: url('~@/assets/img/slider_arrow_left.png');
		z-index: 2;
		background-size: contain;
		background-repeat: no-repeat;
	}
	#button-next-miru {
		cursor: pointer;
		position: absolute;
		width: 50px;
		height: calc(50px * 15 / 11);
		top: 50%;
		right: 0;
		transform: translate(0, -50%);
		background-image: url('~@/assets/img/slider_arrow_right.png');
		z-index: 2;
		background-size: contain;
		background-repeat: no-repeat;
	}
	.slider--item {
		cursor: pointer;
		border-radius: 1rem;
		overflow: hidden;
		&__name {
			color: $light;
		}
		&__image {
			width: 100%;
			img {
				width: 100%;
				object-fit: cover;
			}
		}
	}
}
</style>
