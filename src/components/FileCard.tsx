import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DeleteForever, EditTwoTone } from '@mui/icons-material';
import { File } from '../types/userFile.types';

export function FileCard({ file }: { file: File | undefined }) {
  return (
    <Grid sx={{ borderRadius: 4, width: 225, height: 250 }} key={file?.id}>
      <Card sx={{ width: 225, height: 250 }}>
        <CardMedia sx={{ height: 140 }} image={file?.previewImg} />
        <CardContent sx={{ height: 40, p: 1 }}>
          <Typography
            variant="body2"
            sx={{
              wordWrap: 'break-word',
              overflow: 'hidden',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis',
              display: '-webkit-box'
            }}>
            {file?.fileName}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'space-between',
            pb: 1
          }}>
          <Button>Share</Button>
          <Button>
            <EditTwoTone />
          </Button>
          <Button>
            <DeleteForever />
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
