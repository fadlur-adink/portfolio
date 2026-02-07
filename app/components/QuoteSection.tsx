'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const QuoteSection = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ position: 'relative', p: 4, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
                <Box sx={{ 
                    position: 'absolute', 
                    top: -15, 
                    left: 20, 
                    bgcolor: 'background.default',
                    px: 1
                }}>
                    <FormatQuoteIcon fontSize="large" color="disabled" />
                </Box>
                
                <Typography variant="h5" align="center" sx={{ fontStyle: 'italic' }}>
                    With great power comes great electricity bill
                </Typography>

                <Box sx={{ 
                    position: 'absolute', 
                    bottom: -15, 
                    right: 20, 
                    bgcolor: 'background.default',
                    px: 1
                }}>
                    <FormatQuoteIcon fontSize="large" color="disabled" />
                </Box>
            </Box>
            <Box sx={{ 
                alignSelf: 'flex-end', 
                border: '1px solid', 
                borderColor: 'divider', 
                borderTop: 'none', 
                p: 2,
                mr: 2
            }}>
                <Typography variant="h6">- Dr. Who</Typography>
            </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default QuoteSection;
