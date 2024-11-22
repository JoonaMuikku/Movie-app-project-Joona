import React from 'react'

export default function SearchBar() {
    return (
        <>
            <div>
                <form className="search-bar mx-auto d-flex align-items-center">
                    <input
                        className="form-control search-input rounded-0"
                        type="text"
                        placeholder="Enter keywords"
                        aria-label="Search"
                    />
                    <button className="btn btn-orange text-white search-btn rounded-0" type="submit">
                        <i className="bi bi-search"></i>
                    </button>
                </form>
            </div>
        </>
    )
}
