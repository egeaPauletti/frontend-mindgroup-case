import { Image } from "react-native";

interface ProfilePhotoProps {
  size: number;
  img: string;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ size, img }) => {
  return (
    <Image
      source={{ uri: img }}
      style={{ width: size, height: size }}
      className="rounded-full"
    />
  );
};
export default ProfilePhoto;
