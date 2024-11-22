import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Buttons({route, text}) {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained"><Link to={route}>{text}</Link></Button>
    </Stack>
  );
}