import React from 'react';
import { Redirect, useParams } from 'react-router';
import RatePanel from '../../../components/TabPanel/RatePanel/RatePanel';
import RateActivePanel from '../../../components/TabPanel/RateActivePanel/RateActivePanel';
import ProfileSideBar from '../../../components/ProfileSideBar/ProfileSideBar';
import Section from '../../../components/Section/Section';
import AuctionPanel from '../../../components/TabPanel/AuctionPanel/AuctionPanel';
import MyList from '../../../components/TabPanel/MyList/MyList';
import PasswordPanel from '../../../components/TabPanel/PasswordPanel/PasswordPanel';
import ProductPanel from '../../../components/TabPanel/ProductPanel/ProductPanel';
import ProfilePanel from '../../../components/TabPanel/ProfilePanel/ProfilePanel';
import useStyles from './Manager.styles';
import AuctionWonPanel from '../../../components/TabPanel/AuctionWonPanel/AuctionWonPanel';
function Manager() {
  const tabs = [
    'profile',
    'password',
    'auction',
    'notification',
    'product',
    'mylist',
    'rate',
		'rate-active',
    'auction-won',
  ];
  const classes = useStyles();
  const { slug } = useParams();
  if (!slug) {
    return <Redirect to="/account/profile" />;
  }
  if (slug && !tabs.includes(slug)) {
    return <div>404 NOT FOUND</div>;
  }

  return (
    <Section>
      <div className={classes.mainContent}>
        <ProfileSideBar />
        <div className={classes.panel}>
          {slug === 'profile' && <ProfilePanel />}
          {slug === 'password' && <PasswordPanel />}
          {slug === 'auction' && <AuctionPanel />}
          {slug === 'auction-won' && <AuctionWonPanel />}
          {slug === 'product' && <ProductPanel />}
          {slug === 'mylist' && <MyList />}
          {slug === 'rate' && <RatePanel />}
          {slug === 'rate-active' && <RateActivePanel />}
        </div>
      </div>
    </Section>
  );
}

export default Manager;
