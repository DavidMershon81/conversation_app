import FormSectionInfo from './FormSectionInfo'

class FormSectionExpandableInfo extends FormSectionInfo {
    constructor({ fieldTemplate, fields = [ fieldTemplate ] }) {
      super(fields);
      this.fieldTemplate = fieldTemplate;
    }

    addField() {
      const newFields = [...this.fields, this.fieldTemplate]
      return new FormSectionExpandableInfo({fieldTemplate:this.fieldTemplate, fields: newFields});
    }
  }
  
  export default FormSectionExpandableInfo;