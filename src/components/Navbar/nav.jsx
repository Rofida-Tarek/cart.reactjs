<nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top ">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">
      <img src={logo} alt="logo" />
    </NavLink>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {usertoken !== null ? (
          <>
            <li className="nav-item">
              <NavLink className="nav-link " aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Cart">
                Cart
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/wishlist">
                WishList
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/category">
                Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/brand">
                Brands
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link position-relative" to="/allorders">
                AllOrder
                {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                {localStorage.getItem("ordernumber")}
              </span> */}
              </NavLink>
            </li>
          </>
        ) : (
          ""
        )}
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {usertoken !== null ? (
          <>
            <div className="d-flex log">
              {" "}
              <div className="d-flex">
                {" "}
                <Link
                  to={"/wishlist"}
                  className="d-flex align-items-center mx-2 position-relative"
                >
                  {" "}
                  WishList <i className="fa-solid fa-bookmark mx-1 fa-lg "></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                    {count}
                  </span>
                </Link>
                <Link
                  to={"/Cart"}
                  className="d-flex align-items-center mx-3 position-relative"
                >
                  {" "}
                  Cart <i className="fa-solid fa-cart-shopping mx-1 fa-lg "></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                    {numOfCartItems}
                  </span>
                </Link>
              </div>
              <div className="d-flex align-items-center  ">
                <Link to={"/profile"}>
                  {" "}
                  <span>{username}</span>
                  <span className="rounded-circle bg-main ms-1 px-2 p-1 text-white fw-bold">
                    {username?.slice(0, 1)}
                  </span>
                </Link>

                <span onClick={() => logout()} className="ms-3 cursor-pointer">
                  Logout <i className="fa-solid fa-right-from-bracket c "> </i>
                </span>
              </div>
            </div>

            {/* <i className="fa-solid fa-user"></i> */}
          </>
        ) : (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Log in
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  </div>
</nav>;
