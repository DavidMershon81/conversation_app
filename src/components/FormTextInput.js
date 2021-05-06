const FormTextInput = ({index, fieldInfo, setText}) => {

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

  FormTextInput.defaultProps = {
    placeholderText: 'Type Something',
    isPassword: false
  }

  export default FormTextInput