import { useEffect, useState } from 'react';
import classNames from 'classnames';
import CloseButton from '../CloseButton';
import FooterModalInvite from 'components/FooterModalInvite';
import c from './InviteFriendsModal.module.scss';
import { useAppSelector } from 'store';
interface InviteFriendsModalProps {
	isOpen: boolean;
	closeModal: () => void;
}



function InviteFriendsModal({ isOpen, closeModal }: InviteFriendsModalProps) {
	const [active, setActive] = useState<'default' | 'show' | 'close'>('default');
	const {user} = useAppSelector(state=>state.user)
	console.log(user)
	const links = {
		path: user.inviteLink,
		text: 'Hello world!',
	};
	console.log(links)
	useEffect(() => {
		if (isOpen) {
			setActive('show');
		}
	}, [isOpen]);

	const handleCloseModal = () => {
		setActive('close');
		setTimeout(() => {
			setActive('default');
			closeModal();
		}, 300);
	};

	return (
		<div
			className={classNames({
				[c.container]: true,
				[c.isActive]: active === 'show',
				[c.isClose]: active === 'close',
			})}
		>
			<div className={c.content}>
				<CloseButton handleCloseModal={handleCloseModal} />
				<div className={c.body}>
					<span className={c.bodyText}>Invite a friend and get</span>
					<div className={c.bodyReward}>
						+5000 <img src="/assets/coin.png" alt="coin" />
					</div>
				</div>
				<FooterModalInvite name="t.me/testtappybird_bot" links={links} />
			</div>
		</div>
	);
}

export default InviteFriendsModal;
