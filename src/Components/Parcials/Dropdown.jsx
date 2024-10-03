import React from 'react';

const Dropdown = ({ title, options = [], func }) => {
  return (
    <div className="select">
      <select defaultValue="0" onChange={func} name="format" id="format" className="border p-2 rounded">
        <option value="0" disabled>
          {title}
        </option>
        {options.length > 0 ? (
          options.map((o, i) => (
            <option key={i} value={o}>
              {o.toUpperCase()}
            </option>
          ))
        ) : (
          <option disabled>No options available</option>
        )}
      </select>
    </div>
  );
};

export default Dropdown;
