import React from "react"; //import react object from react package from package.json
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

//API token from OpenWeatherMap.org
const API_KEY = "fcc9263fdb61327ad1d1a315c709d1fe";

//initialize component. Creates an instance of the component
class App extends React.Component {
//In React 16 you can use state object. This object contains key/value pairs
state = {
  temperature: undefined,
  city: undefined,
  country: undefined,
  humidity: undefined,
  description: undefined,
  error: undefined
}
//a custom method for getting the weather data. Using arrow function
//the "e" argument prevents a full page refresh on submit
  getWeather = async (e) => {
    //make http calls using async await
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    //using template strings as parms for fetch method.
    //template strings allow you to inject input values
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`);
    //after the API call is made we need to convert the response to JSON format
    const data = await api_call.json();
    if(city && country){
      //console.log(data);
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter a value for City and Country"
      });
    }
  }
  //display the data in the Component with render method
  render(){
    return (
      //returns jsx (js code that looks like html (this is when babel comes in))
      //using props to make function call
      <div>
         <div className="wrapper">
           <div className="main">
             <div className="container">
               <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather}/>
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                 />
                </div>
               </div>
             </div>
           </div>
         </div>
      </div>
      //jsx can only return 1 parent element so everything you want to return has to be in single div
    );
  }
};


//makes this component available for other files to import
  export default App;
