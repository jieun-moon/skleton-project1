import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import { useState } from 'react';
import loadFakeData from './assets/fakeData';

function App() {
    const [entryList, setEntryList] = useState(loadFakeData);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home entryList={entryList} setEntryList={setEntryList} />} />
                    <Route path="/Detail/:id" element={<Detail entryList={entryList} setEntryList={setEntryList} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
