import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
const ThreadDetail: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();

 const [thread, setThread] = useState<any>(null);
 const [comments, setComments] = useState<any[]>([]);
 const [newComment, setNewComment] = useState('');


 useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/threads/${id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
          },
          credentials: 'include', // include cookies and other credentials
        });

        if (response.ok) {
          const data = await response.json();
          setThread(data.data);
        } else {
          console.error('Failed to fetch thread details');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/comments/thread/${id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
          },
          credentials: 'include', // include cookies and other credentials
        });

        if (response.ok) {
          const data = await response.json();
          setComments(data.data);
        } else {
          console.error('Failed to fetch comments');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchThread();
    fetchComments();
 }, [id]);








 const handleNewCommentSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  const threadId = id !== '' ? parseInt(id) : NaN;

  const commentData = {
    content: newComment,
    thread_id: threadId,
  };
  if (!isNaN(threadId)) {
    // Make the POST request
    const response = await fetch('http://localhost:8080/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
      },
      body: JSON.stringify(commentData),
      credentials: 'include', // include cookies and other credentials
    });
  
    if (response.ok) {
      const data = await response.json();
      setComments([...comments, data.data]);
      setNewComment('');
    } else {
      console.error('Failed to submit new comment');
    }
   } else {
    console.error('Invalid thread ID');
   }


};


















return (
 <Box sx={{ padding: 2 }}>
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {thread?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {thread?.content}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Author: {thread?.author}
        </Typography>
        {/* <Typography variant="subtitle2" color="text.secondary">
          Created At: {new Intl.DateTimeFormat('en-US').format(new Date(thread?.created_at))}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Updated At: {new Intl.DateTimeFormat('en-US').format(new Date(thread?.updated_at))}
        </Typography> */}
      </CardContent>
    </Card>

    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Comments</Typography>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <ListItemText primary={comment.content} secondary={`Author: ${comment.author}`} />
          </ListItem>
        ))}
      </List>
    </Box>

    <form onSubmit={handleNewCommentSubmit}>
      <TextField
        label="New Comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button type="submit">Submit</Button>
    </form>
 </Box>
);

};

export default ThreadDetail;