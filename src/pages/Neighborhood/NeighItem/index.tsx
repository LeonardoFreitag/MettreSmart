import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { NeighModel } from '../../../models/NeighModel';
import { Container, LabelArea, ButtonSelect } from './styles';

interface NeighItemProps {
  data: NeighModel;
  handleNeighSelect: any;
}

const NeighItem: React.FC<NeighItemProps> = ({ handleNeighSelect, data }) => {
  return (
    <Container>
      <LabelArea>
        <h4>{data.name}</h4>
      </LabelArea>
      <ButtonSelect onClick={() => handleNeighSelect(data)}>
        <FaChevronRight size={20} color="#fff" />
      </ButtonSelect>
    </Container>
  );
};

export default NeighItem;
