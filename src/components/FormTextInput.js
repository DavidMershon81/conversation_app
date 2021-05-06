const FormTextInput = ({index, fieldInfo, setText}) => {
  const isTextArea = fieldInfo.inputType == 'text_area';

  const standardTextInput = () => { 
    return (
      <input
        className="form_text_input" 
        type={fieldInfo.inputType}
        placeholder={fieldInfo.placeholder} 
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
        placeholder={fieldInfo.placeholder} 
        value={fieldInfo.value} 
        onChange={ (e) => setText(index, e.target.value) }
      />
    )
  } 

  return isTextArea ? textAreaInput() : standardTextInput();
}

  FormTextInput.defaultProps = {
    placeholderText: 'Type Something',
    isPassword: false
  }

  export default FormTextInput