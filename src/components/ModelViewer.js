import React from 'react';
import BMWScene from './BMWScene';
import BikeScene from './BikeScene';

const ModelViewer = ({ modelName }) => {
  return (
    <>
      {modelName === 'bmw' && <BMWScene />}
      {modelName === 'bike' && <BikeScene />}
    </>
  );
};

export default ModelViewer;
