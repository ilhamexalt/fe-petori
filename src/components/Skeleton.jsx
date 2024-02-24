import { useTimeOut } from "../hooks/useTimeOut";

export default function SkeletonComponent({ className }) {
  const loading = useTimeOut(1000);

  return (
    <div
      className={
        loading
          ? `bg-indigo-50 rounded-sm absolute top-0 ${className}`
          : `hidden`
      }
    ></div>
  );
}
