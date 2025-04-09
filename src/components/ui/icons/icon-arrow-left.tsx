import * as React from 'react';
import { StyleSheet } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

import { isRTL } from '@/lib';

export const IconArrowLeft = ({
  color = '#3F3F46',
  style,
  ...props
}: SvgProps) => (
  <Svg
    width={9}
    height={14}
    viewBox="0 0 9 14"
    fill="none"
    {...props}
    style={StyleSheet.flatten([
      style,
      { transform: [{ scaleX: isRTL ? -1 : 1 }] },
    ])}
  >
    <Path
      d="M7.50008 12.8333L1.66675 6.99996L7.50008 1.16663"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
