import { useState, useEffect } from 'react'

const FormTextInput = ({placeholderText, text, setText, isPassword}) => {
    return (
      <input
        className="form_text_input" 
        type={isPassword ? "password" : "text"} 
        placeholder={placeholderText} 
        value={text} 
        onChange={ (e) => setText(e.target.value) }
        />
    )
  }

  FormTextInput.defaultProps = {
    placeholderText: 'Type Something',
    isPassword: false
  }

  export default FormTextInput