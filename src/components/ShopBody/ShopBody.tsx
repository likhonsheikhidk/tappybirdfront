import { SHOPLIST } from 'constants/cardsList';
import { EGGS_LIMITS } from 'constants/eggsSource';
import c from './ShopBody.module.scss';
import { FetchUser } from 'api/user';
import { useAppSelector } from 'store';
import { setLimitExp, setTappyCoin } from 'store/reducers/userReducer';
import { useAppDispatch } from 'store';
import { setLevel, changeExp, changeCoin } from 'store/reducers/userReducer';
import {
	changeIsModalInsufficientFunds,
	changeIsModalPurchase,
} from 'store/reducers/modalsReducer';
import { useState } from 'react';
import EggsEmptyModal from 'components/modals/EggsEmptyModal';

function ShopBody() {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);
	const [isEggsEmptyModal, setIsEggsEmptyModal] = useState(false);
	const buyShopItem = async (item_name: string) => {
		try {
			const result = await FetchUser.buyShopItem(user.id, user.sign, item_name);

			console.log('Minecoin request successful:', result);
			return result;
		} catch (error) {
			console.error('Minecoin request failed:', error);
		}
	};
	const buyShopItemHandler = (item_name: string, price: number) => {
		return async (event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			if (user.balance_in_tappycoin < price) {
				dispatch(changeIsModalInsufficientFunds(true));
				return;
			}
			const result = await buyShopItem(item_name).then((json) => {
				console.log(json);
				if (json) {
					if (!(typeof json == 'object')){
						setIsEggsEmptyModal(true)
							return
					}

					if (!('coins' in json))
						{
							setIsEggsEmptyModal(true)
							return
						}
					dispatch(setTappyCoin(json.balance_in_tappycoin));
					if (json.current_level_of_egg == 0){
						dispatch(setLimitExp(EGGS_LIMITS.slice(-1)[0]['hp']))
					}
					else{
					dispatch(setLimitExp(EGGS_LIMITS[json.current_level_of_egg-1]['hp']))}
					dispatch(changeExp(json.exp));
					dispatch(setLevel(json.current_level_of_egg));
					dispatch(changeCoin(json.coins));
					dispatch(changeIsModalPurchase(true));
				}
			});
			// Можно что-то сделать с результатом, если нужно
			console.log(result);
		};
	};
	return (
		<div className={c.shopBody}>
				{isEggsEmptyModal && (
				<EggsEmptyModal
					isOpen={isEggsEmptyModal}
					closeModal={() => setIsEggsEmptyModal(false)}
				/>
			)}
			{SHOPLIST.map((elem) => (
				<div className={c.shopBodyCard} key={elem.id}>
					<img src={elem.img} alt={elem.title} className={c.shopBodyCardImg} />
					<h3 className={c.shopBodyCardTitle}>{elem.title}</h3>
					<span className={c.shopBodyCardSubtitle}>{elem.subtitle}</span>
					<button
						type="button"
						className={c.shopBodyCardButton}
						onClick={buyShopItemHandler(elem.title, parseInt(elem.price))}
					>
						<p className={c.shopBodyCardButtonTxt}>
							{elem.price} {elem.isCoin ? '' : '$Tappy'}
						</p>
						{elem.isCoin && (
							<img
								src="/assets/coin.png"
								alt="coin"
								className={c.shopBodyCardButtonImg}
							/>
						)}
					</button>
				</div>
			))}
		</div>
	);
}

export default ShopBody;
