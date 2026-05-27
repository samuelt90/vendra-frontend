type ShirtOutlineIconProps = {
  className?: string;
  pathClassName?: string;
};

export default function ShirtOutlineIcon({
  className = "",
  pathClassName = "",
}: ShirtOutlineIconProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M42 18
           L50 18
           C52 26 58 31 60 31
           C62 31 68 26 70 18
           L78 18
           L104 34
           L95 54
           L82 47
           L82 97
           C82 101 79 104 75 104
           L45 104
           C41 104 38 101 38 97
           L38 47
           L25 54
           L16 34
           L42 18Z"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={pathClassName}
      />
    </svg>
  );
}
