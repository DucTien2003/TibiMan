import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";

function DefaultButton(props) {
  const {
    loading,
    children,
    color = "primary",
    variant = "contained",
    hoverColor = variant === "contained"
      ? "primary.contrastText"
      : "primary.main",
    ...otherProps
  } = props;

  const ButtonComponent = loading ? LoadingButton : Button;

  return (
    <ButtonComponent
      sx={{
        color,
        "&:hover": {
          color: hoverColor,
        },
      }}
      {...otherProps}
      loading={loading}
      loadingposition="start"
      variant={variant}>
      {children}
    </ButtonComponent>
  );
}

export default DefaultButton;
