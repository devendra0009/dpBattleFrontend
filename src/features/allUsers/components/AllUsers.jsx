import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Heading } from "../../../styled-components/headings/Heading";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllUsers,
  selectUsersPagination,
  selectUsersHasMore,
  selectAllUsersLoading,
  fetchAllUsersAsync,
} from "../allUsersSlice";
import AllUsersComponent from "./AllUsersComponent";
import { ITEMS_PER_PAGE } from "../../../utils/constants";
import { selectTheme } from "../../theme/themeSlice";
import { Input1 } from "../../../styled-components/inputs/Input";
import { AiOutlineSearch } from "react-icons/ai";
import { Button1 } from "../../../styled-components/buttons/Button";

const AllUsers = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const users = useSelector(selectAllUsers);
  const pagination = useSelector(selectUsersPagination);
  const hasMore = useSelector(selectUsersHasMore);
  const loading = useSelector(selectAllUsersLoading);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1); // Reset to first page when search changes
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch users when filters or page change
  useEffect(() => {
    const params = {
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      append: currentPage > 1, // Append for pagination, replace for new search
    };

    if (debouncedSearchQuery) {
      params.q = debouncedSearchQuery;
    }

    dispatch(fetchAllUsersAsync(params));
  }, [currentPage, debouncedSearchQuery, dispatch]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setCurrentPage(1);
    }
  };

  return (
    <AllUsersContainer>
      <SearchContainer currentTheme={currentTheme}>
        <AiOutlineSearch size={20} />
        <SearchInput
          ref={searchInputRef}
          type="text"
          placeholder="Search users by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          currentTheme={currentTheme}
        />
      </SearchContainer>

      <Heading>All Users</Heading>
      {pagination && (
        <PaginationInfo currentTheme={currentTheme}>
          Showing {users?.length || 0} of {pagination.totalCount} users
        </PaginationInfo>
      )}

      <Users>
        {users &&
          users.map((user, idx) => (
            <AllUsersComponent user={user} key={user._id || idx} />
          ))}
        {users && users.length === 0 && !loading && (
          <NoUsers currentTheme={currentTheme}>
            No users found matching your search.
          </NoUsers>
        )}
      </Users>

      {hasMore && (
        <LoadMoreContainer>
          <Button1
            currentTheme={currentTheme}
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </Button1>
        </LoadMoreContainer>
      )}

      {!hasMore && users && users.length > 0 && (
        <EndMessage currentTheme={currentTheme}>All users loaded</EndMessage>
      )}
    </AllUsersContainer>
  );
};

const AllUsersContainer = styled.div`
  padding: 0 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  overflow: scroll;
  scrollbar-color: transparent transparent;
  @media (max-width: 750px) {
    display: none;
  }
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
  margin-bottom: 1rem;
`;

const SearchInput = styled(Input1)`
  margin-left: 0;
  flex: 1;
`;

const PaginationInfo = styled.div`
  text-align: center;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme[props.currentTheme].text};
  font-size: 0.9rem;
  opacity: 0.8;
`;

const Users = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const NoUsers = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${(props) => props.theme[props.currentTheme].text};
  font-size: 1.1rem;
  opacity: 0.7;
`;

const EndMessage = styled.div`
  text-align: center;
  padding: 1rem;
  color: ${(props) => props.theme[props.currentTheme].text};
  font-size: 0.9rem;
  opacity: 0.6;
  font-style: italic;
`;

export default AllUsers;
