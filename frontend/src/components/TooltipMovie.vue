<template>
  <teleport to="body">
    <div ref="tooltip" class="tooltip--movie">
      <span class="tooltip--movie__name">
        <p>Tên:</p>
        {{ movie.name }}</span
      >
      <span class="tooltip--movie__rate"
        ><p>Đánh giá:</p>
        {{ movie?.rate || "??" }}
        <i class="fas fa-star"></i>
      </span>
      <span class="tooltip--movie__desc">
        <!-- <p>Mô tả:</p> -->
        {{ movie.desc }}
      </span>
      <span class="tooltip--movie__views">
        <p>Lượt xem:</p>
        {{ movie?.view || "??" }}</span
      >
      <span class="tooltip--movie__follow">
        <p>Lượt Follow:</p>
        {{ movie?.follow || "??" }}</span
      >
    </div>
  </teleport>
</template>

<script>
import { watch } from "vue";
export default {
  props: {
    coordinate: {
      type: Object
    },
    movie: {
      type: Object
    }
  },
  setup() {},
  mounted() {
    watch(
      () => {
        return { x: this.coordinate.x, y: this.coordinate.y };
      },
      newCoordinate => {
        this.$refs.tooltip.style.left = newCoordinate.x + "px";
        this.$refs.tooltip.style.top = newCoordinate.y + "px";
      }
    );
  }
};
</script>

<style lang="scss" scoped>
.tooltip--movie {
  width: 12rem;
  background-color: $main-color-tspa;
  border: 2px solid $light;
  box-shadow: 0 0 10px $light;
  color: $base-color;
  font-family: "Patrick Hand", cursive;
  padding: 1rem;
  border-radius: 10px;
  position: absolute;
  display: block;
  // transition: all 0.5s ease-in-out;
  span {
    display: block;
    color: $light;
    p {
      display: inline;
      font-style: oblique;
      font-weight: 600;
      color: $base-color;
    }
  }
  &__name {
    font-size: 1.2rem;
    text-transform: capitalize;
  }
  &__rate {
    i {
      font-size: 0.8rem;
      color: $light;
    }
  }
  &__desc {
    width: 100%;
    display: -webkit-box !important;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: $base-color !important;
    font-size: 1.1rem;
  }
}
</style>
