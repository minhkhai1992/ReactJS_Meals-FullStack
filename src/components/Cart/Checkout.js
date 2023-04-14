import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isNotFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();


    const confirmHandler = (event) => {
        event.preventDefault();

        // Get all current information
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        // Validation information
        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalCodeIsValid = isNotFiveChars(enteredPostalCode);
        const enteredCityIsValid = !isEmpty(enteredCity);


        // Check condition for each variables
        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCodeIsValid
        });

        // Required all Condition to be true to get form submit
        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid && enteredCityIsValid;

        // Check Form - if Form is not correct then return nothing
        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode
        });

    };

    const nameControlClasses = `${classes.control} ${setFormInputsValidity.name ? '' : classes.invalid}`;

    const streetControlClasses = `${classes.control} ${setFormInputsValidity.street ? '' : classes.invalid}`;
    const cityControlClasses = `${classes.control} ${setFormInputsValidity.city ? '' : classes.invalid}`;
    const postalCodeControlClasses = `${classes.control} ${setFormInputsValidity.postalCode ? '' : classes.invalid}`;


    return <form className={classes.form} onSubmit={confirmHandler}>
        <div className={nameControlClasses}>
            <label htmlFor="name">Your Name</label>
            <input type='text' id='name' ref={nameInputRef} />
            {!formInputsValidity.name && <p>Please Enter a valid name!</p>}
        </div>
        <div className={streetControlClasses}>
            <label htmlFor="street">Street</label>
            <input type='text' id='name' ref={streetInputRef} />
            {!formInputsValidity.street && <p>Please Enter a valid street!</p>}
        </div>
        <div className={postalCodeControlClasses}>
            <label htmlFor="postal">Postal Code</label>
            <input type='text' id='postal' ref={postalInputRef} />
            {!formInputsValidity.postalCode && <p>Please Enter a valid postal code (5 characters long)!</p>}
        </div>
        <div className={cityControlClasses}>
            <label htmlFor="city">City</label>
            <input type='text' id='city' ref={cityInputRef} />
            {!formInputsValidity.city && <p>Please Enter a valid city!</p>}
        </div>
        <button type='button' onClick={props.onCancel}>Cancel</button>
        <button className={classes.submit}>Confirm</button>
    </form>


};


export default Checkout;