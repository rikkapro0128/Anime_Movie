<template>
  <footer>
    <h1>Anime Movie</h1>
    <p>
      Website được xây dựng nên cho mọi người có thể xem Anime, và nhiều điều
      tuyệt vời khác, hoàn toàn miễn phí, mong được sự ủng hộ của mọi người^^!
    </p>
    <h2>Copyright © 2021 by Miru</h2>
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
  background: linear-gradient(360deg, #007991 0%, #78ffd6 100%);
  text-align: center;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  border: 2px solid $main-color;
  border-bottom: none;
  h1 {
    font-size: 2.4rem;
    text-align: left;
    padding: 1rem 1.5rem;
    color: $light;
    cursor: pointer;
  }
  p {
    padding-bottom: 1rem;
    color: $light;
  }
  h2 {
    padding-bottom: 1rem;
    color: $light;
  }
}
</style>
