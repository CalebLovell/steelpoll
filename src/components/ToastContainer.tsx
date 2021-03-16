import { ToastContainerProps } from 'react-toast-notifications';

export const ToastContainer: React.FC<ToastContainerProps> = ({ hasToasts, children }) => {
	return (
		<div className={`container fixed bottom-0 z-50 max-h-full pb-2 overflow-hidden ${hasToasts ? `pointer-events-auto` : `pointer-events-none`}`}>
			{children}
		</div>
	);
};
