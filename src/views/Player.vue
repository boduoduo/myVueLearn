<template>
  <div class="player">
    <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"></NormalPlayer>
    <MiniPlayer></MiniPlayer>
    <ListPlayer ref="listPlayer"></ListPlayer>
    <audio :src="currentSong.url" ref="audio" @timeupdate="timeupdate" @ended="playend"></audio>
  </div>
</template>

<script>
import NormalPlayer from "../components/player/NormalPlayer"
import MiniPlayer from '../components/player/MiniPlayer'
import ListPlayer from '../components/player/ListPlayer'
import { mapGetters, mapActions } from 'vuex'
import mode from '../store/modeType'
import { getRandomIntInclusive } from '../tools/tool'

export default {
  name: "Player",
  data() {
    return {
      totalTime: 0,
      currentTime: 0
    }
  },
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  methods: {
    ...mapActions([
      'setCurrentIndex'
    ]),

    timeupdate (e) {
      this.currentTime = e.target.currentTime
    },

    playend () {
      if (this.modeType === mode.loop) {
        this.setCurrentIndex(this.currentIndex + 1)
      }else if (this.modeType === mode.one) {
        this.$refs.audio.play()
      }else if (this.modeType === mode.random) {
        let index = getRandomIntInclusive(0, this.songs.length - 1)
        this.setCurrentIndex(index)
      }
    }
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'isPlaying',
      'currentIndex',
      'currentPlayTime',
      'modeType',
      'songs'
    ])
  },

  watch: {
    isPlaying(newValue, oldValue) {
      if (newValue) {
        this.$refs.audio.play()
      }else {
        this.$refs.audio.pause()
      }
    },

    currentIndex(newValue, oldValue) {
      this.$refs.audio.oncanplay = () => {
        this.totalTime = this.$refs.audio.duration
        if (this.isPlaying) {
          this.$refs.audio.play()
        }else {
          this.$refs.audio.pause()
        }
      }
    },

    currentPlayTime (newValue, oldValue) {
      this.$refs.audio.currentTime = newValue
    }
  },

  mounted() {
    this.$refs.audio.oncanplay = () => {
      this.totalTime = this.$refs.audio.duration
    }
  },

};
</script>

<style lang="scss" scoped></style>
