import styled from 'styled-components';

export const Container = styled.div`
  margin-right: 8px;
  margin-bottom: 12px;
`;

export const CardProduct = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const Photo = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
`;

export const NoPhoto = styled.div`
  width: 100%;
  height: 80px;
  background: linear-gradient(135deg, #dc1637 0%, #9b0e25 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NoPhotoInitial = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.75);
  font-family: 'Roboto Regular';
  text-transform: uppercase;
  letter-spacing: 2px;
  user-select: none;
  text-align: center;
  padding: 0 12px;
`;

export const TextArea = styled.div`
  padding: 10px 12px 12px;
`;

export const ProductDescription = styled.h2`
  font-size: 16px;
  font-weight: bold;
  font-family: 'Roboto Regular';
  color: #222;
  margin-bottom: 4px;
`;

export const Portion = styled.p`
  font-size: 12px;
  color: #888;
  font-family: 'Roboto Regular';
  margin-bottom: 10px;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
`;

export const PriceArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const PriceText = styled.p`
  color: #28a745;
  font-size: 18px;
  font-weight: bold;
  font-family: 'Roboto Regular';
`;

export const SelectButton = styled.button`
  flex-shrink: 0;
  width: 130px;
  height: 42px;
  background: linear-gradient(135deg, #dc1637 0%, #e8502a 100%);
  color: #fff;
  border: none;
  border-radius: 21px;
  font-size: 13px;
  font-weight: 600;
  font-family: 'Roboto Regular';
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-shadow: 0 3px 8px rgba(220, 22, 55, 0.35);
  transition: opacity 0.2s, box-shadow 0.2s;

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  &:hover {
    opacity: 0.88;
    box-shadow: 0 4px 12px rgba(220, 22, 55, 0.45);
  }
`;

export const DetailText = styled.p`
  font-size: 10px;
`;
