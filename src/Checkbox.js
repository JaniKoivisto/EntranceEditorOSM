
import React from 'react';
import { Row } from 'react-materialize';

const Checkbox = (props) => {

  const { label, entranceType, onChange  } = props;

  return (
          <Row>
            <div>
              <input
                id={label}
                type="checkbox"
                name="entrance-types"
                value={label}
                checked={entranceType === label}
                onChange={onChange}
                className="filled-in"
              />
              <label htmlFor={label}>{label}</label>
            </div>
          </Row>
  );

}



export default Checkbox;

