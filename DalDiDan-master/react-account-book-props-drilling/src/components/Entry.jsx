import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StDiv = styled.div`
   border: 1px black solid;
   border-radius: 10px;
   height: 200px;
   overflow: auto;

   &:hover {
      background-color: lightskyblue;
   }
`;

function Entry(props) {
   const { date, title, expense, description, id } = props.entryData;
   const navigate = useNavigate();

   function handleEntryClick() {
      const url = `/Detail/${id}`;
      navigate(url);
   }

   return (
      <StDiv onClick={handleEntryClick}>
         <p> 날짜: {date} </p>
         <p> 제목: {title} </p>
         <p> 지출: {expense} 원 </p>
         <p> 내용: {description} </p>
      </StDiv>
   );
}
export default Entry;
