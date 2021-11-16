import React, { PropsWithChildren } from 'react';
import { Footer } from './footer/footer';
import { Header } from './header/header';

export const SharedLayout = (props: PropsWithChildren<{}>) => (
  <div>
    <Header />
    <main>{props.children}</main>
    <Footer />
  </div>
);
