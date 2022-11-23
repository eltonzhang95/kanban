import SingleCard from './card.jsx'
import React from 'react'
import { PlusOutlined, MoreOutlined } from '@ant-design/icons'

function SingleColumn(props) {

    const addNewCard = () => {

    }

    if(!props.cards) return <>Loading...</>

    return <div className='column'>
        <div className='column-header'>
            <div className='column-name'>{props.colName}</div>
            <div className='column-header-button'>
                <PlusOutlined onClick={addNewCard} style={{fontSize: '20px'}}/>
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
    </div>

}

export default SingleColumn;