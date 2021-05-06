function FormFieldInfo({name='name', inputType='text', value='', placeholder=null, isValid=null}) {
    this.name = name;
    this.value = value;
    this.placeholder = placeholder ? placeholder : name;
    this.inputType = inputType;
    this.isValid = isValid ? isValid : (ffi) => {
      console.log(ffi.name + ': ' + ffi.value);
      return ffi.value !== ''; 
    };
};

export default FormFieldInfo