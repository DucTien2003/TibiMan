import IconButton from '@mui/material/IconButton';

function AppIconButton(props) {
  const {
    children,
    hoverColor = 'primary.main',
    color = 'gray.500',
    ...otherProps
  } = props;

  return (
    <IconButton
      {...otherProps}
      sx={{
        color,
        '&:hover': {
          color: hoverColor,
        },
      }}>
      {children}
    </IconButton>
  );
}

export default AppIconButton;
