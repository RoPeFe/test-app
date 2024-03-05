import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Table from './components/Table/Table'
import SideMenuModal from './components/SideMenuModal/SideMenuModal'
import Filters from './components/Filters/Filters'
import { faBars, faPlus, faGears, faComments, faSignIn } from '@fortawesome/free-solid-svg-icons'
import './App.css'
import { DataObject } from './interfaces/interfaces'
import { searchQuestions } from './services/browseQuestions'

function App() {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const columns = [
    { key: 'id', label: 'ID', sortOrder: 'asc' },
    { key: 'category', label: 'Category' },
    { key: 'type', label: 'Type' },
    { key: 'difficulty', label: 'Difficulty' },
    { key: 'question', label: 'Question / Statement' },
    { key: 'user', label: 'Created by' },
  ];

  const headerActions = [
    {
      icon: faBars,
      label: 'Browse',
    },
    {
      icon: faPlus,
      label: 'Add new questions',
    },
    {
      icon: faGears,
      label: 'Api',
    },
    {
      icon: faComments,
      label: 'Discuss',
    },
    {
      icon: faSignIn,
      label: 'login',
    }
  ];

  const applyFilters = (arrayData: DataObject[]) => {
    if (typeof arrayData === 'undefined' || arrayData.length === 0) {
      return []
    }

    return arrayData.filter(data => {
      for (const key in filters) {
        if (filters[key] !== undefined && data[key] !== filters[key]) {
          return false;
        }
      }
      return true;
    });
  };

  const [questions, setQuestions] = useState<DataObject[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await searchQuestions({ number: 50 });
        setQuestions(data);
      } catch (error) {
        console.error('Error al buscar preguntas:', error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header actions={headerActions} />
      {typeof questions !== 'undefined' && questions.length > 0 ? <SideMenuModal><Filters data={questions} setFilters={setFilters} /></SideMenuModal> : null}
      <Table title={'Browse Qwestions'} data={applyFilters(questions)} columns={columns} />
    </>
  )
}

export default App
