import useFetchData from  '../hooks/useFetchData'
import AddPetitionGroupForm from './AddPetitionGroupForm';
import { PetitionGroupSummary } from './PetitionGroupControls';
import { Link } from 'react-router-dom';

const PetitionGroupsListView = () => {
  const { data:groups, addData:addGroup, loading, error } = useFetchData('/api/get_petition_groups', '/api/add_petition_group');
  
  return (
      <section>
        <h2>Petition Groups</h2>
        <AddPetitionGroupForm onSubmit={addGroup}/>
        <div className="loading_box">
          {loading && <p>Groups Loading...</p>}
          {error && <p>error: can't connect to server (groups).</p>}
        </div>

        <ul>
        {groups && groups.map((petitionGroup) => 
          <li
              key={petitionGroup['id']}>
              <PetitionGroupSummary petitionGroup={petitionGroup} />
              <Link className='link_btn' to={`/petition_group/${petitionGroup['id']}`}>View Group</Link>
          </li>)}
        </ul>
      </section>
  );
}

export default PetitionGroupsListView
