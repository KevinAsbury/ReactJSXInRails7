import React from 'react';

const Input = props => {
  return (
    <div className="shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 bg-white space-y-6  sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-3 sm:col-span-4">
            <label
              htmlFor={props.name}
              className="block text-sm font-medium text-gray-700"
            >
              {props.label}
            </label>
            <input
              value={props.value}
              onChange={props.onChange}
              type={props.type ? props.type : 'text'}
              name={props.name}
              id={props.id}
              placeholder={props.placeholder}
              autocomplete={props.autocomplete}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
