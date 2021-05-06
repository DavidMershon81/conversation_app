function FormFieldInfo({name='name', value='', placeholder=null, isValid=null, isPassword=false}) {
    this.name = name;
    this.value = value;
    this.placeholder = placeholder ? placeholder : name;
    this.isPassword = isPassword;
    this.isValid = isValid ? isValid : (ffi) => {
      console.log(ffi.name + ': ' + ffi.value);
      return ffi.value !== ''; 
    };
};

export default FormFieldInfo