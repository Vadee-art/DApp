import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Menu, MenuItem, ListItemIcon } from '@mui/material/';
import Logout from '@mui/icons-material/Logout';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, openAuthDialog } from '../../actions/userAction';
import LoginDialog from './Login';

export default function AccountMenu({ anchorEl, setAnchorEl }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);

  const userLogin = useSelector((state) => state.userLogin);
  const { success: successLogin } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { success: successUserDetails } = userDetails;

  const handleClose = () => {
    setAnchorEl(null);
  };

  // log out
  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {!successUserDetails ? (
          <div>
            <MenuItem onClick={() => dispatch(openAuthDialog('login'))}>
              Login
            </MenuItem>
            <MenuItem onClick={() => dispatch(openAuthDialog('register'))}>
              Register
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={() => navigate('/users/profile')}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={() => handleLogOut()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </div>
        )}
      </Menu>
      {/* <LoginDialog /> */}
    </>
  );
}

AccountMenu.propTypes = {
  anchorEl: PropTypes.object,
  setAnchorEl: PropTypes.func.isRequired,
};
