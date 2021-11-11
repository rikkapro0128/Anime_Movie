<template>
  <footer>
		<div class="wrap--content">
			<div class="content">
				<router-link class="name" to="/">anime movie</router-link>
			</div>
			<div>
				<span class="intro">Mình là một coder quèn thích anime, ngứa tay nên mình code ra website này để xem anime cũng như sưu tầm, mọi người có thể xem anime ở đây thoải mái nhá, có ý kiến gì có thể liên hệ mình hoặc đóng góp tại mục báo cáo trong phần cài đặt</span>
			</div>
		</div>
		<div class="tag--horizontal">
			<div class="tag--horizontal__name">website thiết kế bởi miru</div>
			<div class="tag--horizontal__bg"></div>
		</div>
		<div class="overlay--horizontal"></div>
		<div class="character--horizontal"></div>
		<div class="social--horizontal">
			<div class="before"></div>
			<div>
				<span class="contact--text">Liên hệ mình bằng</span>
				<!--			:to="{ name: 'social-twitter' }"-->
				<router-link class="contact--text" to="/">
					<i class="fab fa-twitter"></i>
				</router-link>
				<!--			:to="{ name: 'social-facebook' }"-->
				<router-link class="contact--text" to="/">
					<i class="fab fa-facebook-square"></i>
				</router-link>
				<!--			:to="{ name: 'social-youtube' }"-->
				<router-link class="contact--text" to="/">
					<i class="fab fa-youtube"></i>
				</router-link>
				<!--			:to="{ name: 'social-instagram' }"-->
				<router-link class="contact--text" to="/">
					<i class="fab fa-instagram"></i>
				</router-link>
			</div>
			<div class="after"></div>
		</div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  background:
		//url('~@/assets/img/bg.gif'),
		#fff;
	min-height: 14rem;
	position: relative;
	margin-top: 4rem;
	.wrap--content {
		display: flex;
		width: 100%;
		position: relative;
		& > div:nth-child(2) {
			position: relative;
			&:before {
				content: '';
				display: block;
				position: absolute;
				width: 2px;
				height: calc(100% - 5.5rem);
				background-color: #2e2e36;
				top: 1.3rem;
				left: 1.5rem;
			}
			& > .intro {
				position: relative;
				line-height: 1.3;
				min-width: 12.625rem;
				margin: 1rem 24rem 4rem 3rem;
				max-height: 12rem;
				overflow: hidden;
				display: -webkit-box !important;
				-webkit-line-clamp: 8;
				-webkit-box-orient: vertical;
			}
		}
		.content {
			font-family: "Roboto", sans-serif;
			position: relative;
			z-index: 1;
			margin-left: 2rem;
			position: relative;
			top: 1rem;
			width: fit-content;
			height: fit-content;
			.name {
				font-size: 2.5rem;
				text-transform: capitalize;
				font-weight: 700;
				display: block;
				font-style: italic;
			}
			&::before {
				content: '';
				display: block;
				width: 10rem;
				height: 4rem;
				background: url('~@/assets/img/dot.png');
				position: absolute;
				background-size: 5%;
				bottom: -90%;
				left: -9%;
				z-index: -1;
			}
			&::after {
				content: '';
				display: block;
				width: 4rem;
				height: 2rem;
				background: url('~@/assets/img/pluse.png');
				position: absolute;
				background-size: 34%;
				top: -50%;
				right: -10%;
			}
		}
	}
	.tag--horizontal {
		position: absolute;
		width: 100%;
		height: 2rem;
		top: 0;
		transform: translateY(-100%);
		display: flex;
		align-items: center;
		overflow: hidden;
		&__name {
			color: $light;
			min-width: 4rem;
			line-height: 1.6;
			background-color: #585858;
			position: relative;
			text-align: center;
			text-transform: capitalize;
			border-left: 2px solid #24A1A6;
			border-top: 2px solid #24A1A6;
			padding: 0 0.5rem;
			font-style: italic;
			&::before {
				content: '';
				position: absolute;
				width: 2rem;
				height: 2rem;
				right: 0;
				background-color: #585858;
				transform-origin: top left;
				transform: skew(30deg, -4deg);
				border-right: 2px solid #24A1A6;
				z-index: -1;
			}
		}
		&::after {
			content: '';
			position: absolute;
			width: 100%;
			height: 1rem;
			bottom: 0;
			background: linear-gradient(270deg, rgba(13,160,175,1) 0%, rgba(66,254,151,1) 100%);
			z-index: -2;
		}
	}
	.overlay--horizontal {
		box-sizing: border-box;
		position: absolute;
		width: 100%;
		height: 3rem;
		position: absolute;
		bottom: 0;
		background: rgba(46, 46, 46, 0.8);
		display: flex;
		align-items: center;
		padding-left: 10rem;
	}
	.social--horizontal {
		box-sizing: border-box;
		position: absolute;
		width: 100%;
		height: 3rem;
		position: absolute;
		bottom: 0;
		display: flex;
		align-items: center;
		div {
			.contact--text {
				color: $light;
				margin: 0.4rem;
				font-style: italic;
			}
		}
		& > div.after, & > div.before {
			display: block;
			width: 6rem;
			height: 2px;
			background-color: $light;
			margin: 0 1rem;
		}
	}
	.character--horizontal {
		width: 100%;
		height: 100%;
		position: absolute;
		bottom: 0;
		background: no-repeat url('~@/assets/img/siesta-footer.png'), no-repeat url('~@/assets/img/siesta-shadow.png');
		background-size: 20%, 20%;
		background-position: 76% -6%, 80% -12%;
		border-left: 2px solid #24A1A6;
		border-right: 2px solid #24A1A6;
		box-sizing: border-box;
	}
}
</style>
