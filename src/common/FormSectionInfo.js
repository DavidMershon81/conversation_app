class FormSectionInfo {
    constructor(fields) {
        this.fields = fields;
    }
    
    exportSectionData() {
      let result = {};
      this.fields.forEach(fd => result[fd.name] = fd.value);
      return result;
    }

    getUpdatedFields(index, newValue) {
      const result = [...this.fields];
      result[index] = this.fields[index].updateValue(newValue);
      return result;
    }
    
    updateSection(index, newValue) {
      return new FormSectionInfo(this.getUpdatedFields(index, newValue));
    }
    
    isSectionValid() {
        return this.fields.filter(entry => !entry.isValid()) < 1;
    }
  }
  
  export default FormSectionInfo;