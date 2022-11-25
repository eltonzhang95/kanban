import { Card, Avatar, Modal  } from "antd";
import { CheckCircleOutlined, LikeOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import React from "react";
import './kanbanStyle.css'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateSeletedCol, updateSeletedTask, updateContent } from '../store/reducer'

function SingleCard(props) {

  // return initial
  function GetInitial(props) {
    let initial = "NA"
    try{
      const [fName, lName] = props.assignee.toUpperCase().split(" ")

      initial =  `${fName[0]}${lName[0]}`
      
    } catch(e) {
      
    }

    return (
      <Avatar shape="circle" size={28} style={{ background: "blue" }}>
        {initial}
      </Avatar>
    );
  }

  // // show alert
  // function showAlert(taskName) {
  //   alert(`${taskName} is clicked`);
  // }

  // handle delete card
  const dispatch = useDispatch();
  const columns = useSelector((state) => {return state.card.content});
  const colToUpdate = useSelector((state) => {return state.card.selectedColTitle});
  const taskToUpdate = useSelector((state) => {return state.card.selectedTaskName});

  const [open, setOpen] = useState(false);
  const [deletePrompt, setDeletePrompt] = useState('');
  

  const openDeleteCardModal = (taskName, colIndex) => {
    dispatch(updateSeletedCol(colIndex));
    dispatch(updateSeletedTask(taskName));
    setOpen(true);
    setDeletePrompt(`Delete task ${taskName}?`)
  }

  const handleOk = () => {
    dispatch(
      updateContent(
          columns.map((col,index)=>{
            if(col.columnTitle === colToUpdate){
              return {
                columnTitle: col.columnTitle,
                cards: col.cards.filter((task) => task.title !== taskToUpdate)
              };
            }
            return col;
          })
      )
    );

    // const newColumns = () => {
    //   return columns.map((col,index)=>{
    //     if(col.columnTitle === colToUpdate){
    //       return {
    //         columnTitle: col.columnTitle,
    //         cards: col.cards.filter((task) => task.title !== taskToUpdate)
    //       };
    //     }
    //     return col;
    //   });
    // }

    // dispatch(updateContent(newColumns()));
    setOpen(false);
  }

  const handleCancel = () => {
    setOpen(false);
  }

  // render card component
  if (props.content) {

    return (
      <Card
        className="card"
        // onClick={() => showAlert(props.content.title)}
      >
        <div className="card-top-row">
          <div>
            <CheckCircleOutlined className="check-circle" />
            <div className="task">{props.content.title}</div>
          </div>
          <DeleteOutlined onClick={()=>openDeleteCardModal(props.content.title, props.colIndex)}/>
        </div>
        <div className="priority">{props.content.priority}</div>
        <div className="card-bottom-row">
          <div>
            <GetInitial assignee={props.content.author} />
            <div className="due-date">{props.content.dueDate}</div>
          </div>
          <LikeOutlined classID="like-btn" />
        </div>
        <Modal
        title="Delete Task"
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{deletePrompt}</p>
        </Modal>
      </Card>
    );
  }

  return <Card />;

}

export default SingleCard;
