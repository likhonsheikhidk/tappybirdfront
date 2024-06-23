import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userSlice from './reducers/userReducer';
import tasksSlice from './reducers/tasksReducer';
import inventorySlice from './reducers/inventoryReducer';
import modalsSlice from './reducers/modalsReducer';
import userleadersSlice from './reducers/userleadersReducer';
import squadsSlice from './reducers/squadsReducer';
import friendsSlice from './reducers/friendsReducer';
const store = configureStore({
	reducer: {
		user: userSlice,
		inventory: inventorySlice,
		tasks: tasksSlice,
		modals: modalsSlice,
		userLeaders: userleadersSlice,
		squads: squadsSlice,
		friends: friendsSlice
	},
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
