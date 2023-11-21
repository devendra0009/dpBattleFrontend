import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectAllContests } from '../contestSlice';
import JoinContestItem from './JoinContestItem';
import { CgBoy } from 'react-icons/cg';
import { selectUserInfo } from '../../user/userSlice';

const JoinContestComponent = () => {
  const allContests = useSelector(selectAllContests);
  const currentUser = useSelector(selectUserInfo);
  const anyMatchingContest = allContests.some(
    (contest) =>
      contest.status === 'matching' && contest.user1 !== currentUser._id
  );
  return (
    <JoinContestComponentContainer>
      <Heading>Join a Contest</Heading>
      {anyMatchingContest ? (                                                                                                                                   
        <JoinContestBody>
          {allContests &&
            allContests.map((contest, idx) => (                           
              <>
                {
                  <JoinContestElement
                    status={contest.status}
                    key={idx}
                    sameUser={contest.user1 === currentUser._id}
                  >
                    <JoinContestItem contest={contest} />
                  </JoinContestElement>
                }
              </>
            ))}
        </JoinContestBody>
      ) : (
        <h3>No Contest to Join!!</h3>
      )}
    </JoinContestComponentContainer>
  );
};

const JoinContestComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  h3 {
    color: gray;
    font-weight: 600;
  }
`;
const Heading = styled.div`
  /* text-align: center; */
  font-size: 1.5rem;
`;
const JoinContestBody = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* height: 200px; */
  gap: 2rem;
  overflow: scroll;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
`;
const JoinContestElement = styled.div`
  display: ${(props) =>
    props.status === 'matching' && !props.sameUser ? 'block' : 'none'};
`;

export default JoinContestComponent;
