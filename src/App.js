import './App.css';
import useChats from './hooks/useChats'
import GraphMessageThroughTime from './Components/GraphMessageThroughTime'
import GraphInsultsPerPerson from './Components/GraphInsultsPerPerson'
import GraphsMostUsedWords from './Components/GraphsMostUsedWords'
import GraphMostUsedSearchWord from './Components/GraphMostUsedSearchWord'
import { Route, Routes } from 'react-router-dom'
import SearchInConversation from './Components/SearchInConversation';


function App() {
  const chats = useChats()


  return (
    <div className="App">
      {chats ?
        <Routes>
          <Route path='/' element={<GraphMessageThroughTime chats={chats} />} />
          <Route path='/insults' element={<GraphInsultsPerPerson chats={chats} />} />
          <Route path='/words' element={<GraphsMostUsedWords chats={chats} />} />
          <Route path='/word' element={<GraphMostUsedSearchWord chats={chats} />} />
          <Route path='/search' element={<SearchInConversation chats={chats} />} />
          <Route path='*' element={<div>404</div>} />
        </Routes>
        : null
      }
    </div>
  );
}

export default App;
