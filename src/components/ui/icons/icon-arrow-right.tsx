import * as React from 'react';
import { StyleSheet } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

import { isRTL } from '@/lib';
export const IconArrowRight = ({
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
      d="M1.5 1.16663L7.33333 6.99996L1.5 12.8333"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
