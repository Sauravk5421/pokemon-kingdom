import { useState, useEffect } from "react";
import './PokemonCSS.css';
import Modal from './Modal'

function PokemonCard(){
    // var nextPageURL;
    // let singleURL;  

    const [URL, setURL] = useState('https://content.newtonschool.co/v1/pr/64ccef982071a9ad01d36ff6/pokemonspages1');
    const [detailsData, setdetailsData] = useState([]);
    const [detailsURL, setdetailsURL] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState();

    async function getPokemonData(){
        let response1 = await fetch(URL);
        let currentPageData = await response1.json();
        let results = currentPageData[0]['results'];
        let nextPageURL =  currentPageData[0]['next'];
        if(nextPageURL == undefined){
            document.querySelector('.load-more').disabled = true;
        }else {
            document.querySelector('.load-more').disabled = false;
        }
        setURL(nextPageURL);
        const allPokemon = [];  
        var allURL = [];      
        for(let i=0; i<results.length; i++){
            let response2 = await fetch(results[i].url);
            let pokemomDetailsData = await response2.json();
            allPokemon.push(pokemomDetailsData[0]);
            allURL.push(results[i].url)
           
        }
        setdetailsURL((prevData)=>[...prevData, ...allURL]);
        setdetailsData((prevData)=>[...prevData, ...allPokemon]);
    }

    useEffect(()=>{
        getPokemonData(URL);
    },[]);


    const getPokemonStats=(currentPokemon)=>{
        setIsOpen(true);
        let singleURL = detailsURL[currentPokemon-1];
        setSelectedItem(singleURL);  
    }

    // function nextPageLoad(){
        // setURL(nextPageURL);
        // getPokemonData();
    // }

    return (

        <>
            <div className="app-container"> 
                {detailsData.map((singleItem)=>{
                    return <div class={singleItem.type} id='card' >
                        <span class="card-id">#{singleItem.id}</span>
                        <img class="img1" src={singleItem.image}/>
                        <h2 class="card-name">{(singleItem.name).toUpperCase()}</h2>
                        <p class="card-type">Type: {singleItem.type}</p>
                        <button onClick={()=>{getPokemonStats(singleItem.id)}} id="more-btn" class={singleItem.type}>Know more...</button>
                    </div>
                })}
                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                    {selectedItem}
                </Modal>

            </div> 

           <div class='load-div'>
                <button onClick={()=>{getPokemonData()}} class="load-more">More Pokemons</button>
           </div>
        </>     
    );
}

export default PokemonCard;