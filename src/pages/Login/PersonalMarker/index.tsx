import React from 'react';
import { ChildComponentProps } from 'google-map-react';
// import mapMarker from '../../../assets/map-marker.png';
import { FiSend } from 'react-icons/fi';

interface ChildMapProps extends ChildComponentProps {
  text: string;
}

const PersonalMarker: React.FC<ChildMapProps> = ({ text, ...rest }) => {
  return (
    <>
      {/* <img src={mapMarker} alt="marker" /> */}
      <FiSend size={24} color="#dc1637" />
      <p>{text}</p>
    </>
  );
};

export default PersonalMarker;
