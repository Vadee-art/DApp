/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Grid,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAllArtWorks } from '../actions/artworkAction';

export default function SideFilter({ title, list, kind }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword');
  const artistId = searchParams.get('artist');
  const src = searchParams.get('src');

  const [value, setValue] = useState();
  const [checked, setChecked] = useState(false);

  // keyword
  useEffect(() => {
    if (artistId) {
      // dispatch(fetchAllArtWorks(artistId));
    }
  }, []);

  // change checkbox
  const handleChange = (e, item) => {
    setValue(e.target.name);
    // if (item.country) {
    //   const country = e.target.name;
    //   navigate(`/${kind}?regions=${country.toLowerCase()}`);
    // }
    if (item.first_name) {
      // navigate(`/${kind}?artist=${item._id}`);
      console.log(item._id);
    }
    // if (item.name) {
    //   const category = e.target.name;
    //   navigate(`/${kind}?category=${category}`);
    // }
  };

  return (
    <Grid container>
      {list && (
        <Accordion sx={{ boxShadow: 0, width: '100%' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-bh-content"
            id="panel-bh-header"
          >
            <Typography
              sx={{
                width: '33%',
                flexShrink: 0,
                color: '#A2A28F',
                fontWeight: 600,
                fontSize: '18px',
                padding: '15px 0px',
              }}
            >
              {title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex' }}>
              <FormControl required component="fieldset" variant="standard">
                {list.map((item, index) => (
                  <FormGroup key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          style={{
                            color: '#A2A28F',
                          }}
                          size="medium"
                          checked={
                            ((item.country && item.country.toLowerCase()) ||
                              (item.first_name &&
                                item.first_name.toLowerCase()) ||
                              (item.name && item.name.toLowerCase())) ===
                              value && true
                          }
                          onChange={(e) => handleChange(e, item)}
                          name={
                            item.country ||
                            (item._id && String(item._id)) ||
                            (item.id && String(item.id))
                          }
                        />
                      }
                      label={
                        <Typography
                          sx={{
                            display: 'inline',
                            color: '#9e9e9e',
                            lineHeight: 1.3,
                            fontWeight: 400,
                            fontSize: '17px',
                          }}
                        >
                          {item.country ||
                            item.name ||
                            `${item.first_name}  ${item.last_name}`}
                        </Typography>
                      }
                    />
                  </FormGroup>
                ))}
              </FormControl>
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </Grid>
  );
}

SideFilter.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array, // could be catagories, or regions, or ...
  kind: PropTypes.string.isRequired, // push to artwork or artist url
};
