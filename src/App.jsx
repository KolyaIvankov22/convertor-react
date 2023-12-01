import { useEffect, useState } from 'react'

import { Card, Typography } from '@material-tailwind/react'

import Header from './components/Header'
import Select from './components/Select'
import Divider from '@mui/material/Divider'

import './app.css'

function App() {
	const [currencyOptions, setCurrencyOptions] = useState([])
	const [fromCurrency, setFromCurrency] = useState()
	const [toCurrency, setToCurrency] = useState()
	const [exchangeRates, setExchangeRates] = useState({})
	const [fromAmount, setFromAmount] = useState(0)
	const [toAmount, setToAmount] = useState(0)

	useEffect(() => {
		fetch(
			'https://v6.exchangerate-api.com/v6/624576883c5605b2cfda800f/latest/USD'
		)
			.then(res => res.json())
			.then(data => {
				const currencyKeys = ['USD', 'EUR', 'UAH']

				const filteredCurrencyKeys = Object.keys(data.conversion_rates).filter(
					key => currencyKeys.includes(key)
				)

				const uniqueCurrencyOptions = Array.from(
					new Set([data.base_code, ...filteredCurrencyKeys])
				)

				setCurrencyOptions(uniqueCurrencyOptions)
				setFromCurrency(data.base_code)
				setToCurrency(uniqueCurrencyOptions[1])
				setExchangeRates(data.conversion_rates)
			})
			.catch(error => {
				console.error('Error fetching exchange rates:', error)
			})
	}, [])

	useEffect(() => {
		if (
			fromAmount !== undefined &&
			exchangeRates[fromCurrency] !== undefined &&
			exchangeRates[toCurrency] !== undefined
		) {
			const converted =
				fromAmount * (exchangeRates[toCurrency] / exchangeRates[fromCurrency])
			setToAmount(converted.toFixed(2))
		}
	}, [fromAmount, fromCurrency, toCurrency, exchangeRates])

	return (
		<div className='flex items-center justify-center flex-col h-screen  '>
			<Typography
				variant='h5'
				color='blue-gray'
				className=' text-center block font-sans text-5xl antialiased font-semibold leading-tight tracking-normal text-transparent bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text'
			>
				Converter
			</Typography>
			<Card className='mt-4'>
				<div className='p-5 '>
					<Header />
					<div className='mb-4'>
						<Select
							currencyOptions={currencyOptions}
							selectedCurrency={fromCurrency}
							amount={fromAmount}
							setAmount={setFromAmount}
							setCurrency={setFromCurrency}
						/>
					</div>
					<Divider />
					<div className='mt-4'>
						<Select
							currencyOptions={currencyOptions}
							selectedCurrency={toCurrency}
							amount={toAmount}
							setAmount={() => {}}
							setCurrency={setToCurrency}
						/>
					</div>
				</div>
			</Card>
		</div>
	)
}

export default App
