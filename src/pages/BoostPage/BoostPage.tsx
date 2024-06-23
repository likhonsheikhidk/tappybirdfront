import { useState } from 'react';

import HeaderField from 'components/ShopHeader';
import BoostBody from 'components/BoostBody';
import GoBack from 'components/GoBack';
import CustomModal from 'components/modals/CustomModal';
import c from './BoostPage.module.scss';

function BoostPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className={c.container}>
			<div className={c.boost}>
			<HeaderField title="Boost" src="/assets/boost/header.png" />
				<BoostBody openModal={handleOpenModal} />
				<GoBack />
			</div>
			<CustomModal
				isOpen={isModalOpen}
				closeModal={handleCloseModal}
				title="Title about"
			>
				This is a model with text, some kind of thought
			</CustomModal>
		</div>
	);
}

export default BoostPage;
