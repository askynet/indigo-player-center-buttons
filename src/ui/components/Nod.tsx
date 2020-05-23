import { Icon } from '@src/ui/components/Icon';
import { Button } from '@src/ui/components/Button';
import { IInfo } from '@src/ui/types';
import { withState } from '@src/ui/withState';
import cx from 'classnames';
import React from 'react';

interface NodProps {
  icon: string;
  rewindIcon: string;
  rewind: Number;
  forward: Number;
  forwardIcon: string;
  rewindTooltipText: string;
  forwardTooltipText: string;
  startRewind();
  startForward();
}

export const Nod = withState((props: NodProps) => {
  let icon = props.icon!=undefined?props.icon : 'igui';
  return (
    <div
      className={cx('igui_nod', {
        'igui_nod-active': !!props.icon,
      })}
    >
      <Button
        name="rewind"
        icon={props.rewindIcon}
        onClick={props.startRewind}
        tooltip={props.rewindTooltipText}
      />
      {/* <Icon icon={icon} /> */}
      <Button
        name="playorpause"
        icon={props.icon}
        onClick={props.startRewind}
        tooltip={props.rewindTooltipText}
      />
      <Button
        name="forward"
        icon={props.forwardIcon}
        onClick={props.startForward}
        tooltip={props.forwardTooltipText}
      />
    </div>
  );
}, mapProps);

function mapProps(info: IInfo): NodProps {
  const createTooltipText = (text: string, shortcut?: string) => {
    return `${info.data.getTranslation(text)} ${
      shortcut ? `(${shortcut})` : ''
      }`.trim();
  };
  return {
    icon: info.data.nodIcon,
    rewind: info.data.rewind,
    forward: info.data.forward,
    startRewind: info.actions.rewind,
    startForward: info.actions.forward,
    rewindIcon: 'rewind',
    forwardIcon: 'forward',
    rewindTooltipText: createTooltipText(
      info.data.getTranslation('Rewind {s} seconds', {
        s: 10
      }), '←'
    ),
    forwardTooltipText: createTooltipText(
      info.data.getTranslation('Forward {s} seconds', {
        s: 10
      }), '→'
    ),
  };
}
