import React from 'react'
import 'nes.css/css/nes.css'
import '../index.css'

const Weather = (props) => {
	return(
		<div class="container">
			<div className="text display-4 py-4">BitWeather</div>
			{props.city?(null):<h3 className="text">Type in a city</h3>}
			{props.city?(<div className="nes-container is-rounded py-4">
										<h1 className="text city display-4">{props.city}</h1>
										<h5 className="text icon py-4 display-1"><i className={`wi ${props.weatherIcon}`}></i></h5>
										{props.temp_celsius? (<h1 className="text main-temp display-4">{props.temp_celsius}&deg;</h1>):null}	
					{/* Display High and Low foreacst */}
										{minMax(props.temp_min,props.temp_max)}
										<h3 className="text py-3">{props.description}</h3>
										{props.feels_like? (<h3 className="text py-2">Feels Like {props.feels_like}&deg;</h3>):null}
										</div>):null}
		</div>
	);

}

function minMax(min,max){
 if(min && max){
	return(
		<h3 className="py-2">
				<span class="text max-temp px-4">High {max}&deg;</span>
				<span class="text min-temp px-4">Low {min}&deg;</span>
		</h3>
	);
}
}

export default Weather;
