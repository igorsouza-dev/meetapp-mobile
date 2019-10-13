import React from 'react';
import { Container } from './styles';
import Logo from '~/components/Logo';

export default function Header() {
  return (
    <Container>
      <Logo size={24} />
    </Container>
  );
}
