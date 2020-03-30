<template>
  <transition appear>
      <div class="account">
          <AccountHeader @switchNum="switchNum"></AccountHeader>
          <AccountBottom :switchedNum="switchedNum"></AccountBottom>
      </div>
  </transition>
</template>

<script>

import AccountHeader from '../components/account/AccountHeader'
import AccountBottom from '../components/account/AccountBottom'
import {mapGetters} from 'vuex'

export default { 
    name: 'Account',
    data() {
        return {
            switchedNum: 0
        }
    },

    components: {
        AccountHeader,
        AccountBottom
    },

    methods: {
        switchNum (num) {
            this.switchedNum = num
        }
    },

    computed: {
        ...mapGetters([
            'favoriteList',
            'historyList'
        ])
    },
}
</script>

<style lang="scss" scoped>
@import "../assets/css/variable";
@import "../assets/css/mixin";

.account {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    @include bg_sub_color();
}
</style>