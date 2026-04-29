import styled from 'styled-components';

export const Container = styled.div`
  width: 90%;
  max-width: 500px;
  height: 90vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;

  h1 {
    margin-bottom: 20px;
  }

  Button {
    margin-top: 16px;
  }
`;

export const Logo = styled.img`
  width: 250px;
  margin-bottom: 20px;
`;

export const DetailText = styled.p`
  font-size: 16px;
  margin: 16px 0 28px;
  font-family: 'Roboto Regular';
`;

export const SubDetailText = styled.p`
  font-size: 14px;
  margin-top: 4px;
  margin-bottom: 4px;
  font-family: 'Roboto Regular';
  width: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 40px;
  margin: 16px 16px;
  font-family: 'Roboto Regular';
`;

export const EmProducao = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;

  svg {
    margin-left: 16px;
  }
`;

export const SaiuParaentrega = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  svg {
    margin-left: 16px;
  }
`;

export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 16px;
  margin-bottom: 8px;
  padding: 0 8px;
`;

interface TimelineStepProps {
  active: boolean;
  done: boolean;
  canceled?: boolean;
}

export const TimelineStep = styled.div<TimelineStepProps>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
  width: 100%;
`;

export const TimelineDotWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 14px;
`;

export const TimelineDot = styled.div<TimelineStepProps>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid
    ${({ active, done, canceled }) =>
      canceled ? '#dc3545' : done || active ? '#28a745' : '#ccc'};
  background: ${({ active, done, canceled }) =>
    canceled ? '#dc3545' : done ? '#28a745' : active ? '#fff' : '#f5f5f5'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s;
`;

export const TimelineLine = styled.div<{ done: boolean }>`
  width: 2px;
  height: 30px;
  background: ${({ done }) => (done ? '#28a745' : '#e0e0e0')};
  transition: background 0.3s;
`;

export const TimelineContent = styled.div`
  padding-bottom: 24px;
`;

export const TimelineLabel = styled.p<TimelineStepProps>`
  font-size: 14px;
  font-family: 'Roboto Regular';
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  color: ${({ active, done, canceled }) =>
    canceled ? '#dc3545' : done || active ? '#28a745' : '#aaa'};
  margin: 0 0 2px;
  transition: color 0.3s;
`;

export const TimelineSubLabel = styled.p`
  font-size: 12px;
  color: #888;
  margin: 0;
  font-family: 'Roboto Regular';
`;
