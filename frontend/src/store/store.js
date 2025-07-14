import {configureStore} from '@reduxjs/toolkit'
import tasksReducer from "./taskSlice"

const store = configureStore({
    reducer: {
        user: tasksReducer
    }
})
export default store;