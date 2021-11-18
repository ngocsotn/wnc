import { Button, Tabs, Tab, Box, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../../slices/ui.slice';
import PanelTitle from '../../PanelTitle/PanelTitle';
import ProductItemV2 from '../../ProductItemV2/ProductItemV2';
import ProductExpiredPanel from '../ProductExpiredPanel/ProductExpiredPanel';
import ProductHasBidderPanel from '../ProductHasBidderPanel/ProductHasBidderPanel';
import ProductProcessingPanel from '../ProductProcessingPanel/ProductProcessingPanel';
import useStyles from './ProductPanel.styles';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function ProductPanel() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const openModalAddHandler = () => {
    dispatch(uiActions.openModal('openAdd'));
  };
  return (
    <div className={classes.root}>
      <PanelTitle title="Quản lí sản phẩm">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={openModalAddHandler}>
          Thêm mới
        </Button>
      </PanelTitle>

      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Đang diễn ra" {...a11yProps(0)} />
          <Tab label="Đã có người mua" {...a11yProps(1)} />
          <Tab label="Kết thúc" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ProductProcessingPanel />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProductHasBidderPanel />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ProductExpiredPanel />
        </TabPanel>
      </Box>
    </div>
  );
}

export default ProductPanel;
