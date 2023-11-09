import { Box } from "@mui/material";
import { styled } from "@mui/system";

//Styled components with CSS embedded (Reuse styles)
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
