import React, { useState } from 'react';
import styled from 'styled-components';
import { Heading } from '../../../styled-components/headings/Heading';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { BiSkipNextCircle } from 'react-icons/bi';
import { BiSkipPreviousCircle } from 'react-icons/bi';
import { selectAllContests } from '../contestSlice';
import ContestComponent from './ContestComponent';
import { ITEMS_PER_PAGE } from '../../../utils/constants';
import { toastWarn } from '../../../components/toasts/ToastWarn';
import { selectTheme } from '../../theme/themeSlice';

const options = [
  { label: 'Ongoing', value: 'fighting' },
  { label: 'Matching', value: 'matching' },
  { label: 'Finished', value: 'closed' },
];
const darkTheme = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'black', // Dark background color
    color: 'white', // Text color
    borderColor: state.isFocused ? 'green' : '#444', // Border color on focus
    boxShadow: state.isFocused ? '0 0 0 1px #5cacee' : 'none', // Example shadow on focus
    // fontSize:'20px'
  }),
  // Define other styles for the dark theme
};

const lightTheme = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#fff', // Light background color
    color: 'black', // Text color
    borderColor: state.isFocused ? 'green' : '#ccc', // Border color on focus
    boxShadow: state.isFocused ? '0 0 0 1px #5cacee' : 'none', // Example shadow on focus
  }),
  // Define other styles for the light theme
};

const AllContest = () => {
  const [selectedOption, setSelectedOption] = useState({
    label: 'Ongoing',
    value: 'fighting',
  });
  const currentTheme = useSelector(selectTheme);
  const allContests = useSelector(selectAllContests);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  // const currentContests =
  //   allContests && allContests.slice(indexOfFirstItem, indexOfLastItem);

  // const totalPages =
  //   allContests && Math.ceil(allContests.length / ITEMS_PER_PAGE);

  // const filteredContests = {
  //   fighting: currentContests.filter(
  //     (contest) => contest.status === 'fighting'
  //   ),
  //   matching: currentContests.filter(
  //     (contest) => contest.status === 'matching'
  //   ),
  //   finished: currentContests.filter(
  //     (contest) => contest.status === 'closed'
  //   ),
  // };
  // const filteredContest = filteredContests[selectedOption.value];
  // console.log(filteredContest&& filteredContest);

  const filteredContests = allContests&&allContests.filter(
    (contest) => contest.status === selectedOption.value
  );
  const totalPages = filteredContests&&Math.ceil(filteredContests.length / ITEMS_PER_PAGE);
  const slicedContests = filteredContests&& filteredContests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;

  const goToNext = () => {
    if (canGoNext) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      toastWarn('Kha jana h bhai?');
    }
  };

  const goToPrev = () => {
    if (canGoPrev) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else {
      toastWarn('Kha jana h bhai?');
    }
  };
  const theme = currentTheme === 'dark' ? darkTheme : lightTheme;
  return (
    <AllContestContainer>
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
        <Select
          defaultValue={selectedOption}
          isSearchable={false}
          onChange={setSelectedOption}
          options={options}
          styles={theme}
          className="select"
        />
      </Options>
      <Heading>{selectedOption.label} Contests</Heading>
      <Contests>
        {slicedContests &&
          slicedContests.map((contest, idx) => (
            <>
              {
                <CheckedContainer status={contest.status} key={idx}>
                  <ContestComponent contest={contest} i={idx} />
                </CheckedContainer>
              }
            </>
          ))}
      </Contests>
    </AllContestContainer>
  );
};

const Options = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  .select {
    width: 50%;
    margin-top: 10px;
  }
`;

// const Select=styled.select`
//   border: 1px solid #82ee82;
//   cursor: pointer;
//   background-color: #d4f7d4 ;
//   border-radius: 10px;
//   padding: 1rem;
//   &:hover{

//     background-color: #aaf0aa ;
//   }

// `
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  align-items: center;
`;

const PageNumber = styled.span`
  width: 50;
  overflow: scroll;
  cursor: pointer;
  margin: 0 0.5rem;
  font-size: ${(props) => (props.active ? '18px' : '14px')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  /* background-color: ${(props) => (props.active ? 'lightgreen' : 'none')};; */
  padding: 0 7px;
  border-radius: 100%;
  text-decoration: none;
  &:hover {
    font-weight: bold;
    scale: 110%;
  }
`;
const CheckedContainer = styled.div`
  /* display: ${(props) => (props.status === 'fighting' ? 'block' : 'none')}; */
`;

const AllContestContainer = styled.div`
  /* background-color: red; */
  padding: 0 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-left: 0.5px solid lightgray;
  /* height: 100%; */

  @media (max-width: 750px) {
    width: 90vw;
    /* padding: 0; */
    margin: 0 auto;
    border: none;
  }
  /* height: 30%; */
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
`;

const Contests = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* max-height: 20%; */
  /* height: 100%; */
  /* overflow-y: scroll;
  scrollbar-width: thin; 
  scrollbar-color: transparent transparent;  */
`;

export default AllContest;
