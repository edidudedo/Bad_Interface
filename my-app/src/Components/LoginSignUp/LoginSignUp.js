import React from "react";
import './LoginSignUp.css'
import { Email, Person, Password, Troll } from "../Assets";
import { useState } from "react";
import Slider from '@mui/material/Slider';
import { Wheel } from 'react-custom-roulette';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const LoginSignup = () => {
    const [loginSignup, setLoginSignup] = useState("Login");
    const [pin, setPin] = useState("PIN");
    const [showPin, setShowPin] = useState(false);
    const [showName, setShowName] = useState(false);
    const [nameSliderValue, setNameSliderValue] = useState(-1);

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);

    const [result, setResult] = useState("")

    const data = [
        { option: '0', style: { backgroundColor: 'blue', textColor: 'white' } },
        { option: '1', style: { backgroundColor: 'red', textColor: 'white' } },
        { option: '2', style: { backgroundColor: 'blue', textColor: 'white' } },
        { option: '3', style: { backgroundColor: 'red', textColor: 'white' } },
        { option: '4', style: { backgroundColor: 'blue', textColor: 'white' } },
        { option: '5', style: { backgroundColor: 'red', textColor: 'white' } },
        { option: '6', style: { backgroundColor: 'blue', textColor: 'white' } },
        { option: '7', style: { backgroundColor: 'red', textColor: 'white' } },
        { option: '8', style: { backgroundColor: 'blue', textColor: 'white' } },
        { option: '9', style: { backgroundColor: 'red', textColor: 'white' } },
      ];

    const handleSelect = (event) => {
        setSelectedItem(event.target.value);
    };

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
      };

    const handleSpinStop = (value) => {
        let updatedPinVal;

        if (pin === 'PIN') {
            updatedPinVal = '0000'.split('');
        } else {
            updatedPinVal = pin.split('');
        }
        updatedPinVal[selectedItem-1] = data[prizeNumber].option;
        setPin(updatedPinVal.join(''));
        setMustSpin(false);
    };

    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const maxPinLength = 10;
    const calculateMaxSliderValue = () => {
        let sum = 0;
        for (let i = 1; i <= maxPinLength; i++) {
          sum += Math.pow(alphabet.length, i);
        }
        return sum-1;
      };
    
      const maxSliderValue = calculateMaxSliderValue();
    
    const generateNameFromValue = (value) => {
        if (value === -1) return "Username";
        
        let name = "";
        while (value >= 0) {
          name = alphabet[value % alphabet.length] + name;
          value = Math.floor(value / alphabet.length) - 1;
        }
        return name;
      };


    const handleNameSliderChange = (event, newValue) => {
        setNameSliderValue(newValue)
    };

    const onSignupPress = () => {
        setLoginSignup("Sign Up")
    }

    const onLoginPress = () => {
        if(name === "zzzzzzzzzz"){
            setResult("Thank you for your hardwork! You did it!")
        }
        else {
            setResult("That is not the right one! Try again!")
        }
        // setLoginSignup("Login")
    }

    const handlePinCheckboxChange = (event) => {
        setShowPin(event.target.checked);
      };

      const handleNameCheckboxChange = (event) => {
        setShowName(event.target.checked);
      };

    const name = generateNameFromValue(nameSliderValue)

    return(
        <div className="Head">
            {/* <img src={Troll} alt="Troll Icon" /> */}

            <div className="Container">
                <div className="Header">
                    <div className="Text">{loginSignup}</div>
                    <div className="Underline"></div>
                </div>
                <div className="Inputs">
                    {loginSignup === "Login" ?
                        <div className="Input">
                            <div className="Input-Head">
                                <img src={Person} alt="Person Icon" />
                                <input type="text" value = {name} placeholder="Name" />
                                <input
                                    type="checkbox"
                                    checked={showName}
                                    onChange={handleNameCheckboxChange}
                                />
                            </div>
                            {showName && (
                                <div className= "pin-slider">
                                    <Slider
                                        value={nameSliderValue}
                                        onChange={handleNameSliderChange}
                                        aria-labelledby="name-slider"
                                        min={0}
                                        max={maxSliderValue}
                                        step={1}
                                    />
                                </div>
                            )} 
                        </div>
                        :null
                    }
                    
                    {/* <div className="Input">
                        <div className="Input-Head">
                            <img src={Email} alt="" />
                            <input type="email" placeholder="Email Id"/>
                        </div>
                    </div> */}
                    <div className="Input">
                        <div className="Input-Head">
                            <img src={Password} alt="" />
                            <input type="text" value={pin} readOnly placeholder="Pin" />
                            <input
                                type="checkbox"
                                checked={showPin}
                                onChange={handlePinCheckboxChange}
                            />
                        </div>
                        {showPin && (
                            <div className= "pin-slider">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Number</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedItem}
                                        label="Number"
                                        onChange={handleSelect}
                                    >
                                        <MenuItem value={1}>1st</MenuItem>
                                        <MenuItem value={2}>2nd</MenuItem>
                                        <MenuItem value={3}>3rd</MenuItem>
                                        <MenuItem value={4}>4th</MenuItem>
                                    </Select>
                                </FormControl>
                                <Wheel
                                    mustStartSpinning={mustSpin}
                                    prizeNumber={prizeNumber}
                                    data={data}
                                    onStopSpinning={handleSpinStop}
                                    spinDuration={0.2}
                                />
                                <div className="pin-slider_button">
                                    <button onClick={handleSpinClick}>Spin</button>
                                </div>
                                
                            </div>
                        )} 
                    </div>
                </div>
                {loginSignup==="Login" ? null : 
                    <div className= "forgot-password">
                        Lost Password?  <span>Click Here!</span>
                    </div>
                }
                <div className="submit-container">
                    {/* <div className = {loginSignup === "Login"? "submit gray" : "submit"} onClick={onSignupPress} >Sign Up</div> */}
                    <div className = {loginSignup === "Sign Up"? "submit gray" : "submit"} onClick={onLoginPress}>Login</div>
                    {result}
                </div>
            </div>
        </div>
    )
}

export default LoginSignup