// src/components/ReusableForm.js
import React from "react";
import PropTypes from "prop-types";
import "./styles/ReusableForm.css";

const ReusableForm = ({
  fields,
  onSubmit,
  formData,
  setFormData,
  submitButtonText,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type || "text"}
            id={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            placeholder={field.placeholder}
            required={field.required}
          />
        </div>
      ))}
      <button type="submit">{submitButtonText}</button>
    </form>
  );
};

ReusableForm.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      placeholder: PropTypes.string,
      required: PropTypes.bool,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string.isRequired,
};

export default ReusableForm;
