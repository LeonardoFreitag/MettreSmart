import React, { useMemo } from 'react';
import { FlavorModel } from '../../../../models/FlavorModel';
import { Flavor } from './styles';

interface DataFlavorProps {
  data: FlavorModel;
}

const DataFlavor: React.FC<DataFlavorProps> = ({ data }) => {
  const flavor = useMemo(() => {
    if (data.amount >= 0.3 && data.amount <= 0.35) {
      return '1/3';
    }
    if (data.amount === 0.25) {
      return '1/4';
    }
    if (data.amount === 0.5) {
      return '1/2';
    }
    return '1';
  }, [data.amount]);

  return (
    <div>
      <Flavor>{`${flavor} ${data.description} ${data.edge}`}</Flavor>
    </div>
  );
};

export default DataFlavor;
