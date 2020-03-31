import React from 'react';
import './App.css';
import Weather from './app_component/weather.component'
import Form from './app_component/form.component'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'nes.css/css/nes.css'
import 'weather-icons/css/weather-icons.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const api_key='977ddd93efd478dcca2648525edc91c1'

class App extends React.Component{
constructor(){
		super();
		this.state={
			city:undefined,
			country:undefined,
			icon: undefined,
			main: undefined,
			celsius: undefined,
			feels_like:undefined,
			temp_max: undefined,
			temp_min: undefined,
			description: "",
			error: false
		};

		this.weatherIcon = {
				Thunderstorm: "wi-thunderstorm",
				Drizzle: "wi-sleet",
				Rain: "wi-storm-showers",
				Snow: "wi-snow",
				Atmosphere: "wi-fog",
				Clear:"wi-day-sunny",
				Clouds:"wi-day-cloudy"
		};
}

calcTemp(temp){
	let celsius = Math.floor(temp-273.15)
	let farenheit = Math.floor((temp-273.15)*9/5+32)
	return farenheit;
}

getWeatherIcon(icons,rangeID){
	switch(true){
		case rangeID >= 200 && rangeID <= 232:
				this.setState({icon:this.weatherIcon.Thunderstorm});
				break;
		case rangeID >= 300 && rangeID <= 321:
				this.setState({icon:this.weatherIcon.Drizzle});
				break;
		case rangeID >= 500 && rangeID <= 531:
				this.setState({icon:this.weatherIcon.Rain});
				break;
		case rangeID >= 600 && rangeID <= 622:
				this.setState({icon:this.weatherIcon.Snow});
				break;
		case rangeID >= 701 && rangeID <= 781:
				this.setState({icon:this.weatherIcon.Atmosphere});
				break;
		case rangeID == 800:
				this.setState({icon:this.weatherIcon.Clear});
				break;
		case rangeID >= 801 && rangeID <= 804:
				this.setState({icon:this.weatherIcon.Clouds});
				break;
				default:
				this.setState({icon:this.weatherIcon.Clouds});
		}
}

getWeather = async (e) => {

		e.preventDefault();
		const city = e.target.elements.city.value;
		if(city){
		const apiReq = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`);
		const apiRes = await apiReq.json();
		console.log(apiRes);

		this.setState({
			city:apiRes.name,
			country:apiRes.sys.country,
			celsius:this.calcTemp(apiRes.main.temp),
			temp_max:this.calcTemp(apiRes.main.temp_max),
			temp_min:this.calcTemp(apiRes.main.temp_min),
			description:apiRes.weather[0].main,
			feels_like:this.calcTemp(apiRes.main.feels_like)
		})
			this.getWeatherIcon(this.weatherIcon, apiRes.weather[0].id);
}else{
			this.setState({error:true});
}
};

render(){
	return (
    <div className="App">
			<Weather
				city={this.state.city}
				country={this.state.country}
				temp_celsius={this.state.celsius}
				temp_max={this.state.temp_max}
				temp_min={this.state.temp_min}
				description={this.state.description}
				feels_like={this.state.feels_like}
				weatherIcon={this.state.icon}
			/>
			<Form loadweather={this.getWeather} error={this.state.error}/>
    </div>
  );	
}			
}

export default App;
