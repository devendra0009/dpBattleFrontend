import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Heading } from "../../../styled-components/headings/Heading";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { BiSkipNextCircle } from "react-icons/bi";
import { BiSkipPreviousCircle } from "react-icons/bi";
import {
  selectAllContests,
  selectContestPagination,
  fetchAllContestAsync,
} from "../contestSlice";
import ContestComponent from "./ContestComponent";
import { ITEMS_PER_PAGE } from "../../../utils/constants";
import { toastWarn } from "../../../components/toasts/ToastWarn";
import { selectTheme } from "../../theme/themeSlice";
import { selectUserInfo } from "../../user/userSlice";
import { Input1 } from "../../../styled-components/inputs/Input";
import { AiOutlineSearch } from "react-icons/ai";

const statusOptions = [
  { label: "All", value: "" },
  { label: "Ongoing", value: "fighting" },
  { label: "Matching", value: "matching" },
  { label: "Finished", value: "closed" },
];

const typeOptions = [
  { label: "All Types", value: "" },
  // Add more type options based on your contest types
];

const darkTheme = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "black",
    color: "white",
    borderColor: state.isFocused ? "green" : "#444",
    boxShadow: state.isFocused ? "0 0 0 1px #5cacee" : "none",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "black",
    color: "white",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#333"
      : state.isFocused
      ? "#222"
      : "black",
    color: "white",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
};

const lightTheme = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#fff",
    color: "black",
    borderColor: state.isFocused ? "green" : "#ccc",
    boxShadow: state.isFocused ? "0 0 0 1px #5cacee" : "none",
  }),
};

const AllContest = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const allContests = useSelector(selectAllContests);
  const pagination = useSelector(selectContestPagination);
  const userInfo = useSelector(selectUserInfo);

  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState({
    label: "Ongoing",
    value: "fighting",
  });
  const [typeFilter, setTypeFilter] = useState({
    label: "All Types",
    value: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMyContests, setFilterMyContests] = useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState([]);
  const searchInputRef = useRef(null);
  const statusSelectRef = useRef(null);
  const typeSelectRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Generate suggestions from contests
  useEffect(() => {
    if (searchQuery && allContests && allContests.length > 0) {
      const query = searchQuery.toLowerCase();
      const uniqueSuggestions = new Set();

      allContests.forEach((contest) => {
        // Search in title
        if (contest.title && contest.title.toLowerCase().includes(query)) {
          uniqueSuggestions.add(contest.title);
        }
        // Search in description
        if (
          contest.description &&
          contest.description.toLowerCase().includes(query)
        ) {
          const words = contest.description.split(/\s+/);
          words.forEach((word) => {
            if (word.toLowerCase().includes(query) && word.length > 2) {
              uniqueSuggestions.add(word);
            }
          });
        }
      });

      const suggestionsArray = Array.from(uniqueSuggestions).slice(0, 5);
      setSuggestions(suggestionsArray);
      setShowSuggestions(suggestionsArray.length > 0 && searchQuery.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, allContests]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1); // Reset to first page when search changes
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Keyboard navigation handler for search input
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (
        selectedSuggestionIndex >= 0 &&
        suggestions[selectedSuggestionIndex]
      ) {
        setSearchQuery(suggestions[selectedSuggestionIndex]);
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      } else {
        setShowSuggestions(false);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (showSuggestions && suggestions.length > 0) {
        setSelectedSuggestionIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
      } else {
        // Focus on status select container
        if (statusSelectRef.current) {
          const selectContainer =
            statusSelectRef.current.controlRef ||
            statusSelectRef.current.querySelector(".select-filter") ||
            document.querySelector(".select-filter");
          if (selectContainer) {
            selectContainer.focus();
          }
        }
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (showSuggestions && suggestions.length > 0) {
        setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    searchInputRef.current?.focus();
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch contests when filters or page change
  useEffect(() => {
    const params = {
      page: currentPage,
      limit: ITEMS_PER_PAGE,
    };

    if (statusFilter.value) {
      params.status = statusFilter.value;
    }

    if (typeFilter.value) {
      params.type = typeFilter.value;
    }

    if (debouncedSearchQuery) {
      params.q = debouncedSearchQuery;
    }

    if (filterMyContests && userInfo?._id) {
      params.user = userInfo._id;
    }

    dispatch(fetchAllContestAsync(params));
  }, [
    currentPage,
    statusFilter,
    typeFilter,
    debouncedSearchQuery,
    filterMyContests,
    userInfo,
    dispatch,
  ]);

  const handleStatusChange = (selected) => {
    setStatusFilter(selected);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleTypeChange = (selected) => {
    setTypeFilter(selected);
    setCurrentPage(1);
  };

  const handleMyContestsChange = (e) => {
    setFilterMyContests(e.target.checked);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const canGoNext = pagination && currentPage < pagination.totalPages;
  const canGoPrev = currentPage > 1;

  const goToNext = () => {
    if (canGoNext) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      toastWarn("Kha jana h bhai?", "❓", currentTheme);
    }
  };

  const goToPrev = () => {
    if (canGoPrev) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else {
      toastWarn("Kha jana h bhai?", "❓", currentTheme);
    }
  };

  const theme = currentTheme === "dark" ? darkTheme : lightTheme;
  const totalPages = pagination?.totalPages || 0;
  const statusLabel = statusFilter.value ? statusFilter.label : "All";

  return (
    <AllContestContainer>
      <FiltersContainer>
        <SearchContainer currentTheme={currentTheme} ref={suggestionsRef}>
          <AiOutlineSearch size={20} />
          <SearchInput
            ref={searchInputRef}
            type="text"
            placeholder="Search contests..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
              setSelectedSuggestionIndex(-1);
            }}
            onKeyDown={handleSearchKeyDown}
            onFocus={() => {
              if (suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            currentTheme={currentTheme}
          />
          {showSuggestions && suggestions.length > 0 && (
            <SuggestionsList currentTheme={currentTheme}>
              {suggestions.map((suggestion, index) => (
                <SuggestionItem
                  key={index}
                  currentTheme={currentTheme}
                  isSelected={index === selectedSuggestionIndex}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={() => setSelectedSuggestionIndex(index)}
                >
                  {suggestion}
                </SuggestionItem>
              ))}
            </SuggestionsList>
          )}
        </SearchContainer>

        <FilterRow>
          <Select
            ref={statusSelectRef}
            value={statusFilter}
            isSearchable={false}
            onChange={handleStatusChange}
            options={statusOptions}
            styles={theme}
            className="select-filter"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" && !e.shiftKey && !e.altKey) {
                e.preventDefault();
                searchInputRef.current?.focus();
              } else if (
                e.key === "ArrowDown" &&
                typeOptions.length > 1 &&
                !e.shiftKey &&
                !e.altKey
              ) {
                e.preventDefault();
                const nextSelect =
                  document.querySelectorAll(".select-filter")[1];
                if (nextSelect) {
                  nextSelect.focus();
                }
              }
            }}
          />

          {typeOptions.length > 1 && (
            <Select
              ref={typeSelectRef}
              value={typeFilter}
              isSearchable={false}
              onChange={handleTypeChange}
              options={typeOptions}
              styles={theme}
              className="select-filter"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp" && !e.shiftKey && !e.altKey) {
                  e.preventDefault();
                  const prevSelect =
                    document.querySelectorAll(".select-filter")[0];
                  if (prevSelect) {
                    prevSelect.focus();
                  }
                }
              }}
            />
          )}

          {userInfo && (
            <CheckboxContainer currentTheme={currentTheme}>
              <input
                type="checkbox"
                id="myContests"
                checked={filterMyContests}
                onChange={handleMyContestsChange}
              />
              <label htmlFor="myContests">My Contests</label>
            </CheckboxContainer>
          )}
        </FilterRow>
      </FiltersContainer>

      <Options>
        <Pagination>
          <PageNumber onClick={goToPrev} disabled={!canGoPrev}>
            <BiSkipPreviousCircle size={30} />
          </PageNumber>
          {Array.from({ length: totalPages }, (_, i) => (
            <PageNumber
              key={i}
              onClick={() => paginate(i + 1)}
              active={i + 1 === currentPage}
            >
              {i + 1}
            </PageNumber>
          ))}
          <PageNumber onClick={goToNext} disabled={!canGoNext}>
            <BiSkipNextCircle size={30} />
          </PageNumber>
        </Pagination>
      </Options>

      {pagination && (
        <PaginationInfo currentTheme={currentTheme}>
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, pagination.totalCount)} of{" "}
          {pagination.totalCount} contests
        </PaginationInfo>
      )}

      <Heading>{statusLabel} Contests</Heading>
      <Contests>
        {allContests &&
          allContests.map((contest, idx) => (
            <CheckedContainer status={contest.status} key={contest._id || idx}>
              <ContestComponent
                contest={contest}
                i={idx}
                setCurrentPage={setCurrentPage}
              />
            </CheckedContainer>
          ))}
        {allContests && allContests.length === 0 && (
          <NoContests currentTheme={currentTheme}>
            No contests found matching your filters.
          </NoContests>
        )}
      </Contests>
    </AllContestContainer>
  );
};

const FiltersContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  color: ${(props) => props.theme[props.currentTheme].text};
  position: relative;
`;

const SearchInput = styled(Input1)`
  margin-left: 0;
  flex: 1;
`;

const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  list-style: none;
  padding: 0.5rem 0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  border: 1px solid ${(props) => props.theme[props.currentTheme].border};
  animation: slideDown 0.2s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme[props.currentTheme].bg};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme[props.currentTheme].border};
    border-radius: 3px;
  }
`;

const SuggestionItem = styled.li`
  padding: 0.75rem 1rem;
  cursor: pointer;
  color: ${(props) => props.theme[props.currentTheme].text};
  background-color: ${(props) =>
    props.isSelected
      ? props.theme[props.currentTheme].bg
      : props.theme[props.currentTheme].bg2};
  transition: all 0.2s ease;
  border-left: 3px solid
    ${(props) =>
      props.isSelected
        ? props.theme[props.currentTheme].bgGreen
        : "transparent"};

  &:hover {
    background-color: ${(props) => props.theme[props.currentTheme].bg};
    border-left-color: ${(props) => props.theme[props.currentTheme].bgGreen};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const FilterRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;

  .select-filter {
    flex: 1;
    min-width: 150px;
  }

  @media (max-width: 750px) {
    flex-direction: column;
    .select-filter {
      width: 100%;
    }
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: ${(props) => props.theme[props.currentTheme].bg2};
  border-radius: 10px;
  color: ${(props) => props.theme[props.currentTheme].text};

  input[type="checkbox"] {
    cursor: pointer;
  }

  label {
    cursor: pointer;
    user-select: none;
  }
`;

const Options = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const PageNumber = styled.span`
  width: 50;
  overflow: scroll;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin: 0 0.5rem;
  font-size: ${(props) => (props.active ? "18px" : "14px")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  padding: 0 7px;
  border-radius: 100%;
  text-decoration: none;
  &:hover {
    ${(props) =>
      !props.disabled &&
      `
      font-weight: bold;
      scale: 110%;
    `}
  }
`;

const PaginationInfo = styled.div`
  text-align: center;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme[props.currentTheme].text};
  font-size: 0.9rem;
`;

const CheckedContainer = styled.div`
  /* display: ${(props) => (props.status === "fighting" ? "block" : "none")}; */
`;

const AllContestContainer = styled.div`
  padding: 0 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-left: 0.5px solid lightgray;

  @media (max-width: 750px) {
    width: 90vw;
    margin: 0 auto;
    border: none;
  }
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
`;

const Contests = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NoContests = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${(props) => props.theme[props.currentTheme].text};
  font-size: 1.1rem;
`;

export default AllContest;
