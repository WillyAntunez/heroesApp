import React, {useEffect} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../components/HeroCard';
import { getHeroesByName } from '../helpers';


export const SearchPage = () => {
 
  const navigate = useNavigate();
  
  const [searchParams] = useSearchParams();
 
  const {q = ''} = Object.fromEntries([...searchParams]);
  
  const heroes = getHeroesByName(q);
 
  const {searchText, onInputChange, onResetForm} = useForm({
    searchText: q,
  });
 
  const onSearchSubmit = (event) => {
    event.preventDefault();
 
    if (searchText.trim().length < 1) return;
    
    navigate(`?q=${searchText}`);
  }


  const showSearch = (q.length === 0);
  const showError  = (q.length > 0) && heroes.length === 0;

  return (
    <div className='container mt-5'>
      <h1>Search</h1>
      <hr />
 
      <div className="row">
        <div className="col-5">
          
            <h4>Searching</h4>
            <hr />
 
            <form action="" onSubmit={ onSearchSubmit }>
              <input type="text"
              placeholder='Search hero'
              className='form-control'
              name='searchText'
              autoComplete='off'
              value={searchText}
              onChange={onInputChange} />
 
              <button className='btn btn-outline-primary mt-1' aria-label='search-button'>
                Search
              </button>
            </form>
 
        </div>
 
        <div className="col-7">
          <h4>Results</h4>
          <hr />
 
          <div className='alert alert-primary'>
            Search a hero
          </div>
 
          <div className='alert alert-danger' 
            style={{display: showError ? '': 'none'}}  
            aria-label="no-results">
            There's no results with <b>{q}</b>
          </div>
 
          {
            heroes.map( hero => (
              <HeroCard key={hero.id} {...hero} />
            ))
          }
 
        </div>
      </div>
    </div>
  )
}
