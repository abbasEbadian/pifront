<template>
<div class="d-flex flex-wrap pt-5">
	<div class="col-12 col-lg-9">
		<section class="grid col-12 col-lg-6 col-md-8 mx-auto">

		<div class="form">

			<form action="" class="form d-flex flex-column align-items-stretch">
				<h2 class="text-center">Withdraw</h2>

			
				<label for="currency" class="mt-4 pb-2">Currency: </label>
				<select name="currency" id="" class="form-select" v-model="selectedCurrency">
					<option v-for="option in currencies" :key="option.value" :value="option.value" >
					{{ option.label}}
					</option>
				</select>

				
				<label for="amount"  class="mt-4 pb-2">Amount in {{ selectedCurrency }}: </label>
				<input type="number" name="amount" class="form-control"  v-model="formState.amount" step="0.1" />
				<small>Balance: {{ balance|| 0}}</small>
			
				<label for="address"  class="mt-4 pb-2">Address: </label>
				<input  name="address" class="form-control" v-model="formState.withdrawAddress" step="0.1"  />
				

				<button type="button" class="btn btn-primary" @click="_withdraw">Withdraw</button>
			</form>


		</div>
	</section>
	</div>
	<div class="col-12 col-lg-3 mt-5 mt-lg-0">
		<div class="mt-5">
			Withdraws:
			<div  v-if="user && user.withdraw_set && user.withdraw_set.length > 0">
				<template v-for="(f, index) in user&&user.withdraw_set||[]" >
					<div :key="index" >
						<hr />
						<span > {{ f.manupulated_amount + ' ' + f.currency}}</span>
						<p>Status: {{ f.status }}</p>
					</div>
				</template>
			</div>
			<span v-else><hr> No withdraws yet</span>

		</div>
	</div>
	<div class="col-12 col-lg-10 mx-auto">
		<h3 class="mt-5">Withdrawal fee table</h3>
		<table class="table">
			<thead>
				<tr>
					<th>#</th>
					<th>Currency</th>
					<th>Commision</th>
					<th>Network Fee</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(fee, index) in fees" :key="index">
					<td>{{ index+1 }}</td>
					<td>{{ fee.currency }}</td>
					<td>{{ fee.commission }}</td>
					<td>{{ fee.network_fee }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
	
</template>

<script>
import axios from 'axios'
import Swal from "sweetalert2";
import { reactive, ref, watch, h } from "vue";
import { deposit, get_pair_price, profile, withdraw, assets } from "../api";



export default {
	components: {
		
	},
	data() {
		return {
			user: {},
			loading: false,
			pair_loading: false,
			currencies: [],
			rawCurrencies: [],
			selectedCurrency: {},
			formState: {
				amount: 1,
				currency: "",
				test: 0,
				action:"deposit",
				withdrawAddress: ""
			},
			pair: "",
			pair_value:"",
			activeKey: '0',
			activeKey2: '0',
			fees: [],
			balance: 0


		}
	},
	methods: {
		
		openNotificationWithIcon :  (description) => console.log(description),
		handleChange : (value) => {
			this.selectedCurrency = value;
			let v = this.user && this.user.wallet_set && this.user.wallet_set.find(i=>i.currency && i.currency.alfaname === value)
			if(v){
				this.balance = v.amount
			}
		},
		_deposit() {
			this.loading = true;
			const storageValue = {
				amount: this.formState.amount,
				currency: this.selectedCurrency,
				url: "",
				id: "",
				status: "new",
				type: "Deposit"
			}
			deposit({ ...storageValue, test: this.formState.test }).then(e => {
				storageValue.url = e.url
				storageValue.id = e.id
				if (e.error !== 1 && e.url && e.url.length > 0) {
					Swal.fire(
						"Success!",
						"Redirecting...",
						'success'
					)
					window.open(e.url, "_self")
				} else {
					this.openNotificationWithIcon("error", e.message, e.extra)
					Swal.fire(
						e.message,
						e.extra,
						'error'
					)
				}
			}).catch(e => {
				console.log(e)
				Swal.fire(
						"Error 1",
						'Connection error',
						'success'
					)
			})
			.finally(f => {
				this.loading = false
			})
		},
		_withdraw() {
			this.loading = true;
			const storageValue = {
				amount: this.formState.amount,
				currency: this.selectedCurrency,
				url: "",
				id: "",
				status: "new",
				type: "Withdraw",
				address: this.formState.withdrawAddress
			}
			withdraw({ ...storageValue, test: this.formState.test }).then(e => {
				// storageValue.url = e.url
				storageValue.id = e.id
				if (e.error !== 1 ) {
					Swal.fire(
						 "Success!",
						"Payout queued !",
						'success'
					)
					this.formState.withdrawAddress = ""
					this.formState.amount = ""
					
					profile().then(user => this.user = user)
					// window.open(e.url, "_self")
				} else {
					this.openNotificationWithIcon("error", e.message, e.extra)
					Swal.fire(
						 e.message,
						e.extra,
						'error'
					)
				}
			}).catch(e => {
				console.log(e)
			})
			.finally(f => {
				this.loading = false
			})
		},
		signout(){
			localStorage.removeItem("token");
			window.location.reload()
		}
	},
	watch: {
		
		'selectedCurrency'(newVal){
			console.log(newVal, this.rawCurrencies)
			this.pair =  "USD_" + this.rawCurrencies.find(i=>i.alfaname === newVal).symbol 
			this.pair_loading = true
			get_pair_price(this.pair).then(e => {
				if (e.error !== 1) {
					this.pair_value =  e.price 
				} else {
					this.price_value= 0
				}
			}).catch(e => {
				console.log(e)
			})
			.finally(e=>{
				this.pair_loading = false
			})
			let v = this.user && this.user.wallet_set && this.user.wallet_set.find(i=>i.currency && i.currency.alfaname === newVal)
			if(v){
				this.balance = v.amount
				this.formState.amount = v.amount
			}
		},
		user(newUser){
			let v = newUser && newUser.wallet_set && newUser.wallet_set.find(i=>i.currency && i.currency.alfaname === this.selectedCurrency)
			console.log(v,newUser , newUser.wallet_set )
			if(v){
				this.balance = v.amount
				this.formState.amount = v.amount
			}
		}

	},

	mounted() {
		
		profile().then(user => {
			this.user = user 
		})
		
		assets().then(assets => {
			assets = assets.filter(i=>i.active)
			const c = assets.map(item=>({label: item.name, value: item.alfaname}))
			this.currencies = c
			this.rawCurrencies = assets
			this.selectedCurrency = c[0].value;
			
		})

		.catch(e => console.log(e))
		this.pair_loading = true
		get_pair_price(this.pair).then(e => {
			if (e.error !== 1) {
				this.pair_value =  e.price 
			} else {
				this.price_value= 0
			}
		}).catch(e => {
			console.log(e)
			Swal.fire(
				"Error 1",
				'Connection error',
				'success'
			)
		})
		.finally(e=>{
			this.pair_loading = false
		})

		axios.get("/request/commision")
		.then(({data}) => {
			this.fees = Object.keys(data).filter(i=>i !== 'litecointestnet').map(key => {
				
				return {
					currency: key, 
					commission: data[key].withdrawal.commission,
					network_fee: data[key].withdrawal.network_fee
				}
				
			})
		})
		.catch(e=>{
			console.log(e)
		})
	}
}
</script>


<style>


.ant-form label {
	font-size: 14px;
	width: 50%;
	text-align: center;
}

.ant-form-item-label {
	white-space: nowrap !important;

}
.ant-input-number-group-addon{
	min-width: 65px;
}
section.grid {

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	border: 1px solid #ddd;
	padding: 16px;
	border-radius: 12px;
}

h1 {
	font-family: 'Luckiest Guy', cursive;
	text-transform: uppercase;
	font-size: 84px;
	letter-spacing: 0.5rem;
	margin-bottom: 128px;
}

.ant-form-item-label>label {
	padding-bottom: 0;
}

select {
	padding: 8px 16px;
	min-width: 300px;
}

label {
	padding-bottom: 16px;
	display: block;
}

button {
	width: 100%;
	margin-top: 16px;
	border: 1px solid #ddd;
	background-color: crimson;
	color: white;
	padding-block: 8px;
	cursor: pointer;
}
.form{
	max-width: 100%;
}
</style>
