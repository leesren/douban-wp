import React, { createElement } from 'react';
import classNames from 'classnames';
import { Button } from 'antd-mobile';
import config from './typeConfig';
import styles from './BaseException.less';

import { projectConfig } from '@/config';
import { Link } from 'umi';
export default ({
  className,
  type,
  title,
  desc,
  img,
  actions,
  ...rest
}: any) => {
  const pageType: keyof typeof config = type in config ? type : '404';
  const clsString = classNames(styles.exception, className, 'plr-lg');

  return (
    <div className={clsString} {...rest}>
      <div>
        <div
          className={styles.imgEle}
          style={{ backgroundImage: `url(${img || config[pageType].img})` }}
        />
      </div>
      <div className={styles.content}>
        <h2 className="txc-base fs18">{title || config[pageType].title}</h2>
        <div className={'fs15 ' + styles.desc}>
          {desc || config[pageType].desc}
        </div>
        <div className={'mlr-lg2 ' + styles.actions}>
          {actions || (
            <Link to={projectConfig.homePagePath}>
              <div className="am-button">返回首页</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
