import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface modalsProps {
	isModalCheckingStatus: {
		isOpen: boolean;
		isSuccess: boolean;
	};
	isModalSubtask: {
		isOpen: boolean;
		id: number | null;
	};
	isModalSquadState: {
		isOpen: boolean;
		name: string;
		isCreated: boolean;
	};
	isModalInvite: boolean;
	isModalPayment: boolean;
	isModalPaymentSuccess: boolean;
	isModalInsufficientFunds: boolean;
}

const initialState: modalsProps = {
	isModalCheckingStatus: {
		isOpen: false,
		isSuccess: false,
	},
	isModalSubtask: {
		isOpen: false,
		id: null,
	},
	isModalSquadState: {
		isOpen: false,
		name: '',
		isCreated: false,
	},
	isModalInvite: false,
	isModalPayment: false,
	isModalPaymentSuccess: false,
	isModalInsufficientFunds: false,
};

const modalsSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		changeIsModalCheckingStatus(state, action: PayloadAction<boolean>) {
			if (action.payload) {
				state.isModalCheckingStatus = {
					isOpen: true,
					isSuccess: true,
				};
			} else {
				state.isModalCheckingStatus = {
					isOpen: false,
					isSuccess: false,
				};
			}
		},
		changeIsModalSubtask(
			state,
			action: PayloadAction<{
				isOpen: boolean;
				id: number;
			}>
		) {
			if (action.payload.isOpen) {
				state.isModalSubtask = {
					isOpen: true,
					id: action.payload.id,
				};
			} else {
				state.isModalSubtask = {
					isOpen: false,
					id: null,
				};
			}
		},
		changeIsModalSquadState(
			state,
			action: PayloadAction<{
				isOpen: boolean;
				name?: string;
				isCreated?: boolean;
			}>
		) {
			if (action.payload.isOpen) {
				state.isModalSquadState = {
					isOpen: true,
					name: action.payload.name!,
					isCreated: action.payload.isCreated!,
				};
			} else {
				state.isModalSquadState = { isOpen: false, name: '', isCreated: false };
			}
		},
		changeIsModalInvite(state, action: PayloadAction<boolean>) {
			if (action.payload) {
				state.isModalInvite = true;
			} else {
				state.isModalInvite = false;
			}
		},
		changeIsModalPayment(state, action: PayloadAction<boolean>) {
			if (action.payload) {
				state.isModalPayment = true;
			} else {
				state.isModalPayment = false;
			}
		},
		changeIsModalPaymentSuccess(state, action: PayloadAction<boolean>) {
			if (action.payload) {
				state.isModalPaymentSuccess = true;
			} else {
				state.isModalPaymentSuccess = false;
			}
		},
		changeIsModalInsufficientFunds(state, action: PayloadAction<boolean>) {
			if (action.payload) {
				state.isModalInsufficientFunds = true;
			} else {
				state.isModalInsufficientFunds = false;
			}
		},
	},
});

export const {
	changeIsModalCheckingStatus,
	changeIsModalSubtask,
	changeIsModalSquadState,
	changeIsModalInvite,
	changeIsModalPayment,
	changeIsModalPaymentSuccess,
	changeIsModalInsufficientFunds,
} = modalsSlice.actions;

export default modalsSlice.reducer;
