import React from 'react'
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';

const NavBar = () => {

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            url: '/'
        },
        {
            label: 'Features',
            icon: 'pi pi-star',
            url: '/'
        }
    ];

    const end = (
        <div className="flex align-items-center gap-2">
            <Button label="Get Started" size="small" />
        </div>
    );

    const start = <a href='/'><img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img></a>;

    return (
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
    )
}

export default NavBar
