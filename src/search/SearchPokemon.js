import React from 'react';

function SearchPokemon({search,handleChange}) {


    return (
        <div>
           <div className='row'>
            <div className='col-sm-12'>
                <div className='input-group'>
                    <input type="text" onChange={handleChange} value={search} className='form-control'/>
                    <div class="input-group-append"><span class="input-group-text" id="basic-addon2">Search</span></div>
                    </div>
            </div>
           </div> 
        </div>
    );
}

export default SearchPokemon;