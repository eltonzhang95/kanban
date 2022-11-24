import SingleColumn from '../components/column.jsx'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateContent } from '../store/reducer'
import { Modal } from 'antd'

const Kanban = () => {

    // Handle default loading from DB
    const dispatch = useDispatch();
    const columns = useSelector((state) => {return state.card.content});

    useEffect(()=>{
    axios.get('http://localhost:3001/tasks').then(res => {
        const response = res.data;
        dispatch(updateContent(response));
    })
    },[])

    // Handle new column modal
    const [open, setOpen] = useState(false);
    const [newColTitle, setNewColTitle] = useState("");

    const showNewColModal = () => {
        setOpen(true);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const handleOk = () => {
        // duplication check
        const usedColTitle = columns.map((col,index) => {
            return col.columnTitle.toUpperCase();
        })
        if(usedColTitle.includes(newColTitle.toUpperCase())){
            alert(`${newColTitle} already exist!`);
        }else{
            dispatch(updateContent([...columns,{columnTitle:newColTitle,cards: []}]))
            setOpen(false);
        }
    }

    // Load columns
    if(!columns) return <>Loading Columns...</>

    return <div className = "columns">
        {
            columns.map((col,i) => {
                return <SingleColumn key = {col.columnTitle} colName = {col.columnTitle} cards = {col.cards}/>
            })
        }
        <button className='new-col-button' onClick={showNewColModal}>New Column</button>
        <Modal className='kanban-modal'
            title="New Column"
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <form className='modal-form'>
                <label>Title</label>
                <input style={{width: "100%"}} onChange={(e) => {
                    const {value} = e.target;
                    setNewColTitle(value);
                }
                }></input>
            </form>
        </Modal>
    </div>;

}

export default Kanban