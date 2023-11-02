import React from "react";
import { useSelector } from "react-redux";
import "./DashBoard.css";
import Card from "../Card/Card";

import { AiOutlinePlus } from "react-icons/ai";
import { HiDotsHorizontal } from "react-icons/hi";
import {TbAlertSquareFilled} from 'react-icons/tb';
import {RiContrastLine} from 'react-icons/ri';
import {LuCircleDashed} from 'react-icons/lu';

import SignalCellularAlt2BarSharpIcon from '@mui/icons-material/SignalCellularAlt2BarSharp';
import SignalCellularAlt1BarSharpIcon from '@mui/icons-material/SignalCellularAlt1BarSharp';
import SignalCellularAltSharpIcon from '@mui/icons-material/SignalCellularAltSharp';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

import img0 from '../../images/img0.png';
import img1 from '../../images/img1.png';
import img2 from '../../images/img2.png';
import img3 from '../../images/img3.png';
import img4 from '../../images/img4.png';

const imageMap = {
  'Anoop sharma': img0,
  'Yogesh': img1,
  'Shankar Kumar': img2,
  'Ramesh': img3,
  'Suresh': img4,
};

const priorityIcons = {
  0: <MoreHorizIcon />,
  1: <TbAlertSquareFilled style={{color:"orange", fontSize:"25px"}}/>,
  2: <SignalCellularAltSharpIcon />,
  3: <SignalCellularAlt2BarSharpIcon />,
  4: <SignalCellularAlt1BarSharpIcon />
};

const statusIcons = {
  0: <CircleOutlinedIcon style={{color:"#E2E2E2"}}/>,
  1: <RiContrastLine style={{color: "#F1CB50", fontSize:'25px'}}/>,
  2: <LuCircleDashed />
}


const DashBoard = () => {
  const { selectedData, user, importance } = useSelector((state) => state.SelectDataReducer);
  console.log(selectedData);

  return selectedData && (
    <div className="dashContainer">
      {selectedData.map((elem, index) => {
        console.log(elem[index]);
        return (
          <div key={index} className="dashCardContainer">
            <div className="dashCardHeading flex-sb" style={{marginBottom:'25px'}}>
              <div className="leftView">
                {!user && !importance ? (           // status icons
                  <div className="icon">
                    {statusIcons[index]}
                  </div>
                ) : !importance ? (                 // user icons
                  <div className="imageContainer">
                    <img
                      style={{
                        marginLeft: "10px",
                        width: "125%",
                        height: "125%",
                        borderRadius: "50%",
                      }}
                      src={imageMap[elem[index]?.title]}
                      alt="UserImage"
                    />
                  </div>
                ) : (                                 // priority icons
                  <div className="icon">
                    {priorityIcons[index]}
                  </div>
                )}

                <span style={{ color: 'black', marginLeft: '20px' }}>
                  {elem[index]?.title}
                </span>

                <span style={{ color: 'grey', marginLeft: '15px' }}>
                  {elem[index]?.value?.length}
                </span>

              </div>
              <div className="rightView">
                <AiOutlinePlus style={{ marginRight: '10px' }} />{" "}
                <HiDotsHorizontal style={{ marginRight: '15px' }} />
              </div>
            </div>
            <div className="dashList flex-gap-10" style={{gap:'12px'}}>
              {elem[index]?.value?.map((elem, ind) => (
                <Card id={elem.id} title={elem.title} tag={elem.tag} user={user} priority={elem.priority} importance={importance} userId={elem.userId}/>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashBoard;