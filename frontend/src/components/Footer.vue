<template>
  <footer>
		<div class="content">
			<router-link class="name" to="/">anime movie</router-link>
		</div>
		<div class="tag--horizontal">
			<div class="tag--horizontal__name">footer</div>
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
	.content {
		font-family: "Roboto", sans-serif;
		position: relative;
		z-index: 1;
		.name {
			font-size: 2.5rem;
			text-transform: capitalize;
			font-weight: 700;
			display: block;
			padding: 2rem;
			font-style: italic;
		}
		&::before {
			content: '';
			display: block;
			width: 5rem;
			height: 5rem;
			//background-color: #2e2e36;
			position: absolute;
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
			border-left: 2px solid #efd3b3;
			border-top: 2px solid #efd3b3;
			&::before {
				content: '';
				position: absolute;
				width: 2rem;
				height: 2rem;
				right: 0;
				background-color: #585858;
				transform-origin: top left;
				transform: skew(30deg, -4deg);
				border-right: 2px solid #efd3b3;
				z-index: -1;
			}
		}
		&::after {
			content: '';
			position: absolute;
			width: 100%;
			height: 1rem;
			bottom: 0;
			background-color: #efd3b3;
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
		border-left: 2px solid #efd3b3;
		border-right: 2px solid #efd3b3;
		box-sizing: border-box;
	}
}
</style>
