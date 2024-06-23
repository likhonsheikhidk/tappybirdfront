import { Link } from 'react-router-dom';

import Screws from 'components/Screws';
import WelcomeHeader from 'components/WelcomeHeader';
import WelcomeBody from 'components/WelcomeBody';

import c from './WelcomePage.module.scss';
import LogoIcon from 'assets/icons/LogoIcon';
import { useEffect, useState } from 'react';
import QRModal from 'components/modals/QRModal';

function WelcomePage() {
	const [isDeviceCheck, setDeviceCheck] = useState(true);
	const platform = Telegram.WebApp.platform;

	// useEffect(() => {
	// 	switch (platform) {
	// 		case 'android':
	// 		case 'ios':
	// 			setDeviceCheck(true);
	// 			break;

	// 		default:
	// 			setDeviceCheck(false);
	// 			return;
	// 	}
	// }, [platform]);

	/* useEffect(() => {
		switch (platform) {
			case 'android':
			case 'ios':
				setDeviceCheck(true);
				break;

			default:
				setDeviceCheck(false);
				return;
		}
	}, [platform]) */
	useEffect(() => {
		window.Telegram.WebApp.expand();
	}, []);
	return (
		<div className={c.container}>
			{isDeviceCheck ? (
				<>
					<div className={c.wrapper}>
						<LogoIcon className={c.logo} />
						<div className={c.content}>
							<Screws />
							<WelcomeHeader />
							<WelcomeBody />
							<Screws />
						</div>
					</div>
					<Link to={'/game'} className={c.button}>
						<span className={c.buttonText}>PlAY NOW</span>
					</Link>
				</>
			) : (
				<QRModal />
			)}
		</div>
	);
}

export default WelcomePage;
