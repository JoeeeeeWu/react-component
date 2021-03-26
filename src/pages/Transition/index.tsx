import React, { useState } from 'react';
import Transition from '@/components/Transition';
import './index.less';

const TransitionPage = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const onClick = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <button onClick={onClick}>点我</button>
      <Transition
        isShow={visible}
        transitionName="slide"
        appearTimeout={200}
        appearActiveTimeout={200}
        appearEndTimeout={200}
        enterTimeout={200}
        enterActiveTimeout={200}
        enterEndTimeout={200}
        leaveTimeout={200}
        leaveEndTimeout={200}
        leaveActiveTimeout={200}
      >
        <div className="demo">dadf等的点点滴滴的点点滴滴</div>
      </Transition>
    </div>
  );
};

export default TransitionPage;
