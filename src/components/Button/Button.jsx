import React from 'react';
import './Button.css';

export default function Button (props) {
    return (
        <button className = {` Button 
                                ${props.operation ? 'operation' : ''}
                                ${props.equal ? 'equal' : ''}
                                ${props.clear ? 'clear' : ''}
                            `}
                onClick={e => props.click && props.click(props.label) }
        >
            {props.label}

        </button>
    )
}