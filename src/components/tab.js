function GetInitial(props){
    let fullName = props.assignee;
    let initial = fullName.split(" ").reduce((response,word)=> response+=word.slice(0,1),'');

    return <div className="assignee">{initial}</div>;
}

function Tab(props){
    const showAlert = (props)=>{
        alert(`${props.task} is clicked`);
    }

    return (<div className="card" onClick={()=>showAlert(props)}>
        <div className="card-content">
            <div className="task">{props.task}</div>
            <div className="priority">{props.priority}</div>
            <div className="card-sub-container">
                <GetInitial assignee={props.assignee}/>
                <div className="due-date">{props.due}</div>
            </div>
        </div>
    </div>)
}

export default Tab;