import { useNavigate, useParams } from 'react-router-dom';
import DetailInputField from '../components/DetailInputField';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const StSection = styled.section`
   background-color: lightyellow;
   padding: 50px;
`;

function Detail({ entryList, setEntryList }) {
   const params = useParams();
   const [currentEntry, _] = useState(getCurrentValues);
   const navigate = useNavigate();

   function getCurrentValues() {
      const currentEntry = entryList.find(
         entry => entry.id === params.id
      );

      return { ...currentEntry };
   }

   function handleBackButtonClick() {
      navigate('/');
   }

   return (
      <StSection>
         <DetailInputField
            setEntryList={setEntryList}
            currentEntry={currentEntry}
         />
         <button onClick={handleBackButtonClick}> 뒤로가기 </button>
      </StSection>
   );
}
export default Detail;
