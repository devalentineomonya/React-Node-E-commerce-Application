import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';

const NavbarSearch = ({ searching, setSearching, mobileScreen, handleSearchValueChange,searchValue,handleSearchRedirect}) => {


  return (
    <div className={`nav-search ${searching ? 'searching' : ''} ${mobileScreen ? 'hidden' : ''}`}>
      <div
        className={`search-placeholder ${mobileScreen ? 'hidden' : ''}`}
        onClick={() => setSearching(true)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') setSearching(true);
        }}
      >
        {searching ? (
          <input
            autoFocus
            onChange={handleSearchValueChange}
            value={searchValue}
            className={`${searching ? 'inline-block' : 'hidden'}`}
            type="text"
            placeholder="Search Product"
            onBlur={() => setSearching(false)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setSearching(false);
                handleSearchRedirect();
              }
            }}
          />
        ) : (
          searchValue ?? 'Search Product'
        )}
      </div>
      <div className="icon" onClick={handleSearchRedirect}  onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchRedirect();
              }
            }}>
        <AiOutlineSearch size={18} />
      </div>
    </div>
  );
};

NavbarSearch.propTypes = {
  searching: PropTypes.bool.isRequired,
  setSearching: PropTypes.func.isRequired,
  mobileScreen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  handleSearchRedirect:PropTypes.func.isRequired,
  searchValue:PropTypes.string,
  handleSearchValueChange:PropTypes.func.isRequired

};

export default NavbarSearch;
