const FormTextInput = ({index, fieldInfo, setText, showFormErrors}) => {
  const isTextArea = fieldInfo.inputType === 'text_area';

  const standardTextInput = () => { 
    return (
      <input
        className="form_text_input" 
        type={fieldInfo.inputType}
        placeholder={fieldInfo.label} 
        value={fieldInfo.value} 
        onChange={ (e) => setText(index, e.target.value) }
      />
    )
  } 

  const textAreaInput = () => { 
    return (
      <textarea
        className="form_text_area" 
        cols="30" 
        rows="10"
        placeholder={fieldInfo.label} 
        value={fieldInfo.value} 
        onChange={ (e) => setText(index, e.target.value) }
      />
    )
  } 

  return (
    <>
      {isTextArea ? textAreaInput() : standardTextInput()}
      {(showFormErrors && !fieldInfo.isValid()) && <p className='form_error_message'>Please enter a valid {fieldInfo.label}</p>}
    </>
  );
}

export default FormTextInput