
 import TextEntryForm from './TextEntryForm'
 import useFetchData from  '../hooks/useFetchData'
 import FormFieldInfo from '../common/FormFieldInfo'
 import FormSectionInfo from '../common/FormSectionInfo'

 const PetitionsView = () => {
    const [ petitions, addPetition, loading ] = useFetchData('/api/get_petitions', '/api/add_petition');
  
    const petitionsTemplate = new FormSectionInfo([
      new FormFieldInfo({name:'text', label:'petition text', inputType: 'text_area', placeholder: 'petition text...'}),
      new FormFieldInfo({name:'email_domain', label:'email domain name', placeholder: 'email domain'}),
      new FormFieldInfo({name:'max_users', label:'number of users for this petition', inputType: 'number', placeholder: 'max users for this petition'})
    ]);
  
    return (
        <section>
          <h2>Petitions</h2>
          <TextEntryForm formDataTemplate={petitionsTemplate} submitBtnLabel='Add Petition' submitEvent={addPetition}/>
          <div className="loading_box">
            {loading && <p>Loading...</p>}
          </div>

          <ul>
          {petitions && petitions.map((petition) => 
            <li 
                key={petition['id']}>
                <strong>id:</strong> {petition['id']}<br/>
                <strong>email_domain:</strong> {petition['email_domain']}<br/>
                <strong>max_users:</strong> {petition['max_users']}<br/>
                <strong>text:</strong> {petition['text']}
            </li>)}
          </ul>
        </section>
    );
  }

export default PetitionsView
