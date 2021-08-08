<template>
    <div class="product-card">
        <div class="product-card__container">
            <div class="product-card__photo">
                <img :src=result.photoUrl :alt=result.name>
            </div>
            <div class="product-card__main">
                <div class="product-card__main-top">
                    <div class="product-card__name" v-if="!toggleEdit">
                        {{result.name}}
                    </div>
                    <div class="product-card__name-edit" v-if="toggleEdit">
                        <select v-model="newItem.goodsName">
                            <option v-for="goods in productList">
                                {{goods.name}}
                            </option>
                        </select>
                    </div>
                    <div class="product-card__status" v-if="!toggleEdit">
                        {{result.status}}
                    </div>
                    <div class="product-card__status-edit" v-if="toggleEdit">
                        <select v-model="newItem.statuses">
                            <option v-for="status in statusesList">
                                {{status.name}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="product-card__main-bottom">
                    <div class="product-card__main-info">
                        <div class="product-card__price product-card-info">
                            <div>Цена</div>
                            <div>${{result.price}}</div>
                        </div>
                        <div class="product-card__number product-card-info">
                            <div>Количество</div>
                            <div v-if="!toggleEdit">{{result.count}} шт.</div>
                            <div class="product-card__number-edit" v-if="toggleEdit">
                                <input min="1" type="number" v-model="newItem.count">
                            </div>
                        </div>
                        <div class="product-card__amount product-card-info">
                            <div>Сумма</div>
                            <div>${{result.count * result.price}}</div>
                        </div>
                    </div>
                    <div class="product-card__main-btn" v-if="!toggleEdit">
                        <div class="product-card__btn-edit" @click="toggleEditForm">
                            Изменить
                        </div>
                        <div class="product-card__btn-delete" @click="toggleDeletePopup">
                            Удалить
                        </div>
                    </div>
                    <div class="product-card__main-btn" v-if="toggleEdit">
                        <div class="product-card__btn-edit" @click="updateItemOrder(result.id)">
                            Сохранить
                        </div>
                        <div class="product-card__btn-delete" @click="toggleEditForm">
                            Отмена
                        </div>
                    </div>
                </div>
            </div>
            <div class="popup-delete" v-if="popupDelete">
                <div class="popup-delete__title">
                    Удалить заказ ?
                </div>
                <div class="popup-delete__btn">
                    <div class="popup-delete__btn-cancel" @click="toggleDeletePopup">
                        Отмена
                    </div>
                    <div class="popup-delete__btn-delete" @click="deleteOrder(result.id); toggleDeletePopup()">
                        Удалить
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "product-card",
    props: ['result'],
    data(){
        return {
            popupDelete: false,
            toggleEdit: false,
            newItem: {
                goodsName: this.result.name,
                statuses: this.result.status,
                count: this.result.count
            }
        }
    },
    computed:{
        ...mapGetters([
            'productList',
            'statusesList'
        ])
    },
    methods: {
        ...mapActions([
           'deleteOrder',
            'updateOrder'
        ]),
        toggleDeletePopup(){
            this.popupDelete = !this.popupDelete
        },
        toggleEditForm(){
            this.toggleEdit = !this.toggleEdit
        },
        updateItemOrder(id){
            if(this.newItem.goodsName && this.newItem.statuses && this.newItem.count){
                this.updateOrder(
                    {
                        id: id,
                        productId: this.productList.find(product => product.name === this.newItem.goodsName).id,
                        statusId: this.statusesList.find(status => status.name === this.newItem.statuses).id,
                        count: +this.newItem.count
                    }
                )
                this.toggleEditForm()
            }

        }
    }
}
</script>

<style scoped lang="scss">
.product-card {
    width: 100%;
    background-color: #E3F2FD;
    min-height: 300px;
    margin-bottom: 20px;
    border-radius: 15px;
    &__container {
        padding: 2%;
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
    &__photo {
        min-height: 200px;
        height: 250px;
        img{
            height: 100%;
            border-radius: 15px;
        }
    }

    &__main{
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .product-card__main-top{
            display: flex;
            justify-content: space-around;
            padding: 0 20px;
            .product-card__name, .product-card__status{
                width: 50%;
                background-color: #263238;
                color: white;
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 40px;
            }
            .product-card__status{
                width: 35%;
            }
        }
        .product-card__main-bottom{
            display: flex;
            height: 60%;
            justify-content: space-between;
            padding-right: 40px;
            @media (max-width: 970px){
                flex-direction: column;
            }
            .product-card__main-info{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                width: 40%;
                @media (max-width: 970px){
                    width: 100%;
                }
                .product-card-info{
                    display: flex;
                    justify-content: space-between;
                }
            }
            .product-card__main-btn{
                display: flex;
                width: 35%;
                justify-content: space-between;
                align-items: flex-end;
                @media (max-width: 970px){
                    width: 100%;
                }
                .product-card__btn-edit, .product-card__btn-delete{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    min-height: 40px;
                    min-width: 100px;
                    background-color: #33691E;
                    color: white;
                    border-radius: 5px;
                }
            }
        }
    }
    .popup-delete{
        width: 600px;
        height: 200px;
        background-color: #546e7a;
        border-radius: 10px;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: absolute;
        padding: 30px;
        &__title{
            font-size: 26px;
            text-align: center;
        }
        &__btn{
            display: flex;
            justify-content: space-around;
            &-cancel, &-delete{
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                background-color: #26a69a;
                color: white;
                height: 50px;
                border-radius: 10px;
                text-transform: uppercase;
                width: 30%;
            }
        }
    }
}

</style>