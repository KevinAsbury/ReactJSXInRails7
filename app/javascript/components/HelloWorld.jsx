import React, { useState, useEffect } from 'react';
import _ from 'lodash';

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
      <h1>Hello World!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter text:
          <input
            type="text"
            name="name"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
