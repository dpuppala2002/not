import React, { useState } from 'react';
import './MultiStepForm.css'; // Import your CSS file for styling

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    selection: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const steps = [
    { id: 1, title: 'Step 1', fields: ['name', 'email'] },
    { id: 2, title: 'Step 2', fields: ['selection'] },
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setFormErrors({ ...formErrors, [field]: null });
  };

  const validateForm = () => {
    const errors = {};
    steps[currentStep - 1].fields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = 'This field is required';
      } else if (field === 'email' && !formData.email.includes('@')) {
        errors.email = 'Please enter a valid email address';
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    const isValid = validateForm();
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    const isValid = validateForm();
    if (isValid) {
      // Handle form submission, e.g., send data to server
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="multi-step-form">
      <h2>{steps[currentStep - 1].title}</h2>
      <form>
        {steps[currentStep - 1].fields.map((field) => (
          <div key={field} className="form-field">
            <label htmlFor={field}>{field}</label>
            <input
              type="text"
              id={field}
              value={formData[field] || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className={formErrors[field] ? 'error' : ''}
            />
            {formErrors[field] && <p className="error-message">{formErrors[field]}</p>}
          </div>
        ))}
        <button
          type="button"
          onClick={handlePrevStep}
          disabled={currentStep === 1}
          className="navigation-button"
        >
          Previous
        </button>
        {currentStep < steps.length ? (
          <button type="button" onClick={handleNextStep} className="navigation-button">
            Next
          </button>
        ) : (
          <button type="button" onClick={handleSubmit} className="submit-button">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default MultiStepForm;

