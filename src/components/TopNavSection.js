
import { SimpleButton } from './MiscControls';
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext';

const TopNavSection = () => {
    const { loggedInUser, logout } = useContext(AppContext);

    const onLogout = (id, text) => {
        logout();
    };

    return (
        <section>
            <h1 className='top_heading_text'>Petition App Prototype</h1>
            <nav className='top_nav'>
                <Link className='nav_link' to='/debug/users'>Users(debug)</Link>
                { loggedInUser && <Link className='nav_link' to='/'>Home</Link> }
                { !loggedInUser && <Link className='nav_link' to='/login'>Login</Link> }
                { loggedInUser && <SimpleButton className='nav_link' onBtnClick={onLogout} text='Logout'/> }
            </nav>
            <p className='logged_in_user_text'>{loggedInUser}</p>
        </section>   
    );
}

export default TopNavSection
