import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar' ;
import DashBoard from './components/DashBoard/DashBoard';
import { useDispatch, useSelector } from 'react-redux';
import {fetchAllData} from './redux/Actions/action';

const App = () => {
  const dispatch = useDispatch();
  const { allTickets } = useSelector(state => state.DataReducer);

  useEffect(() => {
    // Fetch data when component mounts
    if (!allTickets) {
      dispatch(fetchAllData());
    }
  }, [dispatch, allTickets]);

  // Render if allTickets data is not available yet
  if (!allTickets) {
    return null;
  }

  // Render when allTickets data is available
  return (
    <div>
      <Navbar />
      <hr style={{color: '#E1E1E1', border:'none'}}/>
      <DashBoard />
    </div>
  );
};

export default App;
