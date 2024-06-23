import { useEffect, useRef } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import HeaderField from 'components/ShopHeader';
import GoBack from 'components/GoBack';

import c from './EarnMorePage.module.scss';
import CustomModal from 'components/modals/CustomModal';
import { useAppDispatch, useAppSelector } from 'store';
import {
	changeIsModalCheckingStatus,
	changeIsModalInvite,
	changeIsModalSubtask,
} from 'store/reducers/modalsReducer';
import SubTasksModal from 'components/modals/SubTasksModal';
import InviteFriendsModal from 'components/modals/InviteFriendsModal';


function EarnMorePage() {

	const params = useParams();
	const ref = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	const { isModalCheckingStatus, isModalSubtask, isModalInvite } =
		useAppSelector((state) => state.modals);

	useEffect(() => {
		if (ref.current) {
			ref.current.scrollTo(0, 0);
		}
	}, [params]);

	return (
		<div className={c.container}>
			<div className={c.earnMore} ref={ref}>
				<HeaderField
					title="EARN MORE"
					src="/assets/earn-more/header.png"
					titleStyle={c.title}
				/>
				<Outlet />
				<GoBack />
			</div>
			{isModalCheckingStatus.isOpen && (
				<CustomModal
				isOpen={isModalCheckingStatus.isOpen}
				closeModal={() => {
					dispatch(changeIsModalCheckingStatus(false));
				}}
				title={isModalCheckingStatus.isSuccess ? 'success 🎉' : 'failed :('}
			>
				{isModalCheckingStatus.isSuccess
					? 'Задание успешно выполнено'
					: 'Убедитесь, что Вы выполнили все условия PFLFили попробуйте позже.'}
			</CustomModal>
			)}
			{isModalSubtask.isOpen && (
				<SubTasksModal
					isOpen={isModalSubtask.isOpen}
					id={isModalSubtask.id!}
					closeModal={() => {
						dispatch(
							changeIsModalSubtask({
								isOpen: false,
								id: 0,
							})
						);
					}}
				/>
			)}
			{isModalInvite && (
				<InviteFriendsModal
					isOpen={isModalInvite}
					closeModal={() => {
						dispatch(changeIsModalInvite(false));
					}}
				/>
			)}
		</div>
	);
}

export default EarnMorePage;
