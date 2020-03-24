<template>
  <div class="player">
    <NormalPlayer></NormalPlayer>
    <MiniPlayer @showList="showList"></MiniPlayer>
    <ListPlayer ref="listPlayer"></ListPlayer>
  </div>
</template>

<script>
import NormalPlayer from "../components/player/NormalPlayer"
import MiniPlayer from '../components/player/MiniPlayer'
import ListPlayer from '../components/player/ListPlayer'

export default {
  name: "Player",
  methods: {
    showList () {
      this.$refs.listPlayer.show()
    }
  },
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  }
};
</script>

<style lang="scss" scoped></style>
