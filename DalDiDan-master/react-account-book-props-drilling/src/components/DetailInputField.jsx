import { useEffect, useState } from 'react';
import InputField from './InputField';
import { useNavigate } from 'react-router-dom';

function DetailInputField({ setEntryList, currentEntry }) {
   const [inputValues, setInputValues] = useState(currentEntry);
   const navigate = useNavigate();

   function handleModifyButtonClick() {
      setEntryList(prev => {
         const entry = prev.find(
            entry => entry.id === currentEntry.id
         );

         const modifiedEntry = { ...inputValues };
         for (const key in modifiedEntry) {
            if (modifiedEntry[key] === '') {
               const defaultValue = `기본 ${key} ${currentEntry.id}`;
               modifiedEntry[key] = defaultValue;
               setInputValues(prev => ({
                  ...prev,
                  [key]: defaultValue,
               }));
            }
         }

         //Todo: 이전값에서 바뀐 내용이 없으면 수정하지 않는다.

         Object.assign(entry, modifiedEntry);

         alert('수정 완료');

         return [...prev];
      });
   }

   function handleDeleteButtonClick() {
      setEntryList(prev =>
         prev.filter(entry => entry.id !== currentEntry.id)
      );

      //Todo: 바로 삭제하지 않고 확인 모달을 추가한다.
      alert('삭제 완료');

      navigate('/');
   }

   return (
      <>
         <InputField
            style={{ display: 'flex', flexDirection: 'column' }}
            setInputValues={setInputValues}
            defaultValues={inputValues}
         />
         <button onClick={handleModifyButtonClick}> 수정하기 </button>
         <button onClick={handleDeleteButtonClick}> 삭제하기 </button>
      </>
   );
}
export default DetailInputField;
