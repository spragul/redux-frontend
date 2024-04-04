import {configureStore} from '@reduxjs/toolkit';
import productreducer from './productSlice';
import cartreducer from './cartSilce'
import orderreducer from './orderSilce';
import userreducer from './userSilce'



export const store =configureStore({
    reducer:{
        productapireducer:productreducer,
        cartapireducer:cartreducer,
        orderapireducer:orderreducer,
        userapireducer:userreducer
    }
})