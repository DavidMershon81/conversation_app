function FormFieldInfo({name='name', inputType='text', value='', placeholder=null, isValid=null}) {
    this.name = name;
    this.value = value;
    this.placeholder = placeholder ? placeholder : name;
    this.inputType = inputType;
    this.isValid = () => {
      console.log(this.name + ': ' + this.value);
      return this.value !== ''; 
    };
    this.updateValue = (newValue) => {
        return new FormFieldInfo({...this, value:newValue});
    };
};

export default FormFieldInfo;