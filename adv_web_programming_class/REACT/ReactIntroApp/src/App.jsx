import React from 'react';
import Greetings from './components/Greetings';
import UserCard from './components/UserCard';
import CardContainer from './components/CardContainer'

const App = () => {
 const users = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 }
];
users.sort((a, b) => b.age - a.age);
console.log(users);

  return ( 
    <div  >
    <CardContainer>
    <Greetings name="Devante"/>
    {users.map((users,index) =>(
    <UserCard key={index} name={users.name} age= {users.age} />  
    ))}

    </CardContainer> 
    </div>
  );
};
export default App;
