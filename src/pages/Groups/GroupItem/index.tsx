import React, { useMemo } from 'react';
import Button from '../../../components/Button';
import { GroupModel } from '../../../models/GroupModel';
import { Container, DetailText } from './styles';

interface GroupItemProps {
  data: GroupModel;
  handleGroupSelect: any;
}

const GroupItem: React.FC<GroupItemProps> = ({ handleGroupSelect, data }) => {
  const fractionsCount = useMemo(() => {
    return Number(data.fractions);
  }, [data.fractions]);

  return (
    <Container>
      <Button onClick={() => handleGroupSelect(data)}>
        <h4>{data.group}</h4>
        {fractionsCount > 1 && (
          <DetailText>{`Escolha até ${fractionsCount} sabores`}</DetailText>
        )}
      </Button>
    </Container>
  );
};

export default GroupItem;
