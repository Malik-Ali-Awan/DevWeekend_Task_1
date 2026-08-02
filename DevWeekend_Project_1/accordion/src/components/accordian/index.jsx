import React, { useState } from 'react'
import data from './data';
import './styles.css'
const Accordian = () => {
    const [selected, setSelected] = useState(null);
    const [enableMultiSel, setEnableMultiSel] = useState(false);

    const [multiple, setMultiple] = useState([]);

    const handleItem = (id) => {
        if(selected === id){
            setSelected(null);
            return;
        }
        setSelected(id);
    }

    const handleMultiSel = (id) => {
        //remove id from multiple if already present
        if(multiple.indexOf(id)!==-1){
            const cpy = multiple.filter(id1 => id1!==id);
            setMultiple(cpy);
            return;
        }
        setMultiple([...multiple, id]);
        console.log(multiple);
    }

    return (
        <div className='acc-wrapper'>
            <button  onClick={() => setEnableMultiSel(!enableMultiSel)}>
                Enable Multi Selection
            </button>
            <div className="accordian">

                {
                    data && data.length > 0 ?
                        data.map(dataItem => (
                            <div key={dataItem.id} className="item">
                                <div onClick={() => (
                                    enableMultiSel?
                                    handleMultiSel(dataItem.id):
                                    handleItem(dataItem.id)
                                )} className="title">
                                    <h3>{dataItem.question}</h3>
                                    <span>+</span>
                                </div>

                                {
                                    enableMultiSel?
                                    multiple.indexOf(dataItem.id)!==-1 && (
                                        <div className='acc-content'>{dataItem.answer}</div>
                                    )

                                    :
                                    selected === dataItem.id &&
                                        (
                                            <div className='acc-content'>{dataItem.answer}</div>
                                        )
                                       
                                    
                                }

                                

                            </div>
                        ))
                        : (<div>no data found</div>)

                }


            </div>
        </div>
    )
}

export default Accordian