import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        products: [],
        statuses: [],
        orders: []
    },
    mutations: {
        setProduct: (state, products) => {
            state.products = products;
        },
        setStatuses: (state, statuses) => {
            state.statuses = statuses;
        },
        setOrders: (state, orders) => {
            state.orders = orders;
        },
        updateOrders: (state, id) => {
            let updatedList = state.orders.filter((elem) => elem.id !== id)
            state.orders = updatedList
        },
        setNewOrder: (state, order) => {
            state.orders.push(order)
        },
        setNewDataForOrder: (state, order) => {
            let index = state.orders.findIndex(item => item.id === order.id)
            state.orders[index].productId = order.productId
            state.orders[index].statusId = order.statusId
            state.orders[index].count = order.count
        }
    },
    actions: {
        async getProducts( {commit} ){
            await axios.get('https://webtest.it.ua/testApp/api/products')
                .then(products => {
                    commit('setProduct', products.data)
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        async getStatuses( {commit} ){
            await axios.get('https://webtest.it.ua/testApp/api/statuses')
                .then(statuses => {
                    commit('setStatuses', statuses.data)
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        async getOrders( {commit} ){
            await axios.get('https://webtest.it.ua/testApp/api/orders')
                .then(orders => {
                    commit('setOrders', orders.data)
                }).catch(error => {
                    console.error(error)
                })
        },
        async deleteOrder( {commit}, id ){
            await axios.post(`https://webtest.it.ua/testApp/api/orders/delete/`+id)
                .then(response => {
                    commit('updateOrders', response.data.id)
                }).catch(error => {
                console.error(error)
            })
        },
        async addNewOrder( {commit}, order ){
            await axios.post('https://webtest.it.ua/testApp/api/orders/add', order)
                .then(response => {
                    commit('setNewOrder', response.data)
                }).catch(error => {
                    console.error(error)
                })
        },
        async updateOrder( {commit}, order ){
            await axios.post('https://webtest.it.ua/testApp/api/orders/update', order)
                .then(response => {
                    commit('setNewDataForOrder', response.data)
                }).catch(error => {
                    console.error(error)
                })
        }
    },
    getters: {
        orderList(state){
            let orderList = []
            for (let order in state.orders){
                orderList.push({
                    id: state.orders[order].id,
                    count: state.orders[order].count,
                    status: (state.statuses.find(item => item.id === state.orders[order].statusId)).name,
                    name: (state.products.find(item => item.id === state.orders[order].productId)).name,
                    price: (state.products.find(item => item.id === state.orders[order].productId)).price,
                    photoUrl: (state.products.find(item => item.id === state.orders[order].productId)).photoUrl,
                })
            }
            return orderList
        },
        productList(state){
            return state.products
        },
        statusesList(state){
            return state.statuses
        }
    }
})
