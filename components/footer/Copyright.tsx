export interface Props {
  text?: string;
}

export default function Copyright({ copyright }: Props) {
  return (
    <>
      {copyright?.text && (
        <div className="flex gap-3">
          <p className="text-xs">
            {copyright?.text}
          </p>
        </div>
      )}
    </>
  );
}
