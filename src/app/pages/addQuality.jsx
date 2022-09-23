import React from 'react';
import QualityForm from '../components/ui/qualityForm';
import { useQualities } from './../hooks/useQualities';
import { useHistory } from 'react-router-dom';

const AddQualityPage = () => {
  const { addQuality } = useQualities();
  const history = useHistory();

  const handleSubmit = (data) => {
    addQuality(data).then((data) => (data ? history.push('/') : ''));
  };

  return (
    <>
      <h1>Add Quality</h1>
      <QualityForm data={{}} onSubmit={handleSubmit} />
    </>
  );
};

export default AddQualityPage;
