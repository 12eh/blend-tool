import type { ReactElement } from "react";

type Props = {
  resolution: number;
};

export function TriaxialBlend(props: Props): ReactElement<Props> {
  const { resolution } = props;

  return (
    <>
      <div id="results">{resolution}</div>
    </>
  );
}
