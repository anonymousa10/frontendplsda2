import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Category {
    id: number;
    name: string;
}

const CreateThread: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newCategoryName, setNewCategoryName] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [isCreatingNewCategory, setIsCreatingNewCategory] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/categories', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                    },
                    credentials: 'include', // include cookies and other credentials
                });

                if (response.ok) {
                    const data = await response.json();
                    setCategories(data.data);
                } else {
                    console.error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        let categoryId = selectedCategory;
        if (isCreatingNewCategory) {
            const response = await fetch('http://localhost:8080/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                },
                body: JSON.stringify({ name: newCategoryName }),
                credentials: 'include', // include cookies and other credentials
            });

            if (!response.ok) {
                console.error('Failed to create category');
                return;
            }

            const data = await response.json();
            categoryId = data.id;
        }

        const threadData = {
            title,
            content: description,
            category_id: categoryId,
        };

        const response = await fetch('http://localhost:8080/api/threads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
            },
            body: JSON.stringify(threadData),
            credentials: 'include', // include cookies and other credentials
        });

        if (response.ok) {
            const data = await response.json();
            navigate(`/threads/${data.data.id}`);
        } else {
            console.error('Failed to create thread');
        }
    };

    return (
        <Box sx={{ padding: 2, maxWidth: 600, margin: 'auto' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Create New Thread
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Description"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={selectedCategory}
                        onChange={(event) => {
                            setSelectedCategory(event.target.value);
                            setIsCreatingNewCategory(event.target.value === 'create');
                        }}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                        <MenuItem value="create">Create New Category</MenuItem>
                    </Select>
                    {isCreatingNewCategory && (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="New Category Name"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                        />
                    )}
                </FormControl>
                <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>
                    Create Thread
                </Button>
            </form>
        </Box>
    );
};

export default CreateThread;




















































































// import React, { useEffect, useState } from 'react';
// import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// interface Category {
//     id: number;
//     name: string;
// }

// const CreateThread: React.FC = () => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [newCategoryName, setNewCategoryName] = useState('');
//     const [categories, setCategories] = useState<Category[]>([]);
//     const [isCreatingNewCategory, setIsCreatingNewCategory] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await fetch('http://localhost:8080/api/categories', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
//                     },
//                     credentials: 'include', // include cookies and other credentials
//                 });

//                 if (response.ok) {
//                     const data = await response.json();
//                     setCategories(data.data);
//                 } else {
//                     console.error('Failed to fetch categories');
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         };

//         fetchCategories();
//     }, []);

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();

//         let categoryId = selectedCategory;
//         if (isCreatingNewCategory) {
//             const response = await fetch('http://localhost:8080/api/categories', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
//                 },
//                 body: JSON.stringify({ name: newCategoryName }),
//                 credentials: 'include', // include cookies and other credentials
//             });

//             if (!response.ok) {
//                 console.error('Failed to create category');
//                 return;
//             }

//             const data = await response.json();
//             categoryId = data.id;
//         }

//         const threadData = {
//             title,
//             content: description,
//             category_id: categoryId,
//         };

//         const response = await fetch('http://localhost:8080/api/threads', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
//             },
//             body: JSON.stringify(threadData),
//             credentials: 'include', // include cookies and other credentials
//         });

//         if (response.ok) {
//             const data = await response.json();
//             navigate(`/threads/${data.data.id}`);
//         } else {
//             console.error('Failed to create thread');
//         }
//     };

//     return (
//         <Box sx={{ padding: 2, maxWidth: 600, margin: 'auto' }}>
//             <Typography variant="h4" align="center" gutterBottom>
//                 Create New Thread
//             </Typography>
//             <form onSubmit={handleSubmit}>
//                 <TextField
//                     fullWidth
//                     margin="normal"
//                     label="Title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                 />
//                 <TextField
//                     fullWidth
//                     margin="normal"
//                     label="Description"
//                     multiline
//                     rows={4}
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                 />
//                 <FormControl fullWidth margin="normal">
//                     <InputLabel>Category</InputLabel>
//                     <Select
//                         value={selectedCategory}
//                         onChange={(event) => {
//                             setSelectedCategory(event.target.value);
//                             setIsCreatingNewCategory(event.target.value === 'create');
//                         }}
//                     >
//                         {categories.map((category) => (
//                             <MenuItem key={category.id} value={category.id}>
//                                 {category.name}
//                             </MenuItem>
//                         ))}
//                         <MenuItem value="create">Create New Category</MenuItem>
//                     </Select>
//                     {isCreatingNewCategory && (
//                         <TextField
//                             fullWidth
//                             margin="normal"
//                             label="New Category Name"
//                             value={newCategoryName}
//                             onChange={(e) => setNewCategoryName(e.target.value)}
//                         />
//                     )}
//                 </FormControl>
//                 <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>
//                     Create Thread
//                 </Button>
//             </form>
//         </Box>
//     );
// };

// export default CreateThread;
