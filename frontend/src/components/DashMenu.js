import React, { useState } from 'react';
import { Menu } from 'primereact/menu';
import { Avatar } from 'primereact/avatar';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from "axios";
import { removeTokenTimestamp } from '../utils/utils';
import logo from '../assets/logo.png';

const DashMenu = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    const handelLogout = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
            removeTokenTimestamp();
            navigate('/signin');
        } catch (err) {
        }
    };

    const itemRenderer = (item) => (
        <div className={'p-menuitem-content ' + item.border}>
            <Link className="flex align-items-center p-menuitem-link" to={item.url}>
                <span className={item.icon} />
                <span className="mx-2">{item.label}</span>
                {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
            </Link>
        </div>
    );

    const renderLogout = (item) => (
        <div className={'p-menuitem-content ' + item.border}>
            <Link className="flex align-items-center p-menuitem-link" onClick={handelLogout} to={'/'}>
                <span className={item.icon} />
                <span className="mx-2">{item.label}</span>
                {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
            </Link>
        </div>
    );
    let itemsIn = [
        {
            template: (item, options) => {
                return (
                    <span className="inline-flex align-items-center gap-1 px-2 py-2">
                        <img alt="logo" src={logo} height="40" className="mr-2"></img>
                        <span className="font-medium text-xl font-semibold">
                            SYN<span className="text-primary">ERGY</span>
                        </span>
                        {visible && 
                        <span className='pl-3'>
                            <Button type="button" onClick={() => setVisible(false)} icon="pi pi-times" rounded outlined className="h-2rem w-2rem"></Button>
                        </span>
                        }
                    </span>
                );
            }
        },
        {
            separator: true
        },
        {
            template: (item, options) => {
                return (
                    <div className='cursor-auto w-full p-link flex align-items-center p-2 text-color border-noround'>
                        <Avatar image={currentUser?.profile_avatar} className="mr-2" shape="circle"/>
                        <div className="flex flex-column align">
                            <span className="font-bold">{currentUser?.username}</span>
                            <span className="text-sm capitalize">{currentUser?.default_workstream}</span>
                        </div>
                    </div>
                );
            }
        },
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
            url: '/dashboard',
            template: itemRenderer
            
        },
        {
            label: 'Task',
            icon: 'pi pi-list-check',
            url: '/task',
            template: itemRenderer
        },
        {
            label: 'Workstream',
            name: true,
            icon: 'pi pi-folder',
            url: '/workstream',
            template: itemRenderer
        },
        {
            label: 'Notification',
            name: true,
            icon: 'pi pi-inbox',
            url: '/notification',
            template: itemRenderer
        },
        {
            separator: true
        },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            url: '/logout',
            template: renderLogout
        }
    ];

    const userMenu = (
        <>
        <div className='hidden sm:block col-fixed p-0 md:w-15rem'>
            <Menu model={itemsIn} className="hidden sm:block md:w-15rem p-0" pt={{ menu: { className: "h-screen flex flex-column align-content-evenly justify-content-between"}}}/>
        </div>
        <div className='block sm:hidden fixed z-5 m-1'>
             <Button size='small' icon="pi pi-bars" onClick={() => setVisible(true)} />
        </div>
        </>
    );

    const sidebar = (
        <Sidebar
                visible={visible}
                onHide={() => setVisible(false)}
                content={({ closeIconRef, hide }) => (
                    <div className="min-h-screen flex relative lg:static surface-ground">
                        <div id="app-sidebar-2" className="surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none" style={{ width: '100%' }}>
                            <div className="flex flex-column h-full">
                                <div className="flex align-items-center justify-content-between flex-shrink-0">
                                <Menu model={itemsIn} pt={{ menu: { className: "h-screen flex flex-column align-content-evenly justify-content-between"}, root: {className: 'w-full'}}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            ></Sidebar>
    );
  return (
    <>
        {currentUser && userMenu}
        {currentUser && sidebar}
    </>
  )
}

export default DashMenu
