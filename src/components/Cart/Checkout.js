import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty=value=>value.trim().length===0;
const isNotFiveChars=value=>value.trim().length!==5;


const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity]=useState({
        name: true,
        street:true,
        city:true,
        state:true,
        zip: true
    });

    const nameInputRef=useRef();
    const streetInputRef=useRef();
    const cityInputRef=useRef();
    const stateInputRef=useRef();
    const zipInputRef=useRef();


  const confirmHandler = (event) => {
    event.preventDefault();
   
    const enteredName=nameInputRef.current.value;
    const enteredStreet=streetInputRef.current.value;
    const enteredCity=cityInputRef.current.value;
    const enteredState=stateInputRef.current.value;
    const enteredZip=zipInputRef.current.value;

    const enteredNameIsValid=!isEmpty(enteredName);
    const enteredStreetIsValid=!isEmpty(enteredStreet);
    const enteredStateIsValid=!isEmpty(enteredState);
    const enteredCityIsValid=!isEmpty(enteredCity);
    const enteredZipIsValid=!isNotFiveChars(enteredZip);

    setFormInputsValidity({
        name: enteredNameIsValid,
        street: enteredStateIsValid,
        city: enteredCityIsValid,
        state: enteredStateIsValid,
        zip: enteredZipIsValid
    })

    const formIsValid=enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredZipIsValid && enteredStateIsValid;

    if (!formIsValid){
        
        return;
    }
    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        city: enteredCity,
        state: enteredState,
        zip: enteredZip
    });
  };

  return (
    <form onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef}/>
        {!formInputsValidity.name && <p>Please Enter a Valid Name</p>}
      </div>

      <div className={classes.control}>
        <label htmlFor="street">Street Address</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please Enter a Valid Street</p>}
      </div>

      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}/>
        {!formInputsValidity.city && <p>Please Enter a Valid City</p>}
      </div>

      <div className={classes.control}>
        <label htmlFor="state">State</label>
        <select name="state" id="state" ref={stateInputRef}>
          <option value="MD">MD</option>
          <option value="DC">DC</option>
          <option value="VA">VA</option>
        </select>
      </div>

      <div className={classes.control}>
        <label htmlFor="zip">Zip Code</label>
        <input type="text" id="zip" ref={zipInputRef}/>
        {!formInputsValidity.zip && <p>Please Enter a Valid Zip Code</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
