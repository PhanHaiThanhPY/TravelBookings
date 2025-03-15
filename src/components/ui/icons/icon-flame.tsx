import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, {
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';

export const IconFlame = (props: SvgProps) => (
  <Svg width={37} height={37} viewBox="0 0 37 37" fill="none" {...props}>
    <Rect y={-0.002} width={37} height={37} rx={12} fill="#FFF0ED" />
    <G clipPath="url(#clip0_3606_9983)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.402 16.752s1.48-5.075-2.734-7.578c-.274 1.778-1.47 3.37-3.288 4.374-1.984 1.224-5.755 4.018-5.972 7.23-.249 2.799 1.48 5.487 4.46 6.94.209-1.246 1.027-2.365 2.27-3.104 1.048-.562 1.77-1.445 2.003-2.45 2.54 1.295 4.07 3.573 4.025 5.994l-.001.016c2.99-.902 5.086-3.095 5.422-5.677.552-3 -1.16-7.225-2.86-8.677-.78 1.194-1.924 2.203-3.325 2.931Z"
        fill="url(#paint0_linear_3606_9983)"
      />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear_3606_9983"
        x1={18.958}
        y1={16.032}
        x2={18.35}
        y2={25.916}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FB4B21" />
        <Stop offset={1} stopColor="#FBFAE3" />
      </LinearGradient>
      <ClipPath id="clip0_3606_9983">
        <Rect
          width={20}
          height={20}
          fill="white"
          transform="translate(8.5 8.498)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
