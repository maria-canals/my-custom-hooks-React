import { useState, useEffect, useRef } from 'react';

export const useFetch = url => {
	const isMounted = useRef(true);
	const [state, setstate] = useState({
		data: null,
		loading: true,
		error: null,
	});

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	useEffect(async () => {
		try {
			setstate({ data: null, loading: true, error: null });

			const response = await fetch(url);

			const data = await response.json();

			if (isMounted.current) {
				setTimeout(() => {
					setstate({
						loading: false,
						error: null,
						data: data,
					});
				}, 4000);
			} else {
				console.log('Set state no se llamó');
			}
		} catch (e) {
			setstate({
				data: null,
				loading: false,
				error: 'There was an error',
			});
		}
	}, [url]);

	return state;
};
