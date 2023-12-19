
const Nav = () => {
  return (
    <>
      <nav className="nav">
        <ul className="nav_list">
          <li className="nav_link">
            <a href="/">Home</a>
          </li>
          <li className="nav_link">
            <a href="/products">Products</a>
          </li>
        </ul>
        <div className="login_link">
             <a className="nav_link" href="/login">Log in</a>
        </div>
      </nav>
    </>
  );
};

export default Nav;
