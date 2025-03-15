import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

export const IconCapacityUtilization = ({
  color = '#0866FF',
  ...props
}: SvgProps) => (
  <Svg width={37} height={37} viewBox="0 0 37 37" fill="none" {...props}>
    <Rect x={0.5} y={0.498} width={36} height={36} rx={11.5} fill="#E6F0FF" />
    <Rect x={0.5} y={0.498} width={36} height={36} rx={11.5} stroke="#F3F4F6" />
    <G clipPath="url(#clip0_3606_7074)">
      <Path
        d="M18.5001 10.9981C18.6659 10.9981 18.8249 11.0639 18.9421 11.1811C19.0593 11.2983 19.1251 11.4573 19.1251 11.6231V13.4981C19.1251 13.6638 19.0593 13.8228 18.9421 13.94C18.8249 14.0572 18.6659 14.1231 18.5001 14.1231C18.3344 14.1231 18.1754 14.0572 18.0582 13.94C17.941 13.8228 17.8751 13.6638 17.8751 13.4981V11.6231C17.8751 11.4573 17.941 11.2983 18.0582 11.1811C18.1754 11.0639 18.3344 10.9981 18.5001 10.9981ZM13.1651 13.1631C13.2823 13.0459 13.4413 12.9801 13.607 12.9801C13.7727 12.9801 13.9317 13.0459 14.0489 13.1631L15.1926 14.3056C15.31 14.4229 15.3759 14.5821 15.3759 14.7481C15.3759 14.914 15.31 15.0732 15.1926 15.1906C15.0753 15.3079 14.9161 15.3738 14.7501 15.3738C14.5841 15.3738 14.425 15.3079 14.3076 15.1906L13.1651 14.0468C13.0479 13.9296 12.9821 13.7707 12.9821 13.6049C12.9821 13.4392 13.0479 13.2803 13.1651 13.1631ZM11.0001 18.4981C11.0001 18.3323 11.066 18.1733 11.1832 18.0561C11.3004 17.9389 11.4594 17.8731 11.6251 17.8731H13.6076C13.7734 17.8731 13.9324 17.9389 14.0496 18.0561C14.1668 18.1733 14.2326 18.3323 14.2326 18.4981C14.2326 18.6638 14.1668 18.8228 14.0496 18.94C13.9324 19.0572 13.7734 19.1231 13.6076 19.1231H11.6251C11.4594 19.1231 11.3004 19.0572 11.1832 18.94C11.066 18.8228 11.0001 18.6638 11.0001 18.4981ZM22.8751 18.4981C22.8751 18.3323 22.941 18.1733 23.0582 18.0561C23.1754 17.9389 23.3344 17.8731 23.5001 17.8731H25.3751C25.5409 17.8731 25.6999 17.9389 25.8171 18.0561C25.9343 18.1733 26.0001 18.3323 26.0001 18.4981C26.0001 18.6638 25.9343 18.8228 25.8171 18.94C25.6999 19.0572 25.5409 19.1231 25.3751 19.1231H23.5001C23.3344 19.1231 23.1754 19.0572 23.0582 18.94C22.941 18.8228 22.8751 18.6638 22.8751 18.4981ZM23.8176 13.1906C23.731 13.1044 23.6152 13.054 23.4931 13.0494C23.3711 13.0448 23.2517 13.0862 23.1589 13.1656L17.9339 17.6356C17.8135 17.7386 17.716 17.8656 17.6476 18.0085C17.5792 18.1514 17.5414 18.3071 17.5367 18.4654C17.5319 18.6238 17.5603 18.7814 17.6199 18.9282C17.6796 19.0749 17.7693 19.2076 17.8832 19.3177C17.9972 19.4278 18.1328 19.5128 18.2816 19.5674C18.4303 19.622 18.5888 19.645 18.7469 19.6348C18.905 19.6246 19.0592 19.5815 19.1997 19.5082C19.3402 19.4349 19.4638 19.3331 19.5626 19.2093L23.8551 13.8381C23.9298 13.7446 23.9674 13.6268 23.9607 13.5074C23.954 13.3879 23.9035 13.2751 23.8189 13.1906H23.8176Z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.8301 28.3593C15.535 28.14 14.2958 27.6678 13.1833 26.9695C12.0707 26.2713 11.1065 25.3608 10.3459 24.29C8.80958 22.1273 8.19533 19.443 8.63824 16.8274C9.08116 14.2119 10.5449 11.8794 12.7076 10.3432C14.8702 8.80689 17.5546 8.19265 20.1701 8.63556C22.7858 9.07847 25.1184 10.5423 26.6548 12.7051C28.1912 14.8678 28.8055 17.5524 28.3626 20.1681C27.9197 22.7838 26.4559 25.1164 24.2931 26.6528C22.1303 28.1892 19.4458 28.8035 16.8301 28.3606V28.3593ZM10.9989 23.0056C13.2785 21.6865 15.8664 20.9939 18.5001 20.9981C21.2326 20.9981 23.7951 21.7293 26.0014 23.0056C26.7987 21.6779 27.2294 20.1623 27.2494 18.6137C27.2694 17.0651 26.878 15.539 26.1152 14.1911C25.3525 12.8433 24.2456 11.722 22.9077 10.9419C21.5698 10.1618 20.0488 9.7507 18.5001 9.7507C16.9514 9.7507 15.4304 10.1618 14.0925 10.9419C12.7546 11.722 11.6478 12.8433 10.885 14.1911C10.1222 15.539 9.73084 17.0651 9.75085 18.6137C9.77085 20.1623 10.2015 21.6779 10.9989 23.0056Z"
        fill={color}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_3606_7074">
        <Rect
          width={20}
          height={20}
          fill="white"
          transform="translate(8.5 8.49805)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);

export type IconSettingsProps = SvgProps;
