import { useState } from 'react'
import FormTextInput from './FormTextInput'

const TextEntryForm = ({ formFields, submitBtnLabel, submitEvent  }) => {
  const [formData, setFormData] = useState(formFields);

  const onTextUpdate = (index, newValue) => {
    const newFormData = [...formData];
    newFormData[index] = {...newFormData[index], value:newValue};
    setFormData(newFormData);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const invalidEntires = formData.filter(entry => !entry.isValid(entry));
    if(invalidEntires.length > 0){
      alert(`enter a ${invalidEntires[0].name}`);
      return;
    }

    let submitData = {};
    formData.forEach(fd => submitData[fd.name] = fd.value);
    submitEvent(submitData);
    setFormData(formFields);
  }

  return (
    <form onSubmit={onSubmit} className='input_form'>
      {formData.map((field, index) => <FormTextInput key={index} index={index} fieldInfo={field} setText={onTextUpdate}/>)}
      <input type="submit" value={submitBtnLabel} className="form_submit_btn" />
    </form>
  )
}

export default TextEntryForm