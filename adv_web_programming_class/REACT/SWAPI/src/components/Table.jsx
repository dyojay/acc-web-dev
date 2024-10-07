import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Table.css'; 

const Table = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://swapi.dev/api/people/');
        setData(response.data.results);
        setIsLoading(false);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError('An error occurred while fetching data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <table className="star-wars-table">
      <caption>Star Wars Characters</caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Height</th>
          <th>Hair Color</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        {data.map((character, index) => (
          <tr key={index}>
            <td>{character.name}</td>
            <td>{character.height}</td>
            <td>{character.hair_color}</td>
            <td>{character.gender}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;