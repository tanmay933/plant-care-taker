import { Link }from 'react-router-dom'

const  Navbar = () => {
  return (
    <nav className="navbar">
        <Link to="/">Home</Link>
     <Link to="/search">Search</Link>
       <Link to="/add">Add Plant</Link>
    </nav>
  )
}

export default  Navbar