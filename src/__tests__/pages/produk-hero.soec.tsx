import { render, screen } from '@testing-library/react';
import TampilanHeroProduk from '@/views/produk/HeroSection';

describe('TampilanHeroProduk', () => {
  it('renders hero title correctly', () => {
    const page = render(<TampilanHeroProduk />);
    expect(screen.getByText('Produk Page').textContent).toBe('Produk Page');
    expect(page).toMatchSnapshot();
  });
});