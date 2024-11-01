import React from 'react'
import { Box, Container, Typography } from '@mui/material'

const Hero = () => {
  return (
    <div>
         {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          WELCOME TO TEEN FAITH HUB
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Featured Sermon
        </Typography>

        {/* Image Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src="/group.png"
            alt="Featured Sermon Image"
            sx={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: 400,
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </Box>
      </Container>
    </div>
  )
}

export default Hero;