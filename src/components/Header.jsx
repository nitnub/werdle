const Header = () => {
  return (
    <div className="header">
      <div className="header-container">
        <div className="header-section hamburger">
          <div className="hamburger-nav"></div>
        </div>
        <div className="header-section">
          <div className="title">Werdle!</div>
        </div>
        <div className="header-section">
          
          <div className="nav">
            <div className="nav-link">Settings</div>
            <div className="nav-link">Info</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
