import { useState } from 'react'
import FormSection from './FormSection'

const TextEntryForm = ({ formDataTemplate, submitBtnLabel, submitEvent  }) => {
  const [formData, setFormData] = useState(formDataTemplate);
  const [showFormErrors, setShowFormErrors] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('onSubmit running...');

    if(!formData.isSectionValid()){
      setShowFormErrors(true);
      return;
    }

    submitEvent(formData.exportSectionData());
    setFormData(formDataTemplate);
    setShowFormErrors(false);
  }

  return (
    <form onSubmit={onSubmit} className='input_form'>
      <FormSection sectionData={formData} setSectionData={setFormData} showFormErrors={showFormErrors} />
      <input type="submit" value={submitBtnLabel} className="form_submit_btn" />
      {showFormErrors && <p className='form_error_message'>Looks like you forgot to enter something in this form.</p>}
    </form>
  )
}

export default TextEntryForm