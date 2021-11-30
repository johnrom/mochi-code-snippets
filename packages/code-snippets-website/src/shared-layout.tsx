import React, { PropsWithChildren } from 'react';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import './style.css';
import 'highlight.js/styles/vs2015.css';

export const SharedLayout = (props: PropsWithChildren<{}>) => (
  <div>
    <Header />
    <main className="px-5 md:container md:mx-auto md:px-0 md:max-w-prose">
      {props.children}
    </main>
    <Footer />
  </div>
);
