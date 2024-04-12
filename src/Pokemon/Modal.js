import React, { useEffect } from 'react'
import { useState } from "react";
import './Modal.css'


function Modal({ open, children, onClose }) {
    
    const [items, setItems] = useState([]);

    useEffect(()=>{
        fetch(children)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            setItems(data);
        })
    },[children]);




    if (!open) return null

    return (
        <>       
            {items.map((item)=>{
                return <div class={item.type} id="box-container">
                            <div>
                                <button class={item.type} id = 'close-btn' onClick={onClose}>X</button>
                            </div>
                            <div class='main'>
                                <img class="img" src={item.image}/>
                                <h2 class='card-name'>{item.name}</h2>
                            </div>

                            <div class={item.type} id = 'stat-detail'>
                                <div class = 'weight-height'>
                                    <p> Weight:  {item.weight}</p>
                                    <p>Height:  {item.height}</p>
                                </div>
                                <div class = "stat-name">
                                    <p>Stat1:<span>{item.stats[0].stat.name}</span></p>
                                    <p>Stat1:<span>{item.stats[1].stat.name}</span></p>
                                    <p>Stat1:<span>{item.stats[2].stat.name}</span></p>
                                    <p>Stat1:<span>{item.stats[3].stat.name}</span></p>
                                    <p>Stat1:<span>{item.stats[4].stat.name}</span></p>
                                    <p>Stat1:<span>{item.stats[5].stat.name}</span></p>
                                </div>

                                <div class = 'bs-data'>
                                    <p>Bs1:<span>{item.stats[0].base_stat}</span></p>
                                    <p>Bs2:<span>{item.stats[1].base_stat}</span></p>
                                    <p>Bs3:<span>{item.stats[2].base_stat}</span></p>
                                    <p>Bs4:<span>{item.stats[3].base_stat}</span></p>
                                    <p>Bs5:<span>{item.stats[4].base_stat}</span></p>
                                    <p>Bs6:<span>{item.stats[5].base_stat}</span></p>
                                </div>
                            </div>                        
                        </div>
            })}
        </>
    );
}
export default Modal;