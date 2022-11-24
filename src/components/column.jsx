import SingleCard from './card.jsx'
import React from 'react'
import { PlusOutlined, MoreOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateSeletedCol, updateContent } from '../store/reducer'
import { Form } from 'antd'
import { v4 as uuidv4 } from "uuid";

function SingleColumn(props) {

    const [newCardForm] = Form.useForm();

    const dispatch = useDispatch();
    const columns = useSelector((state) => {return state.card.content});
    const colToUpdate = useSelector((state) => {return state.card.selectedColTitle});

    // Handle new card modal
    const [open, setOpen] = useState(false);

    const openCardModal = (col) => {
        newCardForm.resetFields()
        setOpen(true);
        dispatch(updateSeletedCol(col));
    }

    const handleCancel = () => {
        newCardForm.resetFields()
        setOpen(false);
    }

    const handleOk = () => {
        const newCardContent = {
            id: uuidv4(),
            ...newCardForm.getFieldValue(),            
        };
        
        const newKanban = () => {
            return columns.map((col,index) => {
                if (col.columnTitle === colToUpdate){
                    return {
                        columnTitle: col.columnTitle,
                        cards:[...col.cards, newCardContent]
                    };
                }
                return col;
            });
        }

        dispatch(updateContent(newKanban()));
        newCardForm.resetFields()
        setOpen(false);
    }

    // load cards
    if(!props.cards) return <>Loading...</>

    return <div className='column'>
        <div className='column-header'>
            <div className='column-name'>{props.colName}</div>
            <div className='column-header-button'>
                <PlusOutlined onClick={() => openCardModal(props.colName)} style={{fontSize: '20px'}}/>
                <MoreOutlined style={{fontSize: '20px'}} rotate = "90"/>
            </div>
        </div>
        <div className='column-card-area'>
            {
                props.cards && props.cards.map((card, i) => {
                    return <SingleCard key={card.id} content = {card} />
                })
            }
        </div>
        <Modal className='kanban-modal'
            title="New Task"
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form className='modal-form' form={newCardForm}>
                <Form.Item name="title" label="Task" rules={[{required: true}]}>
                    <input style={{width: "100%"}} value=''></input>
                </Form.Item>
                <Form.Item name="priority" label="Priority" rules={[{required: true}]}>
                    <input style={{width: "100%"}} value=''></input>
                </Form.Item>
                <Form.Item name="author" label="Assignee" rules={[{required: true}]}>
                    <input style={{width: "100%"}} value=''></input>
                </Form.Item>
                <Form.Item name="dueDate" label="Due Date" rules={[{required: true}]}>
                    <input style={{width: "100%"}} value=''></input>
                </Form.Item>
            </Form>
        </Modal>
    </div>

}

export default SingleColumn;