import React from "react";
import SidebarContant from "./sidebarcontent/SidebarContant";
import AccordionItem from "../accordian/AccordianItem";
import { useSelector } from "react-redux";
import { FILE_ICON } from "../../assets/images/index";

function Sidebar() {
  const activeClass = useSelector((state) => state.toggle.activeClass);

  const contant = SidebarContant?.filter((ele) => ele.show == true);

  return (
    <div>
      <div className={activeClass ? "active SideBar" : "SideBar "}>
        <div className="SideBar-logo">
          <img src={FILE_ICON} className="img-fluid Logo" />
          <h2 className="SideBar-title">Bharat Auction</h2>
        </div>
        {contant?.map((value, index) => (
          <AccordionItem title={value.title} content={value.content} />
        ))}
        <a className="LogoutBtn">Logout</a>
      </div>
    </div>
  );
}

export default Sidebar;
