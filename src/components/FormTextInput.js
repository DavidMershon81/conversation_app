import { useState, useEffect } from 'react'

const FormTextInput = ({placeholderText, text, setText}) => {
    return (
      <input type="text" placeholder={placeholderText} value={text} onChange={ (e) => setText(e.target.value) }/>
    )
  }

  FormTextInput.defaultProps = {
    placeholderText: 'Type Something'
  }

  export default FormTextInput