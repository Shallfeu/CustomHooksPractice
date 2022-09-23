import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import QualityForm from '../components/ui/qualityForm';
import { useQualities } from './../hooks/useQualities';

const EditQualityPage = () => {
  const id = useParams().id;
  const history = useHistory();

  const { getQuality, updateQuality } = useQualities();

  const quality = getQuality(id);

  const handleSubmit = (data) => {
    updateQuality(data).then((data) => (data ? history.push('/') : ''));
  };

  return (
    <>
      <h1>Edit Quality Page</h1>
      {quality ? <QualityForm data={quality} onSubmit={handleSubmit} /> : <>Loading...</>}
    </>
  );
};

export default EditQualityPage;
