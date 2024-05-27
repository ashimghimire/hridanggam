import React, { useEffect, useState } from 'react';
import Pokemon from '../list/Pokemon';
import { useInput } from 'react-hookedup';
import SearchPokemon from '../search/SearchPokemon';

function PokemonContainer(props) {
    
    const [search,setSearch]=useState('');
    const threshold = 4;

    function handleChange(event){
        event.preventDefault();
        setSearch(event.target.value);
    }

    const [pokemons,setPokemons]=useState([]);
    
    async function getPokemons(){
        
        let resource;
        
             resource= await fetch("https://pokeapi.co/api/v2/pokemon");
             
            if(resource.ok){ 
                console.log("reached=here")
                let responseJson=await resource.json();
                return responseJson.results;
            }
            else return (await resource).statusText; 
        
    }


    function levenshteinDistance(a, b) {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;
    
        const matrix = [];
    
        // Initialize matrix
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
    
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }
    
        // Calculate distances
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, // Substitution
                        matrix[i][j - 1] + 1,     // Insertion
                        matrix[i - 1][j] + 1      // Deletion
                    );
                }
            }
        }
    
        return matrix[b.length][a.length];
    }

    function peformFetch(){
        const fetchPokemon= async()=>{
            let pokemon= await getPokemons();
            setPokemons(pokemon);
        }
        fetchPokemon();
    }

    useEffect(()=>{
        peformFetch();
    },[]);

    useEffect(()=>{
        
        if(search==='')  {
            peformFetch();
        }

        // const delayDebounceFn = setTimeout(() => {
        else {
            let filteredList = pokemons.filter(item => {
                return levenshteinDistance(item.name.toUpperCase(), search.toUpperCase()) <= threshold;
            });
            console.log("=====",filteredList);
            setPokemons(filteredList);
        }
        //   }, 3000);
        //   return () => clearTimeout(delayDebounceFn);
    },[search]);

    return (
        <div className='container'>
            <SearchPokemon handleChange={handleChange} search={search}/>
            <Pokemon search={search} pokemons={pokemons}/>
        </div>
    );
}

export default PokemonContainer;