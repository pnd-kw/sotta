type SpinnerProps = {
  borderColor?: string; 
  size?: number; 
};

export default function Spinner({
  borderColor = "#85582c",
  size = 80,
}: SpinnerProps) {
  const borderSize = 12;
  return (
    <div className="w-full h-[50vh] flex items-center justify-center">
      <div
        className="rounded-full animate-spin"
        style={{
          width: size,
          height: size,
          borderWidth: borderSize,
          borderStyle: "solid",
          borderColor: `${borderColor}`,
          borderTopColor: "transparent",
        }}
      />
    </div>
  );
}
