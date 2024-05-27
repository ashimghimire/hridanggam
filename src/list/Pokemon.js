import React from 'react';

function Pokemon({search,pokemons=[]}) {
    return (
        <div className='mt-2'>
            <ul className='list-group'>
                {pokemons&&pokemons.map(item=><li className='list-group-item'><a href={item.url}>{item.name}</a></li>)}
            </ul>
        </div>
    );
}

export default Pokemon;