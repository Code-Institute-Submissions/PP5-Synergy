import React, { useEffect, useRef, useState } from "react";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { Fieldset } from "primereact/fieldset";
import { Avatar } from "primereact/avatar";
import { ScrollPanel } from "primereact/scrollpanel";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { Tag } from "primereact/tag";

const Profile = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const [loaded, setLoaded] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef();
  const [inputData, setInputData] = useState({
    first_name: "",
    last_name: "",
    avatar: null,
  });
  const { first_name, last_name, avatar } = inputData;
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: profileData }] = await Promise.all([
          axiosReq.get(`/api/profiles/${currentUser.pk}/`),
          // axiosReq.get(`/posts/?owner__profile=${id}`),
        ]);
        setProfileData({ profileData });
        const { first_name, last_name, avatar } = profileData;
        setInputData({ first_name, last_name, avatar });
        setLoaded(true);
      } catch (err) {}
    };
    fetchData();
  }, [currentUser]);

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    setImage(null);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
    setImage(null);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton } = options;

    return (
      <div
        className={className + " py-1"}
        style={{ display: "flex", alignItems: "center" }}
      >
        {chooseButton}
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: "40%" }}>
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            width={100}
          />
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="my-2"
        >
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
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);

    if (image !== null) {
      formData.append("avatar", image);
    }
    try {
      const { data } = await axiosReq.put(
        `/api/profiles/${currentUser.pk}/`,
        formData
      );
      setProfileData(data);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_avatar: data.avatar,
      }));
      setImage(null);
    } catch (err) {
      setErrors(err.response?.data);
    }
    setVisible(false);
  };

  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    size: "small",
    iconOnly: true,
    className:
      "custom-choose-btn p-button-secondary p-button-rounded p-button-outlined",
  };

  return (
    <>
      <div className={"col-12 md:col-6 lg:col-3"}>
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
          <div className="flex justify-content-between mb-1">
            <div>
              <span className="block text-500 font-medium mb-1">Profile :</span>
              <div className="text-900 font-medium text-xl">{currentUser?.username}</div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-primary-100 border-round"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <Avatar image={currentUser?.profile_avatar} />
            </div>
          </div>
          <div className="flex justify-content-between">
            <span className="text-primary-500 font-medium">{first_name + " " + last_name}</span>
            <Tag
                  className="cursor-pointer"
                  icon="pi pi-user-edit"
                  severity="primary"
                  value='Edit'
                  onClick={() => setVisible(true)}
                ></Tag>
          </div>
        </div>
      </div>
      <Dialog
        visible={visible}
        modal
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        content={({ hide }) => (
          <div
            className="flex flex-column px-8 py-5 gap-1"
            style={{
              borderRadius: "12px",
              backgroundImage:
                "radial-gradient(circle at left top, var(--primary-400), var(--primary-700))",
            }}
          >
            <div className="inline-flex flex-column gap-1">
              <label
                htmlFor="first_name"
                className="text-primary-50 font-semibold"
              >
                First Name
              </label>
              <InputText
                value={first_name}
                onChange={handleChange}
                name="first_name"
                id="first_name"
                label="first_name"
                className="bg-white-alpha-20 border-none p-3 text-primary-50"
              ></InputText>
            </div>
            <div className="inline-flex flex-column gap-1">
              <label
                htmlFor="last_name"
                className="text-primary-50 font-semibold"
              >
                Last Name
              </label>
              <InputText
                value={last_name}
                onChange={handleChange}
                name="last_name"
                id="last_name"
                label="last_name"
                className="bg-white-alpha-20 border-none p-3 text-primary-50"
              ></InputText>
            </div>
            <div className="inline-flex flex-column gap-2">
              <FileUpload
                ref={fileUploadRef}
                name="avatar"
                accept="image/*"
                maxFileSize={1000000}
                onSelect={(e) => {
                  let files = e.files;
                  setImage(files[0]);
                }}
                onError={onTemplateClear}
                onClear={onTemplateClear}
                headerTemplate={headerTemplate}
                itemTemplate={itemTemplate}
                emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions}
                pt={{
                  content: { className: "py-1" },
                  buttonbar: { className: "py-1" },
                }}
              />
            </div>

            <div className="flex align-items-center gap-2">
              <Button
                label="Submit"
                onClick={handleSubmit}
                text
                className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
              ></Button>
              <Button
                label="Cancel"
                onClick={(e) => hide(e)}
                text
                className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
              ></Button>
            </div>
          </div>
        )}
      ></Dialog>
    </>
  );
};

export default Profile;
