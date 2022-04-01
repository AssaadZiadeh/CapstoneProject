import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';

export default function MarketStatus({marketStatus}) {
  const [anchorEl, setAnchorEl] = useState(false);

  const open = Boolean(anchorEl);

   const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const marketOpen = <div className="market-status" style={{
            width: '20vw',
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginBottom: '3vh',
            fontWeight: '500',
            marginTop:'3vh',
            textAlign: 'center',
            borderRadius: '.25rem',
            paddingLeft: '.5rem',
            background: 'linear-gradient(to right, rgb(91, 246, 143), rgb(144, 223, 170))'}} >
                <p>Market is Currently Open </p><CheckCircleIcon />
            </div>

  const marketClosed = <div className="market-status"
        style={{
            width: '20vw',
            height: '20vh',
            padding: '.5rem',
            marginBottom: '3vh',
            fontWeight: '500',
            textAlign: 'center',
            borderRadius: '.5rem',
            paddingLeft: '.5rem',
            background: 'linear-gradient(to right, #D31027, #EA384D)',}} 

        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}>
            <div style={{ 
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            }}>
                <Typography
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                >
                    Market is Currently Closed 
                </Typography>
                <DangerousIcon />
            </div>
        

        <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1,
           color: 'white', 
           backgroundColor: '#151D2C',
           border: '1px solid white' }}> Market is Open Only on Weekdays from 9:30 a.m. to 4 p.m. Eastern time. </Typography>
      </Popover>
      </div>

  return (
      marketStatus?marketOpen:marketClosed
  );
}
