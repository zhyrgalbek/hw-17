import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
    const amountInputRef = useRef();
    const [bool, setBool] = useState(false);

    const [amountIsValid, setAmountIsValid] = useState(true);

    const submitHandler = (event) => {
        event.preventDefault();
        if(bool){
            amountInputRef.current.value++;
        }

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        
        setBool(true);

        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false);
            return;
        }
        props.onAmountAdd(enteredAmountNumber);

    }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={amountInputRef}
                label="Amount"
                input={{
                    id: "amount_" + props.id,
                    type: "number",
                    min: '1',
                    max: 'S',
                    step: '1',
                    defaultValue: '1'
                }} />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1 - 5)</p>}
        </form>
    )
}

export default MealItemForm;