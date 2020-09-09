import React from 'react';
import classNames from 'classnames';
import Panel from './Panel';

interface CollapseInterface extends React.FC {
  Panel: typeof Panel;
}

const Collapse: CollapseInterface = (props) => {
  console.log(props.children);
  return (
    <div></div>
  );
};

Collapse.defaultProps = {
  prefixCls: 'rc-collapse',
  onChange() {},
  accordion: false,
  destroyInactivePanel: false,
};

Collapse.Panel = Panel;

export default Collapse;
