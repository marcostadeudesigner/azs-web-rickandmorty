"use client";

import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs';
import { makeClient } from "@/src/lib/apollo/client";


interface ApolloProviderWrapperProps {
  children: React.ReactNode;
}

export function ApolloProviderWrapper({ children }: ApolloProviderWrapperProps) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}