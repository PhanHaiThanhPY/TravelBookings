import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

interface IconGrowthProps extends SvgProps {
  color?: string;
}

const IconGrowth2: React.FC<IconGrowthProps> = ({
  color = '#374151',
  ...props
}) => {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <G clipPath="url(#clip0_2025_23349)">
        <Path
          d="M9.05114 8.04908L9.60938 8.60753L10 8.99835L9.64778 9.35127L9.99983 8.99922L9.99983 8.99921L10.0003 8.99878L10.0003 8.99874L10.0007 8.99903L10.2254 9.44459L10.0002 8.99817L9.60949 8.60743L9.05114 8.04908ZM9.05114 8.04908L7.41355 6.41149L7.00029 5.99823L7.00037 5.99813L7.00062 5.99778M9.05114 8.04908L7.00062 5.99778M7.00062 5.99778L7.354 5.64405L7.00091 5.997L7.00059 5.99732L7.00045 5.99746L7.00038 5.99753L7.00062 5.99778Z"
          stroke={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2025_23349">
          <Rect width={16} height={16} fill="white" y={-0.00195312} />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default IconGrowth2;
