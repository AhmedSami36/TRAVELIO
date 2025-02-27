import React, { useState, useCallback } from 'react';
import { Box, TextField, Button, Typography, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Social/sidebar';
import apiUrl from '../../Config/config';
import BottomBar from '../../Components/Social/BottomBar';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  content: yup.string().required('Content is required'),
});

const Create = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [zoom, setZoom] = useState(1.0);
  const [editor, setEditor] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { values, handleChange, handleSubmit, setFieldValue, errors, touched } = useFormik({
    initialValues: { content: '' },
    validationSchema,
    onSubmit: async (values) => {
      if (editor) {
        const formData = new FormData();
        formData.append('content', values.content);
        formData.append('media', image);

        try {
          setLoading(true);
          const response = await axios.post(`${apiUrl}/social/posts/create`, formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('Post created:', response.data);
          setImage(null);
          setZoom(1.0);
          setFieldValue('content', '');
          setSelectedFileName('');
          navigate('/social');
        } catch (error) {
          console.error('Error creating post:', error);
        } finally {
          setLoading(false);
        }
      }
    },
  });

  const handleImageDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
    setSelectedFileName(file.name);
  }, []);

  return (
    <>
      <Navbar />
      {!isMobile && <Sidebar />}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          mt: 10,
          width: { xs: '80vw', sm: '50vw', md: '45vw', lg: '35vw' },
          mr: { xs: 'auto', sm: '15vw', md: '17.5vw', lg: '22.5vw' },
          ml: { xs: 'auto', sm: '35vw', md: '37.5vw', lg: '42.5vw' },
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontFamily: 'Poppins, sans-serif' }}>
          Create Post
        </Typography>
        <TextField
          name="content"
          value={values.content}
          onChange={handleChange}
          label="Content"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          sx={{ mb: 2, width: '80vw', maxWidth: '450px' }}
          error={touched.content && Boolean(errors.content)}
          helperText={touched.content && errors.content}
        />
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
          <Dropzone onDrop={handleImageDrop} multiple={false}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: 'dropzone' })} style={{ width: '450px', height: '450px', border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <input {...getInputProps()} />
                {image ? (
                  <AvatarEditor
                    ref={setEditor}
                    image={image}
                    width={450}
                    height={450}
                    border={20}
                    color={[255, 255, 255, 0.6]}
                    scale={zoom}
                    rotate={0}
                  />
                ) : (
                  <Typography variant="body1" sx={{ fontFamily: 'Poppins' }}>
                    Drop or click to upload an image
                  </Typography>
                )}
              </div>
            )}
          </Dropzone>
        </Box>
        {image && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <input type="range" min="1" max="2" step="0.1" value={zoom} onChange={(e) => setZoom(parseFloat(e.target.value))} style={{ width: '100%' }} />
          </Box>
        )}
        {selectedFileName && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Selected File: {selectedFileName}
          </Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 5 }}
            onClick={handleSubmit}
            disabled={loading || !editor}
          >
            {loading ? <CircularProgress size={24} /> : 'Save Post'}
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => navigate('/social')}>
            Cancel
          </Button>
        </Box>
      </Box>
      {isMobile && <BottomBar />}
    </>
  );
};

export default Create;