import HomeInputField from './../components/HomeInputField';
import MonthSelector from './../components/MonthSelector';
import EntryList from './../components/EntryList';
import { useState } from 'react';

function Home({ entryList, setEntryList }) {
   const [selectedMonth, setSelectedMonth] = useState(1);

   return (
      <>
         <HomeInputField
            setEntryList={setEntryList}
            setSelectedMonth={setSelectedMonth}
         />
         <MonthSelector
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
         />
         <EntryList
            entryList={entryList}
            selectedMonth={selectedMonth}
         />
      </>
   );
}

export default Home;
