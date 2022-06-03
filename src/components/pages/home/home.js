import React, {useState}  from "react";
import "./home.css";
import {Link} from "react-router-dom";
const Home = () => {
  //userInput have the value of what user search
   const [userInput, setUserInput] = useState("");
   // take have infromation about users
   const [take, setTake] = useState([]);

    const handleSearch = (e) => {
      setUserInput(e.target.value);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      if(userInput) {
      fetch(`https://api.github.com/search/users?q=${userInput}`)
        .then(res => res.json())
        .then(data => {
          setTake(data.items);
        }); }
    }
    
    return (
      //search part
    <div className="container" >
        <div className="search-form" >
        <h2>Find Github user</h2>
        <form onSubmit={handleSubmit} >
            <input type="text" placeholder="search user" onChange={handleSearch} />
            <button className="button" >search</button>
        </form>
        </div>
      {/*users who are suitable for search*/}
        {  take.slice(0, 15).map(a => {
         
          return <div key={a.login} >

        <div className="search-results" >
          <div className="user" >
              <div className="image" >
             <img src={a.avatar_url} alt="lorem ipsum" />
              </div>
            <div className="user-info">
               <h3>{a.login }</h3> 
               <small> {a.id}  </small>
               <Link to={`/user/${a.login }`}>View profile</Link>
             </div>  
          </div>

        </div> 

          </div> 

        })}
</div>
    )
};

export default Home;