<template>
    <div id="app" class="container">
        <NewOrder />
        <ProductCard
            v-for="order in getLasCards"
            :result="order"
        />
    </div>
</template>

<script>
import ProductCard from '/src/components/ProductCard'
import NewOrder from "./components/NewOrder";
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'App',
    components: {
        ProductCard,
        NewOrder
    },
    data() {
        return {}
    },
    methods: {
        ...mapActions([
            'getProducts',
            'getStatuses',
            'getOrders',
        ])
    },
    computed: {
        ...mapGetters([
            'orderList'
        ]),
        getLasCards(){
            return this.orderList.filter((el, index) => index > 360)
        }
    },
    created() {
        this.getProducts()
        this.getStatuses()
        this.getOrders()
    }
}
</script>

<style scoped lang="scss">
.container {
    max-width: 80vw;
    margin: 0 auto;
    @media (max-width: 970px){
        max-width: 95%;
    }
}
</style>
