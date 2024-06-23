import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import FooterModalInvite from 'components/FooterModalInvite';
import { useAppSelector } from 'store';
import CloseButton from '../CloseButton';

import c from './SquadDetailModal.module.scss';
import { formatLinks } from 'utils/formatLinkToName';

interface SquadDetailModalProps {
	closeModal: () => void;
	isOpen: boolean;
}

const links = {
	path: 'https://t.me/testtappybird_bot',
	text: 'Hello world!',
};

function SquadDetailModal({ closeModal, isOpen }: SquadDetailModalProps) {
	const [active, setActive] = useState<'default' | 'show' | 'close'>('default');

	const squadId = useAppSelector((state) => state.user.user.squad);
	const { squads } = useAppSelector((state) => state.squads);

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

	const squad = useMemo(() => {
		if (squadId) {
			return squads.find((elem) => squadId === elem.id);
		}
		return null;
	}, [squadId]);

	if (!squad) return null;

	return (
		<div
			className={classNames({
				[c.container]: true,
				[c.isActive]: active === 'show',
				[c.isClose]: active === 'close',
			})}
		>
			<div className={c.wrapper}>
				<CloseButton handleCloseModal={handleCloseModal} />
				<div className={c.content}>
					<div className={c.header}>
						<span>Your squad</span>
						<h3>{formatLinks(squad.nickname)}</h3>
					</div>
					<div className={c.body}>
						<div className={c.bodyColumn}>
							<span>Place</span>
							<h4>162</h4>
						</div>
						<div className={c.bodyColumn}>
							<span>Coins</span>
							<h4>100К</h4>
						</div>
					</div>
					<FooterModalInvite name={squad.nickname} links={links} />
				</div>
			</div>
		</div>
	);
}

export default SquadDetailModal;
