import { Typography } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import useStyles from './TimeLeft.styles';

function TimeLeft({ timeEnd, ...props }) {
  const [time, setTime] = useState({
    days: null,
    hours: null,
    mins: null,
    secs: null,
    relative: null,
    end: false,
  });
  const classes = useStyles();
  useEffect(() => {
    const interval = setInterval(() => {
      var now = moment().format('DD/MM/YYYY HH:mm:ss');

      var ms = moment(timeEnd, 'DD/MM/YYYY HH:mm:ss').diff(moment(now, 'DD/MM/YYYY HH:mm:ss'));
      var d = moment.duration(ms);
      const days = parseInt(d.asDays());
      var hours = parseInt(d.asHours());
      hours = hours - days * 24;

      var minutes = parseInt(d.asMinutes());
      minutes = minutes - (days * 24 * 60 + hours * 60);

      var seconds = parseInt(d.asSeconds());
      seconds = seconds - (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60);
      if (days < 3 && d.asSeconds() > 0) {
        setTime(() => {
          const newTime = {
            days: null,
            hours: null,
            mins: null,
            secs: null,
            relative: null,
            end: false,
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
      } else if (d.asSeconds() <= 0) {
        setTime({
          days: null,
          hours: null,
          mins: null,
          secs: null,
          relative: null,
          end: true,
        });
      } else {
        setTime({
          days,
          hours,
          mins: minutes,
          secs: seconds,
          relative: null,
          end: false,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeEnd]);
  return (
    <div className={classes.root} {...props}>
      {time.end ? (
        <Typography variant="subtitle2" className={classes.relative}>
          Đã kết thúc
        </Typography>
      ) : time?.relative ? (
        <Typography variant="subtitle2" className={classes.relative}>
          {time.relative}
        </Typography>
      ) : (
        (time.days !== null || time.hours !== null || time.mins !== null || time.secs !== null) && (
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
        )
      )}
    </div>
  );
}

export default TimeLeft;
