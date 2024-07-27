import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import logo from "../assets/logo.png";

const NavBar = () => {
    const currentUser = useCurrentUser();
    const navigate = useNavigate();

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => {
                navigate('/');
            }
        }
    ];

    const end = (
        <div className="flex align-items-center gap-2">
            <NavLink to='/signup'>
                <Button label="Get Started" size="small" />
            </NavLink>
        </div>
    );
    
    const start = <NavLink to="/"><img alt="logo" src={logo} height="40" className="mr-2"></img></NavLink>;
    const loggedOutMenu = <Menubar model={items} start={start} end={end} />
    const loggedInMenu = <></>
    return (
        <header className="card">
            {currentUser ? loggedInMenu : loggedOutMenu}
        </header>
    )
}

export default NavBar
