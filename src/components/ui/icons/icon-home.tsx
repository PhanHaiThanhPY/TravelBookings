import React from 'react';
import { Svg, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface IconHomeProps {
  color?: string;
  isActive?: boolean;
}

const IconHome: React.FC<IconHomeProps> = ({
  color = '#6B7280',
  isActive = false,
  ...props
}) => {
  return (
    <Svg width={30} height={30} viewBox="0 0 22 22" fill="none" {...props}>
      {isActive ? (
        <>
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.27 5.823C0.75 6.77 0.75 7.915 0.75 10.203V11.725C0.75 15.625 0.75 17.576 1.922 18.788C3.094 20 4.979 20 8.75 20H12.75C16.521 20 18.407 20 19.578 18.788C20.749 17.576 20.75 15.626 20.75 11.725V10.204C20.75 7.915 20.75 6.771 20.23 5.823C19.712 4.874 18.763 4.286 16.866 3.108L14.866 1.867C12.861 0.622 11.858 0 10.75 0C9.642 0 8.64 0.622 6.634 1.867L4.634 3.108C2.737 4.286 1.789 4.874 1.27 5.823ZM10 16C10 16.1989 10.079 16.3897 10.2197 16.5303C10.3603 16.671 10.5511 16.75 10.75 16.75C10.9489 16.75 11.1397 16.671 11.2803 16.5303C11.421 16.3897 11.5 16.1989 11.5 16V13C11.5 12.8011 11.421 12.6103 11.2803 12.4697C11.1397 12.329 10.9489 12.25 10.75 12.25C10.5511 12.25 10.3603 12.329 10.2197 12.4697C10.079 12.6103 10 12.8011 10 13V16Z"
            fill="url(#paint0_linear)"
          />
          <Defs>
            <LinearGradient
              id="paint0_linear"
              x1={10.75}
              y1={0}
              x2={10.75}
              y2={20}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#3985FF" />
              <Stop offset={1} stopColor="#0866FF" />
            </LinearGradient>
          </Defs>
        </>
      ) : (
        <Path
          d="M10.75 17V14M1.10204 12.214C0.748042 9.916 0.572042 8.768 1.00604 7.749C1.44004 6.73 2.40404 6.034 4.33104 4.641L5.77104 3.6C8.16804 1.867 9.36704 1 10.751 1C12.133 1 13.331 1.867 15.729 3.6L17.169 4.641C19.096 6.034 20.059 6.731 20.494 7.749C20.928 8.768 20.752 9.916 20.399 12.213L20.098 14.173C19.598 17.429 19.347 19.057 18.179 20.029C17.011 21.001 15.304 21 11.89 21H9.61004C6.19504 21 4.48804 21 3.32004 20.029C2.15204 19.057 1.90204 17.429 1.40204 14.172L1.10204 12.214Z"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </Svg>
  );
};

export default IconHome;
