import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../pages/index';
describe('Home', () => {
	beforeEach(() => {
		render(<Home />);
	});
	it('Should link have /api/login href', () => {
		const link = screen.getByTestId('href-login');
		expect(link).toBeInstanceOf(HTMLElement);
		expect(link.getAttribute('href')).toBe('/api/login');
	});
});
