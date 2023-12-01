import { useEffect, useState } from 'react'

import usd from '../assets/usd.svg'
import eur from '../assets/eur.svg'

const TdStyle = {
	ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4`,
	TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium`,
	TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2 text-center text-base font-medium`,
	TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`
}

const Header = () => {
	const [usdCurrency, setUsdCurrency] = useState(0)
	const [eurCurrency, setEurCurrency] = useState(0)

	useEffect(() => {
		fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
			.then(res => res.json())
			.then(data => {
				const usd = data.find(item => item.cc === 'USD')
				const eur = data.find(item => item.cc === 'EUR')

				setUsdCurrency(usd ? usd.rate : 0)
				setEurCurrency(eur ? eur.rate : 0)
			})
			.catch(() => {
				setUsdCurrency('Error fetching')
				setEurCurrency('Error fetching')
			})
	}, [])

	return (
		<section className='bg-white dark:bg-dark mb-10'>
			<div className='container'>
				<div className='flex flex-wrap -mx-4'>
					<div className='w-full '>
						<div className='max-w-full overflow-x-auto'>
							<table className='w-full table-auto'>
								<thead className='text-center bg-primary'>
									<tr>
										<th className={TdStyle.ThStyle}> Сurrency </th>
										<th className={TdStyle.ThStyle}> UAH </th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className={TdStyle.TdStyle}>
											<img
												src={usd}
												alt='usd'
												className='w-5 h-5 inline-block'
											/>
											<span className='ml-1 text-sm font-normal'>USD</span>
										</td>
										<td className={TdStyle.TdStyle}>{usdCurrency}</td>
									</tr>
									<tr>
										<td className={TdStyle.TdStyle}>
											<img
												src={eur}
												alt='usd'
												className='w-5 h-5 inline-block'
											/>
											<span className='ml-1 text-sm font-normal'>EUR</span>
										</td>
										<td className={TdStyle.TdStyle}>{eurCurrency}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Header
