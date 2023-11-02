import axios from 'axios';

export const fetchAllData = () => async (dispatch) =>{
    try {
        dispatch({type : 'DATA_REQUEST'})
    
        const {data} = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment/");

        dispatch({type : 'DATA_SUCCESS', payload : data});

    } catch (error) {
        dispatch({type : 'DATA_FAILURE'})
    }
}

export const selectData = (group, allTickets, orderValue) => async (dispatch) =>{
    try {
        dispatch({type : 'SELECT_DATA_REQUEST'})

        let user = false;
        let importance = false;
        let arr = [], selectedData = [];

        if(group === 'status'){
            
      
    
            arr = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
    
            arr.forEach((elem, index) => {
                let arr = allTickets.filter((fElem) => {
                    return elem === fElem.status;
                })
                selectedData.push({
                    [index] : {
                        title : elem,
                        value : arr
                    }
                })
            })
        }
        else if(group === 'user'){
            user = true;
            allTickets?.allUser?.forEach((elem, index) => {
                arr = allTickets?.allTickets?.filter((Felem) => {
                    return elem.id === Felem.userId;
                })

                selectedData.push({
                    [index] : {
                        title : elem.name,
                        value : arr
                    }
                })
            })
        }
        else{
            importance = true;
            let prior_list = ["No priority", "Urgent", "High", "Medium", "Low"];
            prior_list.forEach((elem, index) => {      // element and corresponding index
                arr = allTickets.filter((ticket) => {
                    return index === ticket.priority;
                })

                selectedData.push({
                    [index] : {
                        title : elem,
                        value : arr
                    }
                })
            })
        }

        if(orderValue === "title"){
            selectedData.forEach((elem, index) => {
                elem[index]?.value?.sort((a, b) => a.title.localeCompare(b.title))
            })
        }

        if(orderValue === "priority"){
            selectedData.forEach((elem, index) => {
                elem[index]?.value?.sort((a, b) => b.priority - a.priority) // descending order sorting
            })
        }
        
        dispatch({type : 'SELECT_DATA_SUCCESS', payload : {selectedData, user, importance}});

    } catch (error) {
        dispatch({type : 'SELECT_DATA_FAILURE', payload : error.message})
    }
}
