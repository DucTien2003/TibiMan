import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

function AppIconButton(props) {
  const {
    children,
    hoverColor = "primary.main",
    tooltip = "",
    ...otherProps
  } = props;

  return (
    <Tooltip title={tooltip}>
      <IconButton
        {...otherProps}
        sx={{
          "&:hover": {
            color: hoverColor,
          },
        }}>
        {children}
      </IconButton>
    </Tooltip>
  );
}

export default AppIconButton;
