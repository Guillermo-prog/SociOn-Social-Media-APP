import { Box } from "@mui/material";
import { useState } from "react";

const UserImage = ({ image, size = "60px" }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box width={size} height={size}>
      <img
        style={{
          objectFit: "cover",
          borderRadius: "50%",
          cursor: "pointer",
          filter: hovered ? "brightness(1.2)" : null,
        }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:3001/assets/${image}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
    </Box>
  );
};

export default UserImage;
