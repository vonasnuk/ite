<template>
    <div class="new-order">
        <div class="new-order__btn" v-if="!activeForm" @click="toggleForm">
            Добавить заказ
        </div>
        <div class="new-order__form" v-if="activeForm">
            <div class="product-list">
                <div class="product-list__item">
                    <div class="product-list__title">
                        Выбрать товар
                    </div>
                    <select v-model="goodsName">
                        <option v-for="goods in productList">
                            {{goods.name}}
                        </option>
                    </select>
                </div>
                <div class="product-list__item">
                    <div class="product-list__title">
                        Количество
                    </div>
                    <input v-model="count" min="1" type="number">
                </div>
                <div class="product-list__item">
                    <div class="add-order-btn" @click="addOrder">
                        Добавить
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    name: "NewOrder",
    data () {
        return {
            goodsName: null,
            count: null,
            activeForm: false
        }
    },
    computed:{
        ...mapGetters([
            'productList'
        ])
    },
    methods:{
        ...mapActions([
            'addNewOrder'
        ]),
        addOrder(){
            if (this.goodsName && this.count){
                this.addNewOrder({
                    'count': +this.count,
                    'productId': this.productList.find(product => product.name === this.goodsName).id
                })
                this.toggleForm()
            }
        },
        toggleForm(){
            this.activeForm = !this.activeForm
            this.goodsName = null
            this.count = null
        }

    }
}
</script>

<style scoped lang="scss">
    .new-order{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin-bottom: 30px;
        &__btn{
            height: 30px;
            color: white;
            width: 20%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            border-radius: 5px;
            background-color: #33691E;
            font-weight: bold;
        }
        &__form{
            margin-top: 20px;
            width: 100%;
            background-color: white;
            border: 1px solid black;
            border-radius: 3px;
            padding: 40px 0 20px 40px;
            .product-list{
                display: flex;
                flex-direction: column;
                &__item{
                    display: flex;
                    padding-bottom: 30px;
                    .add-order-btn{
                        cursor: pointer;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: #33691E;
                        color: white;
                        width: 200px;
                        height: 30px;
                        border-radius: 5px;
                        font-weight: bold;
                    }
                }
                &__title{
                    margin-right: 20px;
                }
            }
        }
    }
</style>