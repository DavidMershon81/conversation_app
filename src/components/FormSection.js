import { useState } from 'react'
import FormTextInput from './FormTextInput'

const FormSection = ({ sectionData, setSectionData, showFormErrors  }) => {
  const onTextUpdate = (index, newValue) => {
    setSectionData(sectionData.updateSection(index, newValue));
  };

  return (
    <>
      {sectionData.fields.map((field, index) => 
        <FormTextInput key={index} index={index} fieldInfo={field} setText={onTextUpdate} showFormErrors={showFormErrors}/>
      )}
    </>
  )
}

export default FormSection