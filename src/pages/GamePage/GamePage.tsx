import { TouchEvent, useCallback, useEffect, useState } from 'react';
import { changeSquad, setSign, setUserId, setUsername } from 'store/reducers/userReducer';
import GameHeader from 'components/GameHeader';
import GameBody from 'components/GameBody';
import GameFooter from 'components/GameFooter';
import { useAppDispatch, useAppSelector } from 'store';
import { useRef } from 'react';
import { setLeaders } from 'store/reducers/userleadersReducer';
import { setFriends } from 'store/reducers/friendsReducer';
import EggsEmptyModal from 'components/modals/EggsEmptyModal';
import {
	setBoosters,
	setHammers,
	changeCoin,
	changeEnergy,
	changeExp,
	changeLevel,
	setTappyCoin,
	setLimitenergy,
	setLevel,
	setLimitExp,
	setCompletedtasks,
	setInviteLink,
	setUsersBirds
} from 'store/reducers/userReducer';
import { FetchUser } from 'api/user';
import { setTasks } from 'store/reducers/tasksReducer';
import 'styles/damage.scss';
import c from './GamePage.module.scss';
import ConfirmBirdModal from 'components/modals/ConfirmBirdModal';
import { EGGS_LIMITS } from 'constants/eggsSource';
import { setBirds } from 'store/reducers/inventoryReducer';
import { testBird } from 'constants/cardsList';
import { setSquads } from 'store/reducers/squadsReducer';
import { socket } from 'index';
import TopUpModal from 'components/TopUpModal/TopUpModal';
import { useNavigate } from 'react-router-dom';

function GamePage() {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);
	const { tasks } = useAppSelector((state) => state.tasks);
	const [isEggsEmptyModal, setIsEggsEmptyModal] = useState(false);
	const navigate = useNavigate();
	const userLeaders = useAppSelector(state=>state.userLeaders)
	console.log(userLeaders.leaders)
	const [confirmItem, setConfirmItem] = useState(false);
	const [userData, setUserData] = useState(null)
	let invitCode:number  = 0;
	if (window.location.pathname.includes('/game/')){
	invitCode =Number(window.location.pathname.split('/game/')[1])
}
	const [newBird, setNewBird] = useState({
		id: 1,
		src: '/assets/inventory/Exclusive_1.jpg',
		title: 'Bird #1',
		tier: 'Exclusive',
	})
	const [isConnected, setIsConnected] = useState(false)
	const fetchTasksForGeo = async (userId:number, sign:string) => {
		try {
			const result = await FetchUser.fetchTasksForGeo(userId, sign);
			
			console.log('fetchTasksForGeo successful:', result);
			return result
		} catch (error) {
			console.error('fetchTasksForGeo failed:', error);
		}
	};
	console.log(user)
	if (user.id!=0  && tasks.length == 0 ){
		fetchTasksForGeo(user.id, user.sign).then(json=>{
			console.log(json)
			dispatch(setTasks(json))
		})
	}

	const showDamage = useCallback(
		(coords: { coordX: number; coordY: number }, tap:number) => {
			const damage = document.createElement('div');
			damage.classList.add(`damage`);
			damage.textContent = `+${tap}`;
			damage.style.top = `${coords.coordY - 10}px`;
			damage.style.left = `${coords.coordX - 10}px`;
			document.body.append(damage);

			setTimeout(() => {
				damage.remove();
			}, 1000);
		},
		[]
	);

	const handleClickEgg = useCallback(
		(e: TouchEvent<HTMLDivElement>) => {
			if (user.energy === 0) return;
			if (user.level === 7 && user.exp >= user.limitExp - user.tap) {
				dispatch(changeExp(user.limitExp));
				setIsEggsEmptyModal(true);
				return;
			}
			const coords = {
				coordX: e.changedTouches[0].pageX,
				coordY: e.changedTouches[0].pageY,
			};
			const result = fetchMinecoin(user.id).then(json=>{
				console.log(json)
				if (json == 'buy egg'){
					
				}
				showDamage(coords, json.brds_for_tap);
				dispatch(changeEnergy(json.energy))
			if (json.current_level_of_egg > user.level){
				if (json.new_bird){
					setNewBird(json.new_bird)
					dispatch(setUsersBirds([...user.birds, json.new_bird]))
				}

				setConfirmItem(true);
				dispatch(setLimitExp(EGGS_LIMITS[json.current_level_of_egg-1]['hp']))
				dispatch(setLevel(json.current_level_of_egg))
				dispatch(changeExp(json.exp))
				dispatch(changeCoin(json.coins));
				return
			}
		/* 	if (user.exp >= user.limitExp - user.tap) {
				dispatch(changeExp(user.limitExp));
				setConfirmItem(true);
				return;
			} */
			window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
			if (json.current_level_of_egg >1){
			dispatch(changeExp(json.exp));
			}
			else{
				dispatch(changeExp(json.exp))
			}
			dispatch(changeCoin(json.coins));
			})
	
			
		},
		[user]
	);
	const fetchMinecoin = async (userId:number) => {
		try {
			const result = await FetchUser.Minecoin(userId);
			
			console.log('Minecoin request successful:', result);
			return result
		} catch (error) {
			console.error('Minecoin request failed:', error);
		}
	};
	useEffect(() => {
		window.addEventListener('beforeunload', function(event) {
			// Создаем запрос
			fetch('http://localhost:8000/disconnect_ws', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					sign: user.sign, // Здесь должна быть реальная подпись
					user_id: user.id // Здесь должен быть реальный user_id
				})
			}).catch(error => console.error('Ошибка при отправке запроса:', error));
		
			// Для некоторых браузеров требуется вернуть значение, чтобы показать диалоговое окно подтверждения
			var confirmationMessage = 'Are you sure you want to leave?';
			event.returnValue = confirmationMessage;
			return confirmationMessage;
		});
		socket.onmessage = function(event) {
			let data = event.data
		
			data = JSON.parse(data)
		
			if (data.eventname == 'energy_replenishment'){
				console.log('energy_replenishment')
				console.log(data)
				console.log([data.id, user.id, data.id==user.id])
				if (data.id==user.id){
					console.log([data.id, user.id])
					dispatch(changeEnergy(data.energy))
					console.log(data)
				}
			}

		}
		const fetchAuthorization = async (initdata:string, invcitCode:number) => {
			try {
				const result = await FetchUser.authorize(initdata, invcitCode);
				
				console.log('Authorization successful:', result);
				return result
			} catch (error) {
				console.error('Authorization failed:', error);
			}
		};
		const fetchSquadLeaders = async () => {
			try {
				const result = await FetchUser.getSquadsLeaderboard();
				
				console.log('Authorization successful:', result);
				return result
			} catch (error) {
				console.error('Authorization failed:', error);
			}
		};

		const fetchUserLeaders = async () => {
			try {
				const result = await FetchUser.getUsersLeaderboard();
				
				console.log('Authorization successful:', result);
				return result
			} catch (error) {
				console.error('Authorization failed:', error);
			}
		};

		const getRefs = async (userId:number) => {
			try {
				const result = await FetchUser.getRefs(userId);
				
				console.log('Authorization successful:', result);
				return result
			} catch (error) {
				console.error('Authorization failed:', error);
			}
		};

		
		if (user.id==0){
		fetchSquadLeaders().then(
			json=>{
				dispatch(setSquads(json))
			}
		)

		fetchUserLeaders().then(json=>{
			console.log(json)
			dispatch(setLeaders(json))
		})
		var WebApp = window.Telegram.WebApp; 
		const result = fetchAuthorization(WebApp.initData , invitCode).then(json=>{
			
			
			if (json)
			{
				dispatch(setUsername(json.name))
			dispatch(setUsersBirds(json.birds))
			dispatch(setUserId(json.id))
			dispatch(setInviteLink(json.invite_link))
			dispatch(setSign(json.sign))
			dispatch(changeCoin(json.coins))
			dispatch(setBoosters(json.boosters))
			dispatch(setHammers(json.hammers))
			dispatch(setLimitExp(EGGS_LIMITS[json.current_level_of_egg-1]['hp']))
			dispatch(setLevel(json.current_level_of_egg))
			dispatch(changeSquad(json.in_squad))
			dispatch(setCompletedtasks(json.completed_tasks))
			dispatch(setTappyCoin(json.balance_in_tappycoin))
			dispatch(setLimitenergy(json.max_energy))

			if (json.current_level_of_egg >1){
				dispatch(changeExp(json.exp));
				}
				else{
					dispatch(changeExp(json.exp))
				}
				console.log(json.id)	}
			
		})
		
	}
	else{
		getRefs(user.id).then(json=>{
			if (json){
			dispatch(setFriends(json))
			setIsConnected(true)
		}
			
		})
	
	}
		const interval = setInterval(() => {
			if (user.energy !== user.limitEnergy) {
				if (user.energy > user.limitEnergy - 3) {
					dispatch(changeEnergy(user.limitEnergy));
					return () => clearInterval(interval);
				}
		/* 		dispatch(changeEnergy(user.energy + 3)); */
			}
		}, 1000);
		return () => {clearInterval(interval);
			socket.onmessage = null;


		}
	}, [user]);



	const [value, setValue] = useState('');
	const platform = Telegram.WebApp.platform;



	return (
		(isConnected ? <div className={c.container} onTouchEnd={(event) => event.preventDefault()}>
		
			<GameHeader />
			<GameBody handleClickEgg={handleClickEgg} />
			<GameFooter />
			{isEggsEmptyModal && (
				<EggsEmptyModal
					isOpen={isEggsEmptyModal}
					closeModal={() => setIsEggsEmptyModal(false)}
				/>
			)}
			{confirmItem && (
				<ConfirmBirdModal
					isOpenModal={confirmItem}
					bird={newBird}
					closeModal={() => {
						setConfirmItem(false);
					/* 	dispatch(changeExp(0)); */
						/* dispatch(changeLevel(user.level + 1)); */
						dispatch(setBirds(testBird[user.level - 1]));
					}}
				/>
			)}
		</div> : <div></div>)
	);
}

export default GamePage;
