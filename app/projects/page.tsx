'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ProjectCard from '../components/ProjectCard';

const completeApps = [
    {
        title: 'Coop Access Dashboard',
        description: 'Developed robust software solutions, web dashboards, and scalable front-end architectures.',
        technologies: ['React', 'Next.js', 'Redux', 'TypeScript'],
        image: '',
        liveLink: '#',
        repoLink: '#'
    },
    {
        title: 'ProtectX',
        description: 'Discord anti-crash bot',
        technologies: ['React', 'Express', 'Discord.js', 'Node.js'],
        image: '/assets_ref/ProtectX.png',
        liveLink: '#',
        repoLink: '#'
    },
    {
        title: 'Kahoot Answers Viewer',
        description: 'Get answers to your kahoot quiz',
        technologies: ['CSS', 'Express', 'Node.js'],
        image: '/assets_ref/Kahoot.png',
        liveLink: '#',
        repoLink: '#'
    }
];

const smallProjects = [
     {
        title: 'BotMarket',
        description: 'Bot marketplace for discord bots',
        technologies: ['HTML', 'CSS', 'JS'],
        image: '',
        liveLink: '#',
        repoLink: '#'
    },
     {
        title: 'Omen',
        description: 'Advanced multipurpose discord bot',
        technologies: ['TS', 'Discord.js'],
        image: '',
        liveLink: '#',
        repoLink: '#'
    },
    {
        title: 'Wallpapers',
        description: 'Desktop wallpapers sharing platform',
        technologies: ['Vue', 'Nuxt', 'Firebase'],
        image: '',
        liveLink: '#',
        repoLink: '#'
    },
    {
        title: 'System Monitor',
        description: 'Real-time system resource monitor',
        technologies: ['Rust', 'Tauri', 'React'],
        image: '',
        liveLink: '#',
        repoLink: '#'
    }
];

export default function ProjectsPage() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 6 }}>
            <Typography variant="h4">
                <span style={{ color: '#a855f7' }}>/</span>projects
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ ml: 4 }}>
                List of my projects
            </Typography>
        </Box>

        <Typography variant="h5" sx={{ mb: 4 }}>
            <span style={{ color: '#a855f7' }}>#</span>complete-apps
        </Typography>

        <Grid container spacing={4} sx={{ mb: 8 }}>
            {completeApps.map((project, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                    <ProjectCard {...project} />
                </Grid>
            ))}
        </Grid>

        <Typography variant="h5" sx={{ mb: 4 }}>
            <span style={{ color: '#a855f7' }}>#</span>small-projects
        </Typography>

        <Grid container spacing={4}>
            {smallProjects.map((project, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                    <ProjectCard {...project} />
                </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
}
