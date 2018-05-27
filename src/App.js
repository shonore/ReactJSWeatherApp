import React from "react"; //import react object from react package from package.json
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

//API token from OpenWeatherMap.org
const API_KEY = "fcc9263fdb61327ad1d1a315c709d1fe";

//initialize component. Creates an instance of the component
class App extends React.Component {
//a custom method for getting the weather data. Using arrow function
//the "e" argument prevents a full page refresh on submit
  getWeather = async (e) => {
    //make http calls using async await
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    //using template strings as parms for fetch method.
    //template strings allow you to inject input values
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metrics`);
    //after the API call is made we need to convert the response to JSON format
    const data = await api_call.json();
    console.log(data);
  }

  //display the data in the Component with render method
  render(){
    return (
      //returns jsx (js code that looks like html (this is when babel comes in))
      //using props to make function call
      <div>
         <Titles />
         <Form getWeather={this.getWeather}/>
         <Weather />
      </div>
      //jsx can only return 1 parent element so everything you want to return has to be in single div
    );
  }
};
//makes this component available for other files to import
  export default App;
