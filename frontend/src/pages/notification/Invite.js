import React, { useRef, useState } from "react";
import { Avatar } from "primereact/avatar";
import { Tag } from "primereact/tag";
import moment from "moment";
import { axiosReq } from "../../api/axiosDefaults";

const Invite = ({ props, admin, url, setID, setUrl, confirmDialog }) => {
  
  const {
    id,
    is_owner,
    user,
    display_name,
    avatar,
    accepted,
    workstream,
    inbound,
    created_at,
  } = props;

  return (
    <>
      <div className="col-12 md:col-6 lg:col-3">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
          <div className="flex justify-content-between mb-1">
            <div>
              <span className="block text-500 font-medium mb-1">
                {display_name}
              </span>
              <div className="text-900 font-medium text-xl">
                {moment(created_at).format("Do, MMM")}
              </div>
            </div>
            <div
              className={`flex align-items-center justify-content-center ${
                inbound ? "bg-green-100" : "bg-blue-100"
              } border-round`}
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <Avatar image={avatar} />
            </div>
          </div>
          <div className="flex justify-content-between">
            <span
              className={`${
                inbound ? "text-green-500" : "text-blue-500"
              } font-medium`}
            >
              {inbound ? "Requested" : "Invited"}
            </span>
            {inbound !== admin ? (
              <Tag
                className="cursor-pointer"
                icon="pi pi-times"
                severity="danger"
                value="Delete"
                onClick={() => {
                  setUrl(url)
                  setID(id)
                  {admin ? (
                    confirmDialog(`Are you sure you want to delete Workstream Invite for ${display_name}`)
                  ) : (
                    confirmDialog(`Are you sure you want to delete Join Request for ${display_name}`)
                  )
                  }
                }}
              ></Tag>
            ) : (
              <Tag
                className="cursor-pointer"
                icon="pi pi-check"
                severity="success"
                value="Accept"
              ></Tag>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Invite;
