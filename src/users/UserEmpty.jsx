import { Box, Button, Typography } from '@mui/material';
import { CreateButton } from 'react-admin';

const UserEmpty = () => (
  <Box textAlign="center" m={1}>
      <Typography variant="h4" paragraph>
          No products available
      </Typography>
      <Typography variant="body1">
          Create one or import from a file
      </Typography>
      <CreateButton />
  </Box>
);

export default UserEmpty;