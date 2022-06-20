import React from 'react';

const InputButtonRight = props => {
  return (
    <div className="shadow sm:rounded-md sm:overflow-hidden">
      <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 sm:col-span-2">
            <label
              htmlFor={props.name}
              className="block text-sm font-medium text-gray-700"
            >
              {props.label}
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                value={props.value}
                onChange={props.onChange}
                type={props.type ? props.type : 'text'}
                name={props.name}
                id={props.id}
                placeholder={props.placeholder}
                autocomplete={props.autocomplete}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
              />
              <button
                onClick={props.buttonOnClick}
                className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                type={props.buttonType}
                value={props.buttonValue}
              >
                {props.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputButtonRight;
