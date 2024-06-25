import { Outlet } from 'react-router-dom';

import c from './Layout.module.scss';
import PaymentModal from 'components/modals/PaymentModal';
import { useAppDispatch, useAppSelector } from 'store';
import {
	changeIsModalInsufficientFunds,
	changeIsModalPayment,
	changeIsModalPaymentSuccess,
	changeIsModalPurchase,
} from 'store/reducers/modalsReducer';
import SuccessIcon from 'assets/icons/SuccessIcon';
import CustomModal from 'components/modals/CustomModal';

function Layout() {
	const dispatch = useAppDispatch();
	const {
		isModalPayment,
		isModalPaymentSuccess,
		isModalInsufficientFunds,
		isModalPurchase,
	} = useAppSelector((state) => state.modals);

	return (
		<div className={c.container}>
			<div className={c.firstCloud} />
			<div className={c.secondCloud} />
			<div className={c.thirdCloud} />
			<Outlet />
			{isModalPayment && (
				<PaymentModal
					isOpen={isModalPayment}
					closeModal={() => dispatch(changeIsModalPayment(false))}
				/>
			)}
			{isModalPaymentSuccess && (
				<CustomModal
					isOpen={isModalPaymentSuccess}
					closeModal={() => dispatch(changeIsModalPaymentSuccess(false))}
					title={<SuccessIcon />}
					children={<p className={c.successText}>Balance is replenished</p>}
					closeButton="Close"
				/>
			)}
			{isModalInsufficientFunds && (
				<CustomModal
					isOpen={isModalInsufficientFunds}
					closeModal={() => dispatch(changeIsModalInsufficientFunds(false))}
					title="❌"
					children={
						<p className={c.successText}>You don't have enough coins to buy</p>
					}
				/>
			)}
			{isModalPurchase && (
				<CustomModal
					isOpen={isModalPurchase}
					closeModal={() => dispatch(changeIsModalPurchase(false))}
					title="✅"
					children={<p className={c.successText}>Successful purchase</p>}
				/>
			)}
		</div>
	);
}

export default Layout;
