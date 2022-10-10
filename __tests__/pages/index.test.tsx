import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../pages/index';
describe('Home', () => {
	beforeEach(() => {
		render(<Home />);
	});
	it('renders a heading', () => {
		const heading = screen.getByRole('heading', {
			name: /Click to connect to your spotify account/i
		});
		expect(heading).toBeInstanceOf(HTMLElement);
	});
	it('renders a link', () => {
		const link = screen.getByTestId('href-login');

		expect(link).toBeInstanceOf(HTMLElement);
		expect(link.getAttribute('href')).toBe('/api/login');
	});
});
