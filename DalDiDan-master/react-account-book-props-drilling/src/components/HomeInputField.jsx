import { useState } from 'react';
import InputField from './InputField';
import { v4 as uuidv4 } from 'uuid';
import { styled } from 'styled-components';

const StSection = styled.section`
   display: flex;
   margin: 50px 0px;
`;

const initializeInputValues = () => {
   const todayYYYYMMDD = new Date().toISOString().slice(0, 10);
   return {
      date: todayYYYYMMDD,
      title: '',
      expense: 0,
      description: '',
   };
};

function HomeInputField({ setEntryList, setSelectedMonth }) {
   const [inputValues, setInputValues] = useState(
      initializeInputValues
   );

   const [signalResetFields, setSignalResetFields] = useState(false);

   function handleCreateButtonClick() {
      const newEntry = { ...inputValues, id: uuidv4() };

      for (const key in newEntry) {
         if (newEntry[key] === '') {
            const defaultValue = `기본 ${key} ${newEntry.id}`;
            setInputValues(prev => ({
               ...prev,
               [key]: defaultValue,
            }));
         }
      }

      //[YYYY-MM-DD]
      setSelectedMonth(Number(newEntry.date.slice(5, 7)));
      setEntryList(prev => [...prev, newEntry]);
      setSignalResetFields(true);
      alert('생성 완료');
   }

   return (
      <StSection>
         <InputField
            setInputValues={setInputValues}
            defaultValues={inputValues}
            signalResetFields={signalResetFields}
            setSignalResetFields={setSignalResetFields}
         />
         <button onClick={handleCreateButtonClick}> 생성 </button>
      </StSection>
   );
}
export default HomeInputField;
