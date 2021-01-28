import React, {useState} from 'react';

import Button from '../components/Button/Button';
import Display from '../components/Display/Display';
import './Calculator.css';

export default function Calculator() {
    
    const [displayValue, setDisplayValue] = useState('');
    const [values, setValues] = useState([]);
    const [operation, setOperation] = useState(null);

    let auxOperation = null;
    let result = 0;
    
    const displayLabel = (e) => {
        displayValue === '' ? setDisplayValue(e) : setDisplayValue(displayValue + e);

        if( values[0] !== undefined ) {
            if(values[1]!==undefined) {
                values[1]+=e
            }else{
                values[1] = e
            }
            setValues( [...values, values[1] ] )
        }
    };

    const operator = (e) =>{

        if(values[0] !== undefined && values[1] !== undefined){
            auxOperation = e
            equal();
        }else{
            setValues([...values, displayValue]);
            setOperation(e);
            displayLabel(e);
        }

    };

    const equal = ()  => {
        doOperation()

        if(auxOperation === null){
            setOperation(null)
            setValues([]);
        }else{
            setOperation(auxOperation)
            let auxValues = [result];
            setValues([auxValues]);
        }

    };
    
    const doOperation = () => {

        values[0] = parseFloat(values[0]);
        values[1] = parseFloat(values[1]);

        switch(operation){
            case '%':
                result = ( (values[0]/100) * values[1]).toFixed(4);
            break;

            case '/':
                result = values[0] / values[1];
            break;

            case 'x':
                result = values[0] * values[1];
            break;

            case '-':
                result = values[0] - values[1];
            break;

            case '+':
                result = values[0] + values[1];
            break;

            default:
                alert("Operação inválida!");
        }

        if (auxOperation !== null){
            setDisplayValue(result+auxOperation)
        }else{
            setDisplayValue(result)
        }
    }

    const clear = () => {
        setDisplayValue('');
        setOperation(null);
        setValues([]);
    };

    const invertSignal = () => {
        if(values[0] !== undefined && values[1] !== undefined){
            alert("Operação inválida!");
        }else{
            setDisplayValue(displayValue * (-1))
        }
    }
 

    return(

        <div className="calculator">

            <Display value={displayValue}/>

            <Button label='C' clear click={clear}></Button>
            <Button label='' operation ></Button>
            <Button label='%' operation click={operator} ></Button>
            <Button label='/' operation click={operator} ></Button>
            <Button label='7' click={displayLabel} ></Button>
            <Button label='8' click={displayLabel} ></Button>
            <Button label='9' click={displayLabel} ></Button>
            <Button label='x' operation click={operator} ></Button>
            <Button label='4' click={displayLabel} ></Button>
            <Button label='5' click={displayLabel} ></Button>
            <Button label='6' click={displayLabel} ></Button>
            <Button label='-' operation click={operator} ></Button>
            <Button label='1' click={displayLabel} ></Button>
            <Button label='2' click={displayLabel} ></Button>
            <Button label='3' click={displayLabel} ></Button>
            <Button label='+' operation click={operator}></Button>
            <Button label='+/-' click={invertSignal}></Button>
            <Button label='0' click={displayLabel} ></Button>
            <Button label='.' click={displayLabel} ></Button>
            <Button label='=' equal click={equal}></Button>
        </div>
    )
}