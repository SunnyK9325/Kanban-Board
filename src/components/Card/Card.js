import React from 'react';
import './Card.css';
import { BiSolidCircle } from 'react-icons/bi';

import {TbAlertSquareFilled} from 'react-icons/tb';
import {RiContrastLine} from 'react-icons/ri';
import {LuCircleDashed} from 'react-icons/lu';

import SignalCellularAlt2BarSharpIcon from '@mui/icons-material/SignalCellularAlt2BarSharp';
import SignalCellularAlt1BarSharpIcon from '@mui/icons-material/SignalCellularAlt1BarSharp';
import SignalCellularAltSharpIcon from '@mui/icons-material/SignalCellularAltSharp';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import img0 from '../../images/img0.png';
import img1 from '../../images/img1.png';
import img2 from '../../images/img2.png';
import img3 from '../../images/img3.png';
import img4 from '../../images/img4.png';

const imageMap = {
    'usr-1': img0,
    'usr-2': img1,
    'usr-3': img2,
    'usr-4': img3,
    'usr-5': img4,
};

const priorityIcons = {
    0: <MoreHorizIcon />,
    1: <TbAlertSquareFilled style={{fontSize:"20px"}} />,
    2: <SignalCellularAltSharpIcon />,
    3: <SignalCellularAlt2BarSharpIcon />,
    4: <SignalCellularAlt1BarSharpIcon />
};

const statusIcons = {
    0: <CircleOutlinedIcon style={{color:"#E2E2E2"}}/>,
    1: <RiContrastLine style={{color: "#F1CB50", fontSize:'25px'}}/>,
    2: <LuCircleDashed style={{color: '#E1E1E1', fontSize:'20px'}}/>,
    3: <CancelIcon style={{color: '#E1E1E1', fontSize:'22px'}} />,
    4: <CheckCircleIcon style={{color: '#5E6AD2'}} />
  }

const Card = ({ id, title, tag, user, priority, importance, userId }) => {
    // Maximum number of characters to display in title
    const maxLength = 55;

    // Truncates the title if it exceeds the maximum length
    const truncateTitle = (title) => {
        if (title.length > maxLength) {
            return title.slice(0, maxLength) + '...';
        }
        return title;
    };

    return (
        <div className="cardContainer">
            {/* Heading section */}
            <div className="cardHeading">
                <span>{id}</span>
                <div className="imageContainer">
                    {!user &&
                        <>
                            <img src={imageMap[userId]} alt="UserImage" />
                            <div className="showStatus"></div>
                        </>}
                </div>
            </div>

            {/* Title section */}
            <div className="cardTitle">
            <div className="titleWithIcon" style={{display:'flex', alignItems:'center'}}>
                    {(importance || user ) && statusIcons[priority]}
                    <p>{truncateTitle(title)}</p>
                </div>
            </div>

            {/* Tags section */}
            <div className="cardTags">
                {!importance &&
                    <>
                        <div className="tags">
                            {priorityIcons[priority]}
                        </div>
                    </>}
                {tag?.map((elem, index) => {
                    return (
                        <div key={index} className="tags">
                            <BiSolidCircle style={{color:'#E1E1E1'}}/> <span style={{ fontSize: '12px' }}>{elem}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Card;
