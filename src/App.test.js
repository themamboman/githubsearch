import { render, screen } from '@testing-library/react';
import { act, create } from 'react-test-renderer';

import App from './App';

describe('Main Page tests', () => {
  it('renders nuorder name', () => {
    console.log("rendering App");
    render(<App />);
    const textEl = screen.getByText(/nuorder/i);
    expect(textEl).toBeInTheDocument();
  });

  it('searches for and clicks the Start button and Return home button', () => {
    let testRenderer;

    act(() => {
      testRenderer = create(<App />);
    });
    act(() => {
      testRenderer.root.findByProps({ id: 'start-button' }).props.onClick();
    });

    act(() => {
      testRenderer.root.findByProps({ id: 'return-button'}).props.onClick();
    });
  })
});


