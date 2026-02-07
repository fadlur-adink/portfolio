'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

const skills = [
    {
        category: 'Languages',
        items: ['TypeScript', 'JavaScript', 'Python', 'Java']
    },
    {
        category: 'Databases',
        items: ['SQLite', 'PostgreSQL', 'Mongo']
    },
    {
        category: 'Tools',
        items: ['VSCode', 'Git', 'Figma', 'Linux']
    },
    {
        category: 'Other',
        items: ['HTML', 'CSS', 'SCSS', 'REST', 'Redux', 'Tailwind']
    },
    {
        category: 'Frameworks',
        items: ['React', 'Next.js', 'React Native', 'Express.js', 'Vue']
    }
];

const SkillsSection = () => {
  return (
    <Box id="skills" sx={{ mt: 8 }}>
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 4 }}>
                <span style={{ color: '#a855f7' }}>#</span>skills
            </Typography>
            <Grid container spacing={2}>
                {skills.map((skillGroup) => (
                    <Grid key={skillGroup.category} size={{ xs: 12, md: 'auto' }} sx={{ flexGrow: 1 }}>
                        <Box sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
                            <Box sx={{ p: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                                <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 700 }}>
                                    {skillGroup.category}
                                </Typography>
                            </Box>
                            <Box sx={{ p: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                    {skillGroup.items.join(' ')}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </Box>
  );
};

export default SkillsSection;
