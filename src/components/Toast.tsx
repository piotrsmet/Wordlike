import { motion, useAnimation } from 'framer-motion'
import { useEffect} from 'react'
interface toastProps {
	text: string
	show: boolean
}

export default function Toast({ text, show }: toastProps) {
	const presence = useAnimation()
	useEffect(() => {
		if (show) {
			presence
				.start({
					y: -60,
					opacity: 1,
					transition: { duration: 0.5 },
				})
				.then(() => {
					setTimeout(() => {
						presence.start({
							y: 0,
							opacity: 0,
							transition: { duration: 0.5 },
						})
					}, 1000)
				})
		}
	}, [show])
	return (
		<motion.div
			animate={presence}
			className='fixed -bottom-10 left-[50%] -translate-x-1/2 bg-gray-600 rounded-xl p-2 text-[16px]'
		>
			{text}
		</motion.div>
	)
}
