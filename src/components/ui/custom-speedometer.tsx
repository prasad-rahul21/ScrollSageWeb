
"use client";

// Reverted to the older, simpler GaugeChart-like component
import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic'; // Need dynamic import again

// Dynamically import react-gauge-chart only on the client-side
const GaugeChart = dynamic(() => import('react-gauge-chart'), { ssr: false });

interface CustomSpeedometerProps {
  value: number;
  minValue?: number;
  maxValue?: number;
  size?: number; // Added size prop back for consistency
}

export function CustomSpeedometer({
  value,
  minValue = 2,
  maxValue = 8,
  size = 200 // Default size
}: CustomSpeedometerProps) {
  const [gaugeValue, setGaugeValue] = React.useState<number>(0);
  const chartRef = useRef(null); // Ref for the chart

  useEffect(() => {
    // Normalize reading time (minValue-maxValue min) to gauge scale (0-1)
    const normalizedValue = (value - minValue) / (maxValue - minValue);
    setGaugeValue(normalizedValue);
  }, [value, minValue, maxValue]);

  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <GaugeChart
        id="reading-time-gauge"
        nrOfLevels={20} // Number of segments in the arc
        percent={gaugeValue}
        colors={['#22d3ee', '#f43f5e']} // Gradient from cyan to red
        arcWidth={0.3} // Thickness of the arc
        textColor="hsl(var(--foreground))" // Use theme's foreground color
        needleColor="hsl(var(--muted-foreground))" // Muted needle
        needleBaseColor="hsl(var(--primary))" // Primary base
        hideText={true} // REMOVED CENTER PERCENTAGE TEXT
        style={{ width: '100%' }} // Ensure it takes container width
        ref={chartRef} // Assign ref
         // Ensure redraw on value change by using a key based on value
         // (This might not be strictly necessary with useEffect dependency, but good practice)
        key={gaugeValue}
      />
      {/* REMOVED "Up to X minutes" text */}
      {/* <p className="text-lg font-medium mt-2 font-sans">
        Up to <span className="text-primary font-bold text-xl">{value}</span> minutes
      </p> */}
    </div>
  );
}
