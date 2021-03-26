import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

type TransitionProps = {
  isShow: boolean;
  children: React.ReactElement;
  transitionName: string;
  appearTimeout: number;
  appearActiveTimeout: number;
  appearEndTimeout: number;
  enterTimeout: number;
  enterActiveTimeout: number;
  enterEndTimeout: number;
  leaveTimeout: number;
  leaveEndTimeout: number;
  leaveActiveTimeout: number;
}

const Transition: React.FC<TransitionProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [classes, setClasses] = useState<string>('');

  const {
    isShow,
    children,
    transitionName,
    appearTimeout = 2,
    appearActiveTimeout = 2,
    appearEndTimeout = 2,
    enterTimeout = 2,
    enterActiveTimeout = 2,
    enterEndTimeout = 2,
    leaveTimeout = 2,
    leaveEndTimeout = 2,
    leaveActiveTimeout = 2,
  } = props;

  const getClasses = (type: string) => {
    const initClasses = classnames({
      [`${transitionName}-appear`]: type === 'appear',
      [`${transitionName}-enter`]: type === 'enter',
      [`${transitionName}-leave`]: type === 'leave',
    });
    const activeClasses = classnames({
      [`${transitionName}-appear-active`]: type === 'appear',
      [`${transitionName}-enter-active`]: type === 'enter',
      [`${transitionName}-leave-active`]: type === 'leave',
    });
    const endClasses = classnames({
      [`${transitionName}-appear-end`]: type === 'appear',
      [`${transitionName}-enter-end`]: type === 'enter',
      [`${transitionName}-leave-end`]: type === 'leave',
    });
    return {
      initClasses,
      activeClasses,
      endClasses,
    };
  };

  const cloneChildren = () => {
    const className = children.props.className
    // 通过React.cloneElement给子元素添加额外的props，
    return React.cloneElement(
      children,
      { className: `${className} ${classes}` },
    );
  };

  const appearAnimate = () => {
    const {
      initClasses,
      activeClasses,
      endClasses,
    } = getClasses('appear');
    setVisible(true);
    setClasses(initClasses);

    setTimeout(_ => {
      setClasses(activeClasses);
    }, appearTimeout);

    setTimeout(_ => {
      setClasses(endClasses);
    }, appearActiveTimeout + appearTimeout);

    setTimeout(_ => {
      setClasses('');
    }, appearEndTimeout + appearActiveTimeout + appearTimeout);
  };

  const enterAnimate = () => {
    const {
      initClasses,
      activeClasses,
      endClasses,
    } = getClasses('enter');
    setVisible(true);
    setClasses(initClasses);

    const enterTimer = setTimeout(_ => {
      setClasses(activeClasses);
      clearTimeout(enterTimer);
    }, enterTimeout);

    const enterActiveTimer = setTimeout(_ => {
      setClasses(endClasses);
      clearTimeout(enterActiveTimer);
    }, enterActiveTimeout + enterTimeout);

    const enterEndTimer = setTimeout(_ => {
      setClasses('');
      clearTimeout(enterEndTimer);
    }, enterEndTimeout + enterActiveTimeout + enterTimeout);
  };

  const leaveAnimate = () => {
    const {
      initClasses,
      activeClasses,
      endClasses,
    } = getClasses('leave');

    setClasses(initClasses);

    const leaveTimer = setTimeout(_ => {
      setClasses(activeClasses);
      clearTimeout(leaveTimer);
    }, leaveTimeout);

    const leaveActiveTimer = setTimeout(_ => {
      setClasses(endClasses);
      clearTimeout(leaveActiveTimer);
    }, leaveActiveTimeout + leaveTimeout);

    const leaveEndTimer = setTimeout(_ => {
      setVisible(false);
      setClasses('');
      clearTimeout(leaveEndTimer);
    }, leaveEndTimeout + leaveActiveTimeout + leaveTimeout);
  };

  useEffect(() => {
    appearAnimate();
  }, []);

  useEffect(() => {
    if (isShow) {
      enterAnimate();
    } else {
      leaveAnimate();
    }
  }, [isShow]);

  return visible ? cloneChildren() : null;
};

export default Transition;
