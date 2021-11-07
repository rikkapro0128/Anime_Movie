<template>
  <div class="movie">
    <div class="movie__details">
      <div class="movie__details--img">
        <img
          :src="
            movie.image
              ? `${host}${movie.image}`
              : `${host}/res-image/no_image.png`
          "
          :alt="
            movie.image
              ? `${host}${movie.imag}`
              : `${host}/res-image/no_image.png`
          "
        />
      </div>
      <div class="movie__details--content">
        <h1 class="">
          <span>Tên Anime :</span>
          {{ movie.name }}
        </h1>
        <h3>
          <span>Mô tả :</span>
          {{ movie.desc }}
        </h3>
      </div>
    </div>
    <div class="tool">
      <div class="ls-btn">
        <router-link
          class="btn box__sd--pink"
          :to="`${
            !movie.videos?.length
              ? '/'
              : `/view-movie/${label}?esp=${movie.videos?.[0]?.esp}`
          }`"
          >Xem Anime</router-link
        >
        <router-link class="btn box__sd--pink" to="/">Xem Trailer</router-link>
      </div>
      <div class="esp box__sd--pink">
        <h1>Tập</h1>
        <div v-if="movie.videos?.length" class="esp--ls">
          <router-link
            v-for="(video, index) in movie.videos"
            :key="index"
            class="btn btn--esp"
            :to="`/view-movie/${label}?esp=${video.esp}`"
            >{{ video.esp }}</router-link
          >
        </div>
        <span v-else>Vẫn chưa cập nhật tập nào!</span>
      </div>
    </div>
    <hr />
    <h1>Giao diện comment vẫn chưa hoàn tất!</h1>
    <hr />
		<div class="info--controls">
			<div class="tool--select">
				<span ref="toolRun" class="tool--select__run">
					<div class="shape--left" v-show="leftSelect"></div>
					<div class="main"></div>
					<div class="shape--right"></div>
				</span>
				<span ref="widthInit" @click="clickTool($event, 0, 'info--anime')" class="tool--select__item info">
					thông tin về anime
					<i class="fas fa-info-circle"></i>
				</span>
				<span @click="clickTool($event, 1, 'info--character')" class="tool--select__item character">
					nhân vật
					<i class="fas fa-user-friends"></i>
				</span>
				<span @click="clickTool($event, 2, 'info--voiceover')" class="tool--select__item voiceover">
					lồng tiếng
					<i class="fas fa-microphone-alt"></i>
				</span>
				<span @click="clickTool($event, 3, 'info--voiceover')" class="tool--select__item trailer">
					trailer
					<i class="fas fa-photo-video"></i>
				</span>
				<span @click="clickTool($event, 4, 'info--trailer')" class="tool--select__item photos">
					hình ảnh
					<i class="fas fa-images"></i>
				</span>
				<span @click="clickTool($event, 5, 'info--posts')" class="tool--select__item post">
					bài đăng
					<i class="far fa-clipboard"></i>
				</span>
			</div>
			<div ref="controllShowData" class="show--content select--left">
				<div class="info info--anime">
					<span class="date">
						<span>Xem mỗi:</span>
						<span>{{ infoAnime['date'] }}</span>
					</span>
					<span class="loop">
						<span>mỗi:</span>
						<span>{{ infoAnime['loop'] }}</span>
					</span>
					<span class="state-movie">
						<span>trạng thái anime:</span>
						<span>{{ infoAnime['state-movie'] }}</span>
					</span>
					<span class="time">
						<span>dự kiến tổng:</span>
						<span>{{ infoAnime['time'] + 'tập' }}</span>
					</span>
					<span class="season">
						<span>season:</span>
						<span>{{ infoAnime['season'] }}</span>
					</span>
					<span class="translate">
						<span>translate:</span>
						<span>{{ infoAnime['translate'] }}</span>
					</span>
					<span class="quality">
						<span>chất lượng:</span>
						<span>{{ infoAnime['quality'] }}</span>
					</span>
					<span class="nation">
						<span>quốc gia:</span>
						<span>{{ infoAnime['nation'] }}</span>
					</span>
					<div class="genres">
						<span>thể loại:</span>
						<div>
							<span v-for="(value, index) in infoAnime['genres']" :key="index">{{ (index === 0 ? '' : ', ') + value }}</span>
						</div>
					</div>
					<span class="author">
						<span>tác giả:</span>
						<span>{{ infoAnime['author'] }}</span>
					</span>
					<span class="studio">
						<span>studio sản xuất:</span>
						<span>{{ infoAnime['studio'] }}</span>
					</span>
				</div>
				<div class="info info--character">
					<div class="char" v-for="(n, index) in 10" :key="index"></div>
				</div>
				<div class="info info--voiceover">
					<div class="voiceover" v-for="(n, index) in 10" :key="index"></div>
				</div>
				<div class="info info--trailer">
					<div>
						<iframe width="100%" height="auto" src="https://www.youtube.com/embed/5qap5aO4i9A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</div>
				</div>
				<div class="info info--photos">5</div>
				<div class="info info--posts">6</div>
			</div>
		</div>
		<hr />
    <Comments :label="label" />
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";
import Comments from "../components/Comments.vue";
import anime from 'animejs';

export default {
  props: ["name_movie"],
  components: { Comments },
  setup() {
    const route = useRoute();
    const label = ref(route.params.label_anime);
    const store = useStore();
    const movie = ref({});
		const infoAnime = ref(null);
    const host = ref(process.env.VUE_APP_HOST_SERVER);
		const widthSelect = ref(null);
		const leftSelect = ref(null);
    (async () => {
      await store.dispatch("getMovieByLabel", {
        label: label.value,
        options: { esp: "all" },
      });
			infoAnime.value = store.state.movie.infomation;
      movie.value = store.state.movie;
    })();
		console.log(infoAnime)
    return {
      host,
      label,
      store,
      movie,
			infoAnime,
			leftSelect,
			widthSelect,
    };
  },
	mounted() {
		this.initPos(this.$refs.widthInit);
	},
	methods: {
		moveInfo(number) {
			this.$refs.controllShowData.scrollLeft = (number * this.$refs.controllShowData.offsetWidth);
		},
		clickTool(e, number) {
			if(e.target.nodeName === 'I') {
				this.initPos(e.target.parentElement);
			}else {
				this.initPos(e.target);
			}
			this.moveInfo(number);
		},
		setColorElement(ele) {
			ele.classList.add('active');
		},
		resetColor() {
			for(let item of document.querySelectorAll('.tool--select__item')) {
				item.classList.remove('active');
			}
		},
		initPos(node) {
			const context = this;
			anime({
				targets: this.$refs.toolRun,
				easing: 'easeOutExpo',
				width: node.offsetWidth,
				left: node.offsetLeft,
				begin: function() {
					if(node.offsetLeft !== 0) {
						context.leftSelect = true;
						context.$refs.controllShowData.classList.remove('select--left');
					}else {
						context.$refs.controllShowData.classList.add('select--left');
						context.leftSelect = false;
					}
				},
				duration: 500,
			})
			this.resetColor();
			this.setColorElement(node);
		}
	}
};
</script>

<style lang="scss" scoped>
.movie {
  width: inherit;
  margin: 2rem 0;
  padding: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: $light;
  @include tl-ani;
	.info--controls {
		display: flex;
		flex-direction: column;
		.tool--select {
			display: flex;
			position: relative;
			&__run {
				position: absolute;
				height: 100%;
				top: 0;
				left: 0;
				background-color: $main-color;
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
				.main {
					width: 100%;
					height: 100%;
					position: relative;
					box-shadow: 0 0 10px $main-color;
					border-top-left-radius: 10px;
					border-top-right-radius: 10px;
					z-index: 1;
				}
				//overflow: hidden;
				.shape--left {
					background: #777790;
					width: 35px;
					height: 35px;
					position: absolute;
					bottom: 0;
					left: 0;
					transform: translate(-74%, 25%);
					z-index: 0;
					&:before {
						content: '';
						width: 100%;
						height: 100%;
						background: #fff;
						position: absolute;
						top: -9px;
						left: -9px;
						border-radius: 10px;
					}
				}
				.shape--right {
					background: #777790;
					width: 35px;
					height: 35px;
					position: absolute;
					right: 0;
					bottom: 0;
					transform: translate(74%, 25%);;
					z-index: 0;
					&:before {
						content: '';
						width: 100%;
						height: 100%;
						background: #fff;
						position: absolute;
						top: -9px;
						right: -9px;
						border-radius: 10px;
					}
				}
			}
			&__item {
				position: relative;
				cursor: pointer;
				transition: background-color 0.1s ease-in-out,
				box-shadow 0.1s ease-in-out,
				color 0.3s ease-in-out;
				display: flex;
				align-items: center;
				color: #2e2e36;
				padding: 0.7rem;
				&.active {
					color: #fff;
				}
				i {
					margin-left: 0.5rem;
					color: inherit;
				}
			}
		}
		.show--content {
			position: relative;
			border-radius: 10px;
			box-shadow: 0 0 10px $main-color;
			background-color: $main-color;
			transition: border-radius 0.3s linear;
			display: flex;
			overflow-x: scroll;
			scroll-behavior: smooth;
			&::-webkit-scrollbar {
				width: 0px;
				height: 0px;
			}
			.info {
				display: inline-block;
				width: 100%;
				padding: 1rem;
				box-sizing: border-box;
				flex-shrink: 0;
				background-color: $main-color;
				&.info--anime {
					& > span {
						margin: 0 0.5rem;
						& > span:first-child {
							color: $light;
							margin-right: 0.5rem;
							text-transform: capitalize;
						}
						& > span:not(&:first-child) {
							text-transform: capitalize;
						}
					}
					& > div {
						display: flex;
						& > span:first-child {
							color: $light;
							margin-right: 0.5rem;
						}
						& > div > span:not(&:first-child) {
							display: inline-block;
							text-transform: capitalize;
						}
					}
				}
				&.info--character, &.info--voiceover {
					display: flex;
					flex-wrap: wrap;
					align-self: flex-start;
					.char, .voiceover {
						width: 6rem;
						height: 6rem;
						background-color: $light;
						box-shadow: 0 0 10px $main-color;
						border-radius: 10px;
						margin: 0.5rem;
						flex-shrink: 0;
					}
				}
				&.info--trailer {
					div {
						width: 50%;
						display: block;
						position: relative;
						padding-top: 28.125%;
						iframe {
							border-radius: 10px;
							display: block;
							position: absolute;
							width: 100%;
							height: 100%;
							top: 0;
							left: 0;
							border: 2px solid yellow;
						}
					}
				}
			}
			&.select--left {
				border-top-right-radius: 10px;
				border-top-left-radius: 0;
			}
			&.select--right {
				border-top-left-radius: 10px;
				border-top-right-radius: 0;
			}
		}
	}
  &__details {
    display: flex;
    height: 18rem;
    &--img {
      min-width: 14rem;
      height: 100%;
      box-shadow: 0 0 10px $border-avatar;
      border-radius: 10px;
      img {
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
        border: 2px solid $border-avatar;
      }
    }
    &--content {
      margin-left: 1rem;
      height: 100%;
      h1 {
        color: $base-color;
        font-size: 1.3rem;
        text-transform: capitalize;
        span {
          font-size: 1.4rem;
          color: $main-color;
        }
      }
      h3 {
        color: $base-color;
        margin: 1rem 0;
        font-size: 1.2rem;
        line-height: 1.6rem;
        max-height: calc(100% - 3.3rem);
        overflow-y: scroll;
        span {
          font-size: 1.2rem;
          color: $main-color;
        }
      }
    }
  }
  .tool {
    display: flex;
    margin: 1rem 0;
    width: 100%;
    .ls-btn {
      display: flex;
      min-width: 14rem;
      justify-content: space-around;
      a {
        margin: 0 0.2rem;
      }
    }
    .esp {
      width: 100%;
      margin-left: 1rem;
      background-color: $main-color;
      border-radius: 10px;
      &--ls {
        display: flex;
        margin: 0 2rem;
        padding: 0.5rem 0;
        flex-wrap: wrap;
      }
      h1 {
        font-size: 1.2rem;
        color: $light;
        white-space: nowrap;
        margin: 0.5rem 1rem;
        margin-bottom: 0;
        margin-left: 2rem;
      }
      span {
        width: 100%;
        display: block;
        text-align: center;
        font-size: 1.2rem;
        color: $light;
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
