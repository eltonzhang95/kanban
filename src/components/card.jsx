import { Card, Avatar } from "antd";
import { CheckCircleOutlined, LikeOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import React from "react";
import './kanbanStyle.css'

class SingleCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    function GetInitial(props) {

      const [fName, lName] = props.assignee.split(" ")

      const initial =  `${fName[0]}${lName[0]}`

      return (
        <Avatar shape="circle" size={28} style={{ background: "blue" }}>
          {initial}
        </Avatar>
      );
    }

    function showAlert(taskName) {
      alert(`${taskName} is clicked`);
    }

    if (this.props.content) {

      return (
        <Card
          className="card"
          onClick={() => showAlert(this.props.content.title)}
        >
          <div className="card-top-row">
            <CheckCircleOutlined className="check-circle" />
            <div className="task">{this.props.content.title}</div>
          </div>
          <div className="priority">{this.props.content.priority}</div>
          <div className="card-bottom-row">
            <GetInitial assignee={this.props.content.author} />
            <div className="due-date">{this.props.content.dueDate}</div>
            <LikeOutlined classID="like-btn" />
          </div>
        </Card>
      );
    }

    return <Card />;
  }
}

export default SingleCard;
