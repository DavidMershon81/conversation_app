class FormSectionInfo {
    constructor(fields) {
        this.fields = fields;
    }
    
    exportSectionData() {
      let result = {};
      this.fields.forEach(fd => result[fd.name] = fd.value);
      return result;
    }
    
    updateSection(index, newValue) {
      const newFields = [...this.fields];
      newFields[index] = this.fields[index].updateValue(newValue);
      return new FormSectionInfo(newFields);
    }
    
    isSectionValid() {
        return this.fields.filter(entry => !entry.isValid()) == 0;
    }
  }
  
  export default FormSectionInfo;