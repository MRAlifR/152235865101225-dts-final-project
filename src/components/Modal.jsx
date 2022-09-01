import React from 'react';

const Modal = (props) => {
	return (
		<>
			<label
				htmlFor='my-modal-4'
				className='modal modal-open cursor-pointer'
				onClick={props.onClick}>
				<label className='modal-box relative' htmlFor=''>
					<h3 className='text-lg font-bold'>{props.title}</h3>
					<p className='py-4'>{props.body}</p>
				</label>
			</label>
		</>
	);
};

export default Modal;
