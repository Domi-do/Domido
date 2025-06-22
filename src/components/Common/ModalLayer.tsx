import React from "react";

export interface ModalItem<P extends Record<string, unknown> = Record<string, unknown>> {
  key: string;
  isOpen: boolean;
  Component: React.ComponentType<P>;
  props: P;
}

interface ModalLayerProps {
  modals: ModalItem<any>[];
}

const ModalLayer = ({ modals }: ModalLayerProps) => (
  <>
    {modals.map((m) =>
      m.isOpen ?
        <m.Component
          key={m.key}
          {...m.props}
        />
      : null,
    )}
  </>
);

export default ModalLayer;
