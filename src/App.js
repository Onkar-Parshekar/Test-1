import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import ListItemText from '@material-ui/core/ListItemText';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import "./App.css";

const countriesURL = "https://restcountries.eu/rest/v2/all";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  list: {
    width: 320,
  },
  fullList: {
    width: 'auto',
  },
});

function App() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const [countryInfo, setCountryInfo] = React.useState([]);

  const toggleDrawer = (anchor, open, country) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setCountryInfo([country ? country.flag: '',
                    country ? "Country: "+country.name : '',
                    country ? "Capital: "+country.capital : '',
                    country ? "Population: "+country.population : '',
                    country ? "Region: "+country.region : '',
                    country ? "Subregion: "+country.subregion : '',
                    country ? "Lat Long: "+country.latlng : '',
                    country ? "Borders: "+country.borders : '',
  ]);
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    >
      <Button variant="outlined" size="small" color="primary" className={classes.margin} align="right" onClick={toggleDrawer(anchor, false)}>X</Button>
      <List>
        {countryInfo.map((text, index) => (
          <ListItem button key={text}>
            <ListItem>{index === 0 ? <img src={text} alt="" width="50px" /> : <ListItemText primary={text} />}</ListItem>
          </ListItem>
        ))}
      </List>
    </div>
  );
  const [countriesData, setCountriesData] = useState([]);

  const getCountriesWithAxios = async () => {
    const response = await axios.get(countriesURL);
    setCountriesData(response.data);
  };

  useEffect(() => {
    getCountriesWithAxios();
  }, []);

  return (
    <>
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer anchor={'right'} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Country</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Flag</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Capital</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Population</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Region</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countriesData.map((country) => (
                  <TableRow>
                    <TableCell component="th" scope="row" onClick={toggleDrawer('right', true, country)}>
                      {country.name}
                    </TableCell>
                    <TableCell align="right">
                      <img src={country.flag} alt="" width="32px" />
                    </TableCell>
                    <TableCell align="right">{country.capital}</TableCell>
                    <TableCell align="right">{country.population}</TableCell>
                    <TableCell align="right">{country.region}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
