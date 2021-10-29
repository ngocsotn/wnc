import { Typography } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import useStyles from './TimeLeft.styles';

function TimeLeft({ timeEnd }) {
  const [time, setTime] = useState({
    days: null,
    hours: null,
    mins: null,
    secs: null,
    relative: null,
  });
  const classes = useStyles();
  useEffect(() => {
    const interval = setInterval(() => {
      var now = moment().format('DD/MM/YYYY HH:mm:ss');

      var ms = moment(timeEnd, 'DD/MM/YYYY HH:mm:ss').diff(moment(now, 'DD/MM/YYYY HH:mm:ss'));
      var d = moment.duration(ms);
      const days = d.days();
      const hours = d.hours();
      const minutes = d.minutes();
      const seconds = d.seconds();

      if (days < 3) {
        setTime(() => {
          const newTime = {
            days: null,
            hours: null,
            mins: null,
            secs: null,
            relative: null,
          };
          if (seconds > 0) {
            newTime.relative = 'Còn: ' + seconds + ' giây nữa';
          }
          if (minutes > 0) {
            newTime.relative = 'Còn: ' + minutes + ' phút nữa';
          }
          if (hours > 0) {
            newTime.relative = 'Còn: ' + hours + ' giờ nữa';
          }
          if (days > 0) {
            newTime.relative = 'Còn: ' + days + ' ngày nữa';
          }
          return newTime;
        });
      } else {
        setTime({
          days,
          hours,
          mins: minutes,
          secs: seconds,
          relative: null,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className={classes.root}>
      {time?.relative ? (
        <Typography variant="subtitle2" className={classes.relative}>
          {time.relative}
        </Typography>
      ) : (
        <>
          <div className={classes.section}>
            <Typography variant="subtitle1" className={classes.num}>
              {time?.days || 0}
            </Typography>
            <Typography variant="subtitle2" className={classes.label}>
              Ngày
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography variant="subtitle1" className={classes.num}>
              {time?.hours || 0}
            </Typography>
            <Typography variant="subtitle2" className={classes.label}>
              Giờ
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography variant="subtitle1" className={classes.num}>
              {time?.mins || 0}
            </Typography>
            <Typography variant="subtitle2" className={classes.label}>
              Phút
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography variant="subtitle1" className={classes.num}>
              {time?.secs || 0}
            </Typography>
            <Typography variant="subtitle2" className={classes.label}>
              Giây
            </Typography>
          </div>
        </>
      )}
    </div>
  );
}

export default TimeLeft;
