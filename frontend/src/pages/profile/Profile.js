import React, { useEffect, useRef, useState } from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { axiosReq } from "../../api/axiosDefaults";
import { Fieldset } from 'primereact/fieldset';
import { Avatar } from 'primereact/avatar';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';


const Profile = () => {
  const currentUser = useCurrentUser()
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileData, setProfileData] = useState({})
  const [errors, setErrors] = useState({})
  const [visible, setVisible] = useState(false);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);
  const [inputData, setInputData] = useState({
    first_name: '',
    last_name: '',
    avatar: '',
  });
  const { first_name, last_name, avatar } = inputData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: profileData }] =
          await Promise.all([
            axiosReq.get(`/api/profiles/${currentUser.pk}/`),
            // axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        setProfileData({profileData});
        // avatar = profileData.avatar;
        // first_name = profileData.first_name;
        // setProfilePosts(profilePosts);
        setHasLoaded(true);
        console.log(profileData)
      } catch (err) {
      }
    };
    fetchData();
    console.log(profileData)
  }, []);


  const legendTemplate = (
    <div className="flex align-items-center gap-2 px-2">
        <Avatar image={currentUser?.profile_avatar} shape="circle" />
        <span className="font-bold">{currentUser?.username}</span>
        <Button icon="pi pi-user-edit" className="p-1" text severity="secondary" onClick={() => setVisible(true)} size='medium'/>
        {/* <Button icon="pi pi-ellipsis-v" text severity="secondary" aria-label="admin workstream menu" size='small' className="p-1" onClick={(event) => menuRight.current.toggle(event)} aria-controls="popup_menu" aria-haspopup /> */}
    </div>
  );

  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    let files = e.files;

    Object.keys(files).forEach((key) => {
        _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
    setInputData({
      ...inputData,
      avatar: files[0],
    });
  };


  const onTemplateRemove = (file, callback) => {
      setTotalSize(totalSize - file.size);
      callback();
  };

  const onTemplateClear = () => {
      setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton } = options;
  

    return (
        <div className={className + ' py-1'} style={{ display: 'flex', alignItems: 'center' }}>
            {chooseButton}
        </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
        <div className="flex align-items-center flex-wrap">
            <div className="flex align-items-center" style={{ width: '40%' }}>
                <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                <span className="flex flex-column text-left ml-3">
                    {file.name}
                    <small>{new Date().toLocaleDateString()}</small>
                </span>
            </div>
            <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
        </div>
    );
    };

  const emptyTemplate = () => {
    return (
        <div className="flex align-items-center flex-column">
            <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
            <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-2">
                Drag and Drop Image Here
            </span>
        </div>
    );
  };

  const handleChange = (event) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosReq.put(`/api/profiles/${currentUser.pk}/`, inputData);
      console.log(data)
    } catch (err) {
      setErrors(err.response?.data);
      console.log(err)
    }
    setVisible(false)
  }

  const chooseOptions = { icon: 'pi pi-fw pi-images', size: 'small', iconOnly: true, className: 'custom-choose-btn p-button-secondary p-button-rounded p-button-outlined' };
  const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined hidden' };
  const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined hidden' };
  return (
    <div className="card">
        <Fieldset legend={legendTemplate} pt={{ legend: { className: "bg-surface p-1 text-md" }, content: { className: "p-0" }}}>
          <ScrollPanel className='p-2' style={{ width: '100%', height: '90vh' }}>
          </ScrollPanel>
        </Fieldset>
        <Dialog
                visible={visible}
                modal
                onHide={() => {if (!visible) return; setVisible(false); }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-1" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                        <div className="inline-flex flex-column gap-1">
                            <label htmlFor="first_name" className="text-primary-50 font-semibold">
                                First Name
                            </label>
                            <InputText value={first_name} onChange={handleChange} name='first_name' id="first_name" label="first_name" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-1">
                            <label htmlFor="last_name" className="text-primary-50 font-semibold">
                                Last Name
                            </label>
                            <InputText value={last_name} onChange={handleChange} name='last_name' id="last_name" label="last_name" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                          <FileUpload 
                            ref={fileUploadRef} 
                            name="avatar" 
                            accept="image/*" 
                            maxFileSize={1000000}
                            onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                            headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                            chooseOptions={chooseOptions}
                            pt={{ buttonbar: {className: 'py-1'}, content: {className: 'py-1'}, buttonbar: {className: 'py-1'}}}
                            />
                        </div>
                        
                        <div className="flex align-items-center gap-2">
                            <Button label="Submit" onClick={handleSubmit} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
    </div>
  )
}

export default Profile
