class FormFieldInfo {
  constructor({name='name', inputType='text', value='', label=null}) {
    this.name = name;
    this.value = value;
    this.label = label ? label : name;
    this.inputType = inputType;
  }
  
  isValid() {
    console.log(this.name + ': ' + this.value);
    return this.value !== ''; 
  }

  updateValue(newValue) {
    return new FormFieldInfo({...this, value:newValue});
  }
};

export default FormFieldInfo;
