import React, { useContext, useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import qualityService from '../services/qualityService';

const QualitiesContex = React.createContext();

export const useQualities = () => useContext(QualitiesContex);

export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const prevState = useRef();

  useEffect(async () => {
    try {
      const { content } = await qualityService.fetchAll();
      setQualities(content);
      setLoading(true);
    } catch (error) {
      errorCatcher(error);
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const getQuality = (id) => qualities.find((quality) => quality._id === id);

  const updateQuality = async ({ _id: id, ...data }) => {
    try {
      const { content } = await qualityService.update(id, data);
      setQualities((prevState) =>
        prevState.map((item) => {
          if (item._id === id) return content;
          return item;
        }),
      );
      return content;
    } catch (error) {
      errorCatcher(error);
    }
  };

  const addQuality = async (data) => {
    try {
      const { content } = await qualityService.create(data);
      setQualities((prevState) => [...prevState, content]);
      return content;
    } catch (error) {
      errorCatcher(error);
    }
  };

  const deleteQuality = async (id) => {
    try {
      const { content } = await qualityService.delete(id);
      setQualities((prevState) => prevState.filter((quality) => quality._id !== content._id));
      return content;
    } catch (error) {
      errorCatcher(error);
    }
  };

  const errorCatcher = (error) => {
    const { message } = error.response.data;
    setError(message);
  };

  //Оптимистический подход
  // const deleteQuality = async (id) => {
  //   prevState.current = qualities;
  //   setQualities((prevState) => prevState.filter((quality) => quality._id !== id));

  //   try {
  //     await qualityService.delete(id);
  //   } catch (error) {
  //     const { message } = error.response.data;
  //     setError(message);
  //     toast.error(message);
  //     setQualities(prevState);
  //   }
  // };

  return (
    <QualitiesContex.Provider
      value={{ qualities, getQuality, updateQuality, addQuality, deleteQuality }}>
      {loading ? children : <h1>Loading ...</h1>}
    </QualitiesContex.Provider>
  );
};
