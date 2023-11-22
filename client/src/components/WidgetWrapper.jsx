import { Box } from "@mui/material";
import styled from "@emotion/styled";

/* Styled components with CSS embedded (Reuse styles), and dynamic styles
with theme */
const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  background: theme.palette.background.alt,
  borderRadius: "0.75rem",
}));

export default WidgetWrapper;
