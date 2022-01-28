import { useState } from 'react';
import './App.css';

function App() {
	const def = { AVG: '-', VAR: '-', ST_DEV: '-' };
	const [List, setList] = useState(def);

	const Transform = (array) => {
		const REGEX = /^[0-9\s.-]*$/;
		if (!REGEX.test(array)) {
			alert('NaN!');
			return;
		}
		array = array.trim();
		if (array === '') {
			setList(def);
			return;
		}
		array = array.split(' ');
		array = array.filter((n) => n !== '');
		for (let i in array) {
			array[i] = Number(array[i]);
		}
		const AVG = AVG_Compute(array);
		const VAR = VAR_Compute(array, AVG);
		const ST_DEV =
			Math.round((Math.sqrt(VAR) + Number.EPSILON) * 100) / 100;
		setList({
			AVG: AVG,
			VAR: VAR,
			ST_DEV: ST_DEV,
		});
	};

	const AVG_Compute = (array) => {
		let sum = 0;
		for (let i in array) {
			sum += array[i];
		}
		return Math.round((sum / array.length + Number.EPSILON) * 100) / 100;
	};
	const VAR_Compute = (array, avg) => {
		let sum = 0;
		for (let i in array) {
			sum += Math.pow(array[i] - avg, 2);
		}
		return Math.round((sum / array.length + Number.EPSILON) * 100) / 100;
	};

	return (
		<div className='App'>
			<div className='Title'>
				<p>Statystyka</p>
			</div>
			<div className='Output'>
				<p>Średnia: {List.AVG}</p>
				<p>Wariancja: {List.VAR}</p>
				<p>Odchylenie standardowe: {List.ST_DEV}</p>
				<input
					type='text'
					onChange={(e) => Transform(e.target.value)}
				/>
			</div>
		</div>
	);
}

export default App;
