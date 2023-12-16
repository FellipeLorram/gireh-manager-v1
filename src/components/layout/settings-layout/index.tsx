import React from 'react'
import { SettingsNavigation } from './navigation'

interface Props {
	children: React.ReactNode
}

export function SettingsLayout({ children }: Props) {
	return (
		<div className='flex flex-row mt-8'>
			<SettingsNavigation />
			{children}
		</div>
	)
}
