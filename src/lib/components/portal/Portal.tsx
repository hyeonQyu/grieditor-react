/** @jsxImportSource @emotion/react */
import { PortalContext } from '@contexts/portalContext';
import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { css } from '@emotion/react';

export interface PortalProviderProps {
  children: ReactNode;
}

function PortalProvider(props: PortalProviderProps) {
  const { children } = props;
  const [portalContainerRef, setPortalContainerRef] = useState<HTMLDivElement | null>(null);

  return (
    <PortalContext.Provider value={portalContainerRef}>
      {children}
      <div
        id={'portal'}
        ref={(element) => {
          if (portalContainerRef !== null || element === null) return;
          setPortalContainerRef(element);
        }}
        css={css`
          position: absolute;
          top: 0;
          left: 0;
        `}
      />
    </PortalContext.Provider>
  );
}

export interface PortalConsumerProps {
  children: ReactNode;
}

function PortalConsumer(props: PortalConsumerProps) {
  const { children } = props;

  return (
    <PortalContext.Consumer>
      {(portalContainerRef) => {
        if (portalContainerRef === null) return null;
        return createPortal(children, portalContainerRef);
      }}
    </PortalContext.Consumer>
  );
}

export const Portal = {
  Provider: PortalProvider,
  Consumer: PortalConsumer,
};
