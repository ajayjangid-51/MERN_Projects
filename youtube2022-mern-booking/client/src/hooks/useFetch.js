import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await axios.get(url);
				setData(res.data);
			} catch (err) {
				setError(err);
			}
			setLoading(false);
		};
		fetchData();
		// javascript ki mast baat yeh bhi hai ki jaise apnko koi function-chahiyehh , mtlb uss function ko call krna hai, then apn uss function vahi define krke vahi call bhi kr sktehh hai. , mtlb overall baat yeh hai ki javascript meh apn function kahi bhi define kr sktehh hai, uss function k scope ka dhyn rkhna hai ki voh kha tk(mtlb konse block{} meh ya konse block{} tk visilbe hai.) accessilbe or mtlb visible hai.
	}, [url]);

	const reFetch = async () => {
		setLoading(true);
		try {
			const res = await axios.get(url);
			setData(res.data);
		} catch (err) {
			setError(err);
		}
		setLoading(false);
	};

	return { data, loading, error, reFetch };
};

export default useFetch;
