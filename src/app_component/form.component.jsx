import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import 'nes.css/css/nes.css'
import '../index.css'

const Form = props =>{
	return(
		<div class="fixed-bottom d-flex justify-content-center py-2">
			<form class="py-4"onSubmit={props.loadweather}>	
			<div className="row text-center">
							<div className="px-3">
									<input type="text" className="nes-input" name="city"></input>
							</div>
							<div className="px-3">
									<button className="text nes-btn">Get Weather
									</button>
							</div>
			</div>
			</form>
		</div>
	);	
};

function error(){
	return(
		<div class="alert alert-danger mx-5" role="alert">Please enter a city name</div>
	);
}

export default Form;
