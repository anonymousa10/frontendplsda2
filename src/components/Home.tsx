import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Pagination, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home: React.FC = () => {
 const [threads, setThreads] = useState<any[]>([]);
 const [page, setPage] = useState(1);

 useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/threads/page/${page}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
          },
          credentials: 'include', // include cookies and other credentials
        });

        if (response.ok) {
          const data = await response.json();
          setThreads(data.data);
        } else {
          console.error('Failed to fetch threads');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchThreads();
 }, [page]);


 
 return (
    <Box sx={{ padding: 2 }}>
      {threads.map((thread) => (
        <Card key={thread.id} sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              <RouterLink to={`/threads/${thread.id}`}>
                {thread.title}
              </RouterLink>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {thread.content.substring(0, 100)}...
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Pagination count={10} page={page} onChange={(_, value) => setPage(value)} />
      <Button variant="contained" color="primary" component={RouterLink} to="/create-thread" sx={{ mt: 2 }}>
        Create A New Thread
      </Button>

    </Box>
 );
};

export default Home;
