import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        className="d-flex"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2 block w-full  rounded-md border-0 py-1.5 pl-7 pr-20 me-2 rounded-lg text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="search"
          placeholder="Search Part"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn subscribe-btn bg-drk-blue text-white rounded-lg" type="submit">
        <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" /> 
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
