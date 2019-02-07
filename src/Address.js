import React from 'react';
import { Row, Input } from 'react-materialize';

const Address = (props) => {


const { label, userInput, onChange } = props;

    return (
            <Row>
              <Input 
                s={10} 
                value={userInput}
                name={label} 
                onChange={onChange} 
                label={label} />
            </Row>
    );

}



export default Address;