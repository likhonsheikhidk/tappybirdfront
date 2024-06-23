import { IUser } from 'types/user.types';

const endpoint = process.env.REACT_APP_API || 'http://localhost:3000';

class fetchUser {
	private path = `${endpoint}/user`;

	async getUser(): Promise<IUser> {
		const response = await fetch(this.path);
		if (!response.ok) {
			throw new Error('Error: something went wrong!');
		}
		const result = await response.json();
		return result;
	}

	async authorize(): Promise<any> {
		const response = await fetch('https://tappyback.ton-runes.top/authorize', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				// Данные, которые необходимо отправить на сервер
				username: 'yourUsername',
				password: 'yourPassword',
			}),
		});

		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}

		const result = await response.json();
		return result;
	}
	async Minecoin(userId: number): Promise<any> {
		const response = await fetch('https://tappyback.ton-runes.top/minecoin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				
			}),
		});

		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}

		const result = await response.json();
		return result;
	}
	async buyBooster(userId: number, sign: string, boosterName:string): Promise<any> {
		const response = await fetch('https://tappyback.ton-runes.top/buybooster', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				sign: sign,
				booster_name: boosterName
			}),
		});

		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}

		const result = await response.json();
		return result;
	}

	async  sendSuccessfulTransaction(userId: number, amount: number): Promise<any> {
		const response = await fetch('https://tappyback.ton-runes.top/successful_transaction', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				sign: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbiJ9.B1jT-B1TTgbcAyaOHnClenZzU0f18364UvOYpyKItW8',
				amount: amount
			}),
		});
	
		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}
	
		const result = await response.json();
		return result;
	}
	async getRefs(userId:number):Promise<any>{
		const response = await fetch('https://tappyback.ton-runes.top/get_refs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				sign:0
				
			}),
		});

		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}

		const result = await response.json();
		return result;
	}

	async getMoneyForRef(userId:number, refId:number):Promise<any>{
		const response = await fetch('https://tappyback.ton-runes.top/get_coins_for_ref', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				refId: refId,
				sign:0
			}),
		});

		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}

		const result = await response.json();
		return result;
	}


	async buyShopItem(userId: number, sign: string, item:string): Promise<any> {
		const response = await fetch('https://tappyback.ton-runes.top/buyshopitem', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				sign: sign,
				item: item
			}),
		});

		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}

		const result = await response.json();
		return result;
	}

	async createSquad(userId: number, sign: string, link: string): Promise<any> {
		const response = await fetch('https://tappyback.ton-runes.top/create_squad', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				sign: sign,
				link: link
			}),
		});
	
		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}
	
		const result = await response.json();
		return result;
	}

	async fetchTasksForGeo(userId: number, sign: string): Promise<any> {
		const response = await fetch('https://tappyback.ton-runes.top/fetch_tasks_for_geo', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				sign: sign
			}),
		});
	
		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}
	
		const result = await response.json();
		return result;
	}
	
	async joinSquad(userId: number, sign: string, squadId:number): Promise<any> {
		const response = await fetch('https://tappyback.ton-runes.top/join_squad', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				sign: sign,
				squadId:squadId
			}),
		});
	
		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}
	
		const result = await response.json();
		return result;
	}
	

	async checkIsTaskCompleted(userId:number, taskId:number, sign:string) {
		const response = await fetch('https://tappyback.ton-runes.top/check_is_task_completed', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'sign': sign  // Пример заголовка sign
			},
			body: JSON.stringify({
				userId: userId,
				taskId: taskId
			}),
		});
	
		if (!response.ok) {
			throw new Error('Error: Failed to check task completion!');
		}
	
		const result = await response.json();
		return result;
	}

	async getUsersLeaderboard() {
		const response = await fetch('https://tappyback.ton-runes.top/usersleaderboard', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	
		if (!response.ok) {
			throw new Error('Error: Could not fetch leaderboard!');
		}
	
		const usersLeaders = await response.json();
		return usersLeaders;
	}
	async getSquadsLeaderboard() {
		const response = await fetch('https://tappyback.ton-runes.top/squadsleaderboard', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	
		if (!response.ok) {
			throw new Error('Error: Could not fetch leaderboard!');
		}
	
		const usersLeaders = await response.json();
		return usersLeaders;
	}

	
}

export const FetchUser = new fetchUser();
