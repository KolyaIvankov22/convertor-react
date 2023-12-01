import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react'

import InputValue from './inputValue'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

function Select(props) {
	const { selectedCurrency, currencyOptions, amount, setAmount, setCurrency } =
		props

	const [selected, setSelected] = useState(selectedCurrency || '')

	useEffect(() => {
		setSelected(selectedCurrency || '')
	}, [selectedCurrency])

	const handleAmountChange = e => {
		const inputAmount = parseFloat(e.target.value)
		if (!isNaN(inputAmount) || e.target.value === '') {
			setAmount(e.target.value === '' ? 0 : inputAmount)
		}
	}

	const handleCurrencyChange = value => {
		setCurrency(value)
	}

	return (
		<>
			<Listbox value={selected} onChange={handleCurrencyChange}>
				{({ open }) => (
					<>
						<div className='relative mt-2'>
							<Listbox.Button className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6'>
								<span className='flex items-center'>
									<span className='block truncate'>{selected}</span>
								</span>
								<span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
									<ChevronUpDownIcon
										className='h-5 w-5 text-gray-400'
										aria-hidden='true'
									/>
								</span>
							</Listbox.Button>

							<Transition
								show={open}
								as={Fragment}
								leave='transition ease-in duration-100'
								leaveFrom='opacity-100'
								leaveTo='opacity-0'
							>
								<Listbox.Options className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
									{currencyOptions.map(item => (
										<Listbox.Option
											key={item}
											value={item}
											className={({ active }) =>
												classNames(
													active ? 'bg-primary text-white' : 'text-gray-900',
													'relative cursor-default select-none py-2 pl-3 pr-9'
												)
											}
										>
											{({ selected, active }) => (
												<>
													<div className='flex items-center'>
														<span
															className={classNames(
																selected ? 'font-semibold' : 'font-normal',
																'ml-3 block truncate'
															)}
														>
															{item}
														</span>
													</div>

													{selected ? (
														<span
															className={classNames(
																active ? 'text-white' : 'text-primary',
																'absolute inset-y-0 right-0 flex items-center pr-4'
															)}
														>
															<CheckIcon
																className='h-5 w-5'
																aria-hidden='true'
															/>
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</>
				)}
			</Listbox>
			<InputValue amount={amount} handleAmountChange={handleAmountChange} />
		</>
	)
}

export default Select
