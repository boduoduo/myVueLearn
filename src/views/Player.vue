<template>
  <div class="player">
    <NormalPlayer></NormalPlayer>
    <MiniPlayer></MiniPlayer>
    <ListPlayer></ListPlayer>
  </div>
</template>

<script>
import NormalPlayer from "../components/player/NormalPlayer"
import MiniPlayer from '../components/player/MiniPlayer'
import ListPlayer from '../components/player/ListPlayer'

export default {
  name: "Player",
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  }
};
</script>

<style lang="scss" scoped></style>
