import { SHOPLIST } from 'constants/cardsList';

import c from './ShopBody.module.scss';
import { FetchUser } from 'api/user';
import { useAppSelector } from 'store';
import { setTappyCoin } from 'store/reducers/userReducer';
import { useAppDispatch } from 'store';
import { setLevel, changeExp, changeCoin } from 'store/reducers/userReducer';
import { changeIsModalInsufficientFunds } from 'store/reducers/modalsReducer';

function ShopBody() {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);
	
	const buyShopItem = async (item_name:string) => {
		try {

			const result = await FetchUser.buyShopItem(user.id, user.sign, item_name);
			
			console.log('Minecoin request successful:', result);
			return result
		} catch (error) {
			console.error('Minecoin request failed:', error);
		}
	};
	const buyShopItemHandler = (item_name:string, price:number) => {
		return async (event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			if (user.balance_in_tappycoin < price){
				dispatch(changeIsModalInsufficientFunds(true));
				return;
			}
			const result = await buyShopItem(item_name).then(json=>{
				
				console.log(json)
				if (json){
					dispatch(setTappyCoin(json.balance_in_tappycoin))
					dispatch(changeExp(json.exp))
					dispatch(setLevel(json.current_level_of_egg))
					dispatch(changeCoin(json.coins))

				}
			});
			// Можно что-то сделать с результатом, если нужно
			console.log(result);
		};
	};
	return (
		<div className={c.shopBody}>
			{SHOPLIST.map((elem) => (
				<div className={c.shopBodyCard} key={elem.id}>
					<img src={elem.img} alt={elem.title} className={c.shopBodyCardImg} />
					<h3 className={c.shopBodyCardTitle}>{elem.title}</h3>
					<span className={c.shopBodyCardSubtitle}>{elem.subtitle}</span>
					<button type="button" className={c.shopBodyCardButton} onClick={buyShopItemHandler(elem.title, parseInt(elem.price))}> 
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
