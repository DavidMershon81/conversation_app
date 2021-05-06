const FormTextInput = ({placeholderText, varName, text, setText, isPassword}) => {
  return (
      <input
        className="form_text_input" 
        type={isPassword ? "password" : "text"} 
        placeholder={placeholderText} 
        value={text} 
        onChange={ (e) => setText(varName, e.target.value) }
      />
    )
  }

  FormTextInput.defaultProps = {
    placeholderText: 'Type Something',
    isPassword: false
  }

  export default FormTextInput