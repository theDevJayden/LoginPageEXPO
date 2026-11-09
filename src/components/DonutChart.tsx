import Svg, { Circle } from 'react-native-svg';

export type DonutSegment = {
  value: number;
  color: string;
};

type DonutChartProps = {
  segments: DonutSegment[];
  size: number;
  viewBoxSize: number;
  radius: number;
  strokeWidth: number;
  trackColor: string;
  lineCap?: 'round' | 'butt';
};

export default function DonutChart({
  segments,
  size,
  viewBoxSize,
  radius,
  strokeWidth,
  trackColor,
  lineCap = 'butt',
}: DonutChartProps) {
  const center = viewBoxSize / 2;
  const circumference = 2 * Math.PI * radius;
  let start = 0;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
      <Circle cx={center} cy={center} r={radius} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
      {segments.map((segment, index) => {
        const rotation = -90 + start * 360;
        start += segment.value;
        return (
          <Circle
            key={index}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={segment.color}
            strokeWidth={strokeWidth}
            strokeLinecap={lineCap}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - segment.value)}
            rotation={rotation}
            origin={`${center}, ${center}`}
          />
        );
      })}
    </Svg>
  );
}
