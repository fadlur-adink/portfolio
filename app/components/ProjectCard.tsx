"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";

interface ProjectCardProps {
	title: string;
	description: string;
	technologies: string[];
	image?: string;
	liveLink?: string;
	repoLink?: string;
}

const ProjectCard = ({
	title,
	description,
	technologies,
	image,
	liveLink,
	repoLink,
}: ProjectCardProps) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const DESCRIPTION_LIMIT = 100;

    const shouldTruncate = description.length > DESCRIPTION_LIMIT;
    const displayDescription = isExpanded || !shouldTruncate
        ? description
        : `${description.substring(0, DESCRIPTION_LIMIT)}...`;

	return (
		<Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
			<Box sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
				{image ? (
					<CardMedia
						component="img"
						height="200"
						image={image}
						alt={title}
					/>
				) : (
					<Box
						sx={{
							height: 200,
							bgcolor: "background.paper",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Typography color="text.secondary">
							[Project Image]
						</Typography>
					</Box>
				)}
			</Box>

			<Box
				sx={{
					borderBottom: "1px solid",
					borderColor: "divider",
					px: 2,
					py: 1,
				}}
			>
				<Typography variant="body2" color="text.secondary">
					{technologies.join(" ")}
				</Typography>
			</Box>

			<CardContent sx={{ flexGrow: 1 }}>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ mb: 1 }}
				>
					{displayDescription}
				</Typography>
                {shouldTruncate && (
                    <Button 
                        size="small" 
                        onClick={() => setIsExpanded(!isExpanded)}
                        sx={{ 
                            p: 0, 
                            minWidth: 'auto', 
                            textTransform: 'none',
                            color: 'primary.main',
                            '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
                        }}
                    >
                        {isExpanded ? "Read Less" : "Read More"}
                    </Button>
                )}
			</CardContent>
			<CardActions sx={{ p: 2, pt: 0 }}>
				<Button
					variant="outlined"
					size="small"
					href={liveLink || "#"}
					startIcon={<span>{"<~>"}</span>}
				>
					Live
				</Button>
				<Button
					variant="outlined"
					size="small"
					href={repoLink || "#"}
					color="inherit"
					startIcon={<span>{">="}</span>}
				>
					Cached
				</Button>
			</CardActions>
		</Card>
	);
};

export default ProjectCard;
