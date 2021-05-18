import useFetchData from  '../hooks/useFetchData'
import AddPetitionGroupForm from './AddPetitionGroupForm';
 
const PetitionGroupsView = () => {
  const [ groups, addGroup, loading, error ] = useFetchData('/api/get_petition_groups', '/api/add_petition_group');

  return (
      <section>
        <h2>Petition Groups</h2>
        <AddPetitionGroupForm onSubmit={addGroup}/>
        <div className="loading_box">
          {loading && <p>Loading...</p>}
          {error && <p>error: can't connect to server.</p>}
        </div>

        <ul>
        {groups && groups.map((petition_group) => 
          <li 
              key={petition_group['id']}>
              <strong>id:</strong> {petition_group['id']}<br/>
              <strong>group_name:</strong> {petition_group['group_name']}<br/>
              <strong>listserv_email:</strong> {petition_group['listserv_email']}<br/>
          </li>)}
        </ul>
      </section>
  );
}

export default PetitionGroupsView
