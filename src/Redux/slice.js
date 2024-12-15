import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchProducts: [],
    searchInput: '',
    data: [],
    grandPrice: 0,
    badge: 0,
}

export const slice = createSlice({
    name: 'searchData',
    initialState,
    reducers: {
        getSearchData: (state, action) => {
            state.searchProducts = action.payload.searchAllData;
            state.searchInput = action.payload.searchSingleValue;
        },
        addCart: (state, action) => {
            // debugger
            let tempData = state.data.find((item) => {
                return item.id === action.payload.id;
            })

            if (!tempData) {
                state.data.push(action.payload);
                action.payload.qty = 1;
                action.payload.totalprice = Math.round(action.payload.price);

                state.badge += 1;
            }

            // GrandPrice
            let gt = 0;
            state.data.map((item) => {
                gt += item.totalprice;
                return state.grandPrice = gt;
            })

        },
        incrementQty: (state, action) => {
            // QTY
            state.data[action.payload].qty += 1;

            // Total Price
            state.data[action.payload].totalprice = state.data[action.payload].qty * Math.round(state.data[action.payload].price);

            // Grand Price
            state.grandPrice += Math.round(state.data[action.payload].price);

        },
        decrementQty: (state, action) => {

            // Minimum Qty 1
            if (state.data[action.payload].qty > 1) {

                // QTY
                state.data[action.payload].qty -= 1;
            }

            // minimum TotalPrice = Price
            if (state.data[action.payload].totalprice > state.data[action.payload].price) {

                // Total Price
                state.data[action.payload].totalprice -= Math.round(state.data[action.payload].price);

                // Grand Price
                state.grandPrice -= Math.round(state.data[action.payload].price);
            }
        },
        removeItem: (state, action) => {

            let ri = state.data.filter((item) => {
                return item.id !== action.payload.id;
            })

            state.data = ri;

            // Remove Item Ni Total Price Minus of the GrandPrice
            state.grandPrice -= action.payload.totalprice;

            // Badge
            state.badge -= 1;

            // console.log(action.payload);
        }
    },
})

// Action creators are generated for each case reducer function
export const { getSearchData, addCart, incrementQty, decrementQty, removeItem } = slice.actions

export default slice.reducer