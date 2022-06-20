import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import InputButtonRight from './ui/InputButtonRight';

export default function HelloWorld(props) {
  [text, setText] = useState();

  useEffect(() => {
    if (!_.isEmpty(text)) {
      console.log(`The text entered is: ${text}`);
    }
  }, [text]);

  const handleSubmit = event => {
    event.preventDefault();
    alert(`The text you entered was: ${text}`);
    setText('');
    console.clear();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputButtonRight
          value={text}
          label="Enter Some Text:"
          onChange={e => setText(e.target.value)}
          id="text"
          name="text-input"
          type="text"
          placeholder="Enter Text"
          autocomplete={null}
          buttonOnClick={null}
          buttonText={'Submit'}
          buttonType="submit"
          buttonValue="Submit"
        />
      </form>
    </div>
  );
}
