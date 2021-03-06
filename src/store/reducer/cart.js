import * as TYPES from "../action-types";
let init_state = {

    unPay: [], //购物车数据
    Pay: [], //支付成功的数据
    unSuccess: [], //未支付成功
    allCart: [], //所有的数据
    all: false,
    prices: 0,
    nums: 0,
    fahuo: []
};

function filterData(data, state) {

    data.allCart.forEach(item => {
        item.isCheck ? (item.state = state) : null;
    });
    console.log(data.allCart);
    data.unPay = data.allCart.filter(item => item.state === -1);
    data.unSuccess = data.allCart.filter(item => item.state === 1);
    data.Pay = data.allCart.filter(item => item.state === 2);

    data.allCart.forEach(item => {
        item.isCheck ? (item.state = state) : null;
    });
    data.unPay = data.allCart.filter(item => (item.state === -1));
    data.unSuccess = data.allCart.filter(item => (item.state === 1));
    data.Pay = data.allCart.filter(item => (item.state === 2));

}

export default function cart(state = init_state, action) {
    state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case TYPES.GET_CART:
            let {code, data} = action.payload;
            if (parseFloat(code) === 0) {
                switch (action.state) {
                    case 0:
                        state.allCart = data;
                        break;
                    case -1:
                        state.unPay = data;
                        break;
                    case 1:
                        state.unSuccess = data;
                        break;
                    case 2:
                        state.Pay = data;
                        break;
                    default:
                        state.unPay = data;
                }
            }
            break;
        case TYPES.REMOVE_CAR:
            state.unPay = state.unPay.filter(item => !item.isCheck);
            break;
        case TYPES.SET_NUM:
            let {shopId, num, time} = action.payload,
                result = state.unPay.find(item => item.id == shopId && item.time == time);
            if (result) {
                result.num = parseFloat(num);
                if (result.isCheck) {
                    let nums = 0,
                        prices = 0;
                    state.unPay.forEach((item) => {
                        if (item.isCheck) {
                            nums += parseFloat(item.num);
                            prices += item.num * item.price;
                        }
                    });
                    state.nums = nums;
                    state.prices = prices;
                }
            }
            ;

            break;
        case TYPES.ADD_CAR: {
            let {code, data} = action.payload;
            code === 0 ? (state.unPay = data) : null;
        }

            break;
        case TYPES.CART_PAY:
            filterData(state, 2);
            break;
        case TYPES.CART_UNSUCCESS:
            filterData(state, 1);
            break;
        case TYPES.CHECKED:
            state.unPay.forEach(
                item =>
                    item.time == action.time ? (item.isCheck = !item.isCheck) : null
            );
            state.all = state.unPay.every(item => item.isCheck);
            let nums = 0,
                prices = 0;
            state.unPay.forEach((item) => {
                if (item.isCheck) {
                    nums += parseFloat(item.num);
                    prices += item.num * item.price;
                }
            });
            state.nums = nums;
            state.prices = prices;
            break;
        case TYPES.SINGLE:
            state.allCart.forEach(item => {
                item.time == action.obj.time ? item.state = 2 : null;
            });
            state.unPay = state.allCart.filter(item => item.state === -1);
            state.unSuccess = state.allCart.filter(item => item.state === 1);
            state.Pay = state.allCart.filter(item => item.state === 2);
            break;
        case TYPES.CANCEL:
            state.allCart = state.allCart.filter(item => item.time !== action.obj.time);
            state.unPay = state.allCart.filter(item => item.state === -1);
            state.unSuccess = state.allCart.filter(item => item.state === 1);
            state.Pay = state.allCart.filter(item => item.state === 2);
            break;
        case TYPES.ALLCEHCKED:
            state.all = !state.all;
            state.allCart.forEach(item => {
                item.state === -1 ? (item.isCheck = state.all) : null;
            });
            state.unPay.forEach(item => {
                item.state === -1 ? (item.isCheck = state.all) : null;
            });
            /////
            if (state.all) {
                let prices = nums = 0;
                state.unPay.forEach(item => {
                    let {price, num} = item;
                    prices += price * num;
                    nums += parseFloat(num);
                });
                state.prices = prices;
                state.nums = nums;
            } else {
                state.prices = 0;
                state.nums = 0;
            }
            break;
        case TYPES.FAHUO:
            state.fahuo = [];
            break;
        case TYPES.ORDER_GET_ALL:
            state.allCart = state.allCart
            break;
        case TYPES.GETALLCHECKED:
            if (state.unPay.length===0){
                state.all=false;
            }else {
                state.all=state.unPay.every(item=>item.isCheck);
            }

            break;
    }
    return state;
}



