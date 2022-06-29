<template>
  <div class="main result">
    <div v-if="loading">
        <div class="spinner-border"></div>
    </div>
    <div v-else class="d-flex flex-column">
        <h1>{{ header }}</h1>
        <p>{{ text }}</p>
        <router-link to="/wallets">My Wallet</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            loading: true,
            header: "",
            text:""
        }
    },
    mounted(){
        console.log("mounted ",this.$route.params.payment_id )
        axios.get("request/deposit_success/"+this.$route.params.payment_id)
        .then(({data}) => {
            this.header = data.header 
            this.text = data.text
            this.loading = false 
        })
        .catch(e=>{
            console.log("Error")
        })

    }
}
</script>

<style scoped>
    .result{
        width: clamp(360px, 50%, 600px);
        padding-top: 64px;
        margin-inline: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

    }
</style>