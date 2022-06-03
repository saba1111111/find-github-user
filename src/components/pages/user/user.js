import React, {useState, useEffect} from "react";
import "./user.css";
import site from "../../../assets/site.png";
import github from "../../../assets/github.png";
import location from "../../../assets/location.png";
import user from "../../../assets/user.png";
import { Link, useParams } from "react-router-dom";

const User = () => {
  const { login } = useParams();
  //userInfo have information about search users
  const [userInfo, setUserInfo] = useState({});
  //repos have information about users repositories
  const [repos, setRepos] = useState([]);
//useEffect gives userInfo and repos information about users
  useEffect(() => {
    if(login) {
      fetch(`https://api.github.com/users/${login}`)
        .then(res => res.json())
        .then(data => {
          setUserInfo(data);
        });
        fetch(`https://api.github.com/users/${login}/repos`)
        .then(res => res.json())
        .then(data => {
          setRepos(data);
        });  
      }  
  }, []);
    return (
        //button which allows go back 
       <div className="container">
       <Link to="/" className="back" >
           back
       </Link>
       {/*full user information */}
       <div className="user-information" >
        <div className="image">
        <img src={userInfo.avatar_url} className="imgfirst" />
        </div>
        <div className="user-content">
          <h3>{userInfo.login}</h3>
          <p>{repos.description}
          </p>
          <div className="more-data">
            <p><img src={user} />{userInfo.followers} folllowers, {userInfo.following} following</p>
            <p><img src={location} /> {userInfo.location}</p>
            <p><img src={site} />public repos - {userInfo.public_repos}</p>
            <p><img src={github} /><a id="sbs" href={userInfo.html_url} target="_blank" >View Github profile</a></p>
          </div>
        </div>
      </div>
      {/* information about repos */}
       {repos.slice(0,10).map(s => {
           return <div key={s.name} >
                
                <div className="user-repos">
           <div className="repo"  >
             <h3>repositor - {s.name}</h3> <br />
           {s.description && <p>description -  {s.description} </p>} <br />
             <h3><a href={s.html_url} target="_blank">View repositor</a></h3><br />
             {s.language && <small>written in {s.language}</small> } 
           </div>
         </div>
              </div>
          })}

    </div>
    )}

export default User;