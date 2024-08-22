import React from 'react';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const BreadCrumbs = ({ breadcrumbItems }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize='small' />}
        aria-label='breadcrumb'
      >
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.href ? (
              <Link color='inherit' href={item.href}>
                {item.label}
              </Link>
            ) : (
              <Typography color='textPrimary'>{item.label}</Typography>
            )}
          </React.Fragment>
        ))}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadCrumbs;
