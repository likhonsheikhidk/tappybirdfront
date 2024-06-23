import { BOOSTLIST } from 'constants/cardsList';
import QuestionButton from 'components/QuestionButton';
import { formatCoin } from 'utils/formatCoin';
import { FetchUser } from 'api/user';
import c from './BoostBody.module.scss';
import { useAppSelector } from 'store';
import { json } from 'stream/consumers';
import { changeCoin, setLimitenergy } from 'store/reducers/userReducer';
import { useAppDispatch } from 'store';
import { changeIsModalInsufficientFunds } from 'store/reducers/modalsReducer';
interface BoostBodyProps {
	openModal: () => void;
}

function BoostBody({ openModal }: BoostBodyProps) {
	const { user } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const buyBooster = async (booster_name:string) => {
		try {
			const result = await FetchUser.buyBooster(user.id, user.sign, booster_name);
			
			console.log('Minecoin request successful:', result);
			return result
		} catch (error) {
			console.error('Minecoin request failed:', error);
		}
	};
	const buyHandler = (booster_name:string, price:number) => {
		return async (event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			if (user.coin < price){
				dispatch(changeIsModalInsufficientFunds(true));
				return;
			}


			const result = await buyBooster(booster_name).then(json=>{
			 dispatch(setLimitenergy(json.max_energy))
				dispatch(changeCoin(json.coins))

				console.log(json)
			});
			// Можно что-то сделать с результатом, если нужно
			console.log(result);
		};
	};
	return (
		<div className={c.wrapper}>
			{BOOSTLIST.map((elem) => (
				<div className={c.wrapperCard} key={elem.id} style={elem.style}>
					<div className={c.wrapperCardContent}>
						<img src={elem.icon} alt={elem.title} />
						<div className={c.wrapperCardContentTextWrapper}>
							<h3 className={c.wrapperCardContentTextWrapperTitle}>
								{elem.title}
							</h3>
							<span className={c.wrapperCardContentTextWrapperSubtitle}>
								{elem.subtitle}
							</span>
						</div>
					</div>
					<div className={c.wrapperCardActions}>
					<QuestionButton onClick={openModal} />
						<button className={c.wrapperCardActionsBtn} onClick={buyHandler(elem.title, elem.price)}>
							<span> BUY | {formatCoin(elem.price*(user.boosters[elem.title]['buff_level']+1))}</span>
							<img src="/assets/coin.png" alt="coin" />
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

export default BoostBody;
