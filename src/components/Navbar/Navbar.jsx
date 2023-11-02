import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectData } from "../../redux/Actions/action";
import { IoMdOptions } from 'react-icons/io';
import { BiSolidChevronDown } from "react-icons/bi";
import './Navbar.css';

const Navbar = () => {
  const [displayOnClick, setDisplayOnClick] = useState(false);
  const dispatch = useDispatch();
  const { allTickets, allUser } = useSelector(state => state.DataReducer);
  const [groupValue, setGroupValue] = useState(getGroup());
  const [orderValue, setOrderValue] = useState(getOrder());
  const dropdownRef = useRef(null);

  // Retrieve groupValue from localStorage or set default
  function getGroup() {
    return localStorage.getItem("group") || "status";
  }

  // Retrieve orderValue from localStorage or set default
  function getOrder() {
    return localStorage.getItem("order") || "priority";
  }

  // Handle changes in group or order selection
  const handleGroupValue = (e, valueBool) => {
    const selectedValue = e.target.value;
    // console.log(selectedValue);
    if (valueBool) {
      setGroupValue(selectedValue);
      setDisplayOnClick(!displayOnClick);
      localStorage.setItem("group", selectedValue);
    } else {
      setOrderValue(selectedValue);
      setDisplayOnClick(!displayOnClick);
      localStorage.setItem("order", selectedValue);
    }
  }

  // Handle click outside the dropdown to close it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDisplayOnClick(false);
    }
  };

  // Event listener for click outside dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Dispatch data based on selection changes
  useEffect(() => {
    const selectedData = groupValue === 'user' ? { allTickets, allUser } : allTickets;
    dispatch(selectData(groupValue, selectedData, orderValue));
  }, [allTickets, dispatch, groupValue, allUser, orderValue]);

  return (
    <div className="topheader">
      <div className="displayButton">
        <button className="headerButton" onClick={() => setDisplayOnClick(!displayOnClick)}>
          <IoMdOptions />
          Display
          <BiSolidChevronDown style={{ fontSize: '15px', color: 'grey', marginLeft: '5px' }} />
        </button>
        {displayOnClick && (
          <div ref={dropdownRef} className="dropOnClick">
            <div className="selectGroup">
              <span>Grouping</span>
              <select value={groupValue} onChange={(e) => handleGroupValue(e, true)} className="selectStyle" name="group" id="group">
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="selectGroup">
              <span>Ordering</span>
              <select value={orderValue} onChange={(e) => handleGroupValue(e, false)} className="selectStyle" name="order" id="order">
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
