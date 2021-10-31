import React from 'react';
import PanelTitle from '../../PanelTitle/PanelTitle';
import RateItem from '../../RateItem/RateItem';
import useStyles from './RatePanel.styles';
function RatePanel() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PanelTitle title="Danh sách của tôi" />
      <div>
        <RateItem
          title="Đồng hồ rolex"
          seller="ngocsotn"
          sellerPoint={2}
          status="done"
          imgSrc="https://cf.shopee.vn/file/8126085bad03c21779e1b77876fb7316"
          totalBid="5"
          dateCreated="31/10/2021 4:30:00"
          dateEnd="1/11/2021 12:00:00"
          currentPrice="5000"
          currentBidder="xizot"
          currentBidderPoint={9}
          rateUser="xizot"
          ratePoint="+1"
          rateDate="20/11/2021"
          rateContent="Sản phẩm tốt"
        />
        <RateItem
          title="Đồng hồ rolex"
          seller="ngocsotn"
          sellerPoint={2}
          status="done"
          imgSrc="https://cf.shopee.vn/file/8126085bad03c21779e1b77876fb7316"
          totalBid="5"
          dateCreated="31/10/2021 4:30:00"
          dateEnd="1/11/2021 12:00:00"
          currentPrice="5000"
          currentBidder="xizot"
          currentBidderPoint={9}
          rateUser="xizot"
          ratePoint="+1"
          rateDate="20/11/2021"
          rateContent="Sản phẩm tốt"
        />
        <RateItem
          title="Đồng hồ rolex"
          seller="ngocsotn"
          sellerPoint={2}
          status="failed"
          imgSrc="https://cf.shopee.vn/file/8126085bad03c21779e1b77876fb7316"
          totalBid="5"
          dateCreated="31/10/2021 4:30:00"
          dateEnd="1/11/2021 12:00:00"
          currentPrice="5000"
          currentBidder="xizot"
          currentBidderPoint={9}
          rateUser="xizot"
          ratePoint="+1"
          rateDate="20/11/2021"
          rateContent="Sản phẩm tốt"
        />
        <RateItem
          title="Đồng hồ rolex"
          seller="ngocsotn"
          sellerPoint={2}
          status="denied"
          imgSrc="https://cf.shopee.vn/file/8126085bad03c21779e1b77876fb7316"
          totalBid="5"
          dateCreated="31/10/2021 4:30:00"
          dateEnd="1/11/2021 12:00:00"
          currentPrice="5000"
          currentBidder="xizot"
          currentBidderPoint={9}
          rateUser="xizot"
          ratePoint="+1"
          rateDate="20/11/2021"
          rateContent="Sản phẩm tốt"
        />
        <RateItem
          title="Đồng hồ rolex"
          seller="ngocsotn"
          sellerPoint={2}
          status="pending"
          imgSrc="https://cf.shopee.vn/file/8126085bad03c21779e1b77876fb7316"
          totalBid="5"
          dateCreated="31/10/2021 4:30:00"
          dateEnd="1/11/2021 12:00:00"
          currentPrice="5000"
          currentBidder="xizot"
          currentBidderPoint={9}
          rateUser="xizot"
          ratePoint="+1"
          rateDate="20/11/2021"
          rateContent="Sản phẩm tốt"
        />
        <RateItem
          title="Đồng hồ rolex"
          seller="ngocsotn"
          sellerPoint={2}
          status="done"
          imgSrc="https://cf.shopee.vn/file/8126085bad03c21779e1b77876fb7316"
          totalBid="5"
          dateCreated="31/10/2021 4:30:00"
          dateEnd="1/11/2021 12:00:00"
          currentPrice="5000"
          currentBidder="xizot"
          currentBidderPoint={9}
          rateUser="xizot"
          ratePoint="+1"
          rateDate="20/11/2021"
          rateContent="Sản phẩm tốt"
        />
        <RateItem
          title="Đồng hồ rolex"
          seller="ngocsotn"
          sellerPoint={2}
          status="done"
          imgSrc="https://cf.shopee.vn/file/8126085bad03c21779e1b77876fb7316"
          totalBid="5"
          dateCreated="31/10/2021 4:30:00"
          dateEnd="1/11/2021 12:00:00"
          currentPrice="5000"
          currentBidder="xizot"
          currentBidderPoint={9}
          rateUser="xizot"
          ratePoint="-1"
          rateDate="20/11/2021"
          rateContent="Sản phẩm tốt"
        />
        <RateItem
          title="Đồng hồ rolex"
          seller="ngocsotn"
          sellerPoint={2}
          status="done"
          imgSrc="https://cf.shopee.vn/file/8126085bad03c21779e1b77876fb7316"
          totalBid="5"
          dateCreated="31/10/2021 4:30:00"
          dateEnd="1/11/2021 12:00:00"
          currentPrice="5000"
          currentBidder="xizot"
          currentBidderPoint={9}
          rateUser="xizot"
          ratePoint="-1"
          rateDate="20/11/2021"
          rateContent="Sản phẩm tốt"
        />
      </div>
    </div>
  );
}

export default RatePanel;
