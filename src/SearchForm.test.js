import { render, screen } from '@testing-library/react';
import { act, create } from 'react-test-renderer';
import SearchForm, { queryGitHub } from './SearchForm';

const useDebounce = jest.fn();

jest.mock('axios', () => ({
  get: jest.fn((_url, _body) => {
    console.log("mock axios get");
    return Promise.resolve({
      data: {
        items: [
          {
            user: {login: 'testuser1'},
            created_at: '2021-01-01T20:15:10.000Z',
            last_updated: '2021-01-01T20:15:10.000Z',
            html_url: 'https://test1',
            number: '000001',
            state: 'open',
            title: 'testtitle1',
            labels: [{name: 'label1', color: 'ffeeaa'},],
          },
          {
            user: {login: 'testuser2'},
            created_at: '2021-01-02T21:15:10.000Z',
            last_updated: '2021-01-05T12:15:10.000Z',
            html_url: 'https://test2',
            number: '000002',
            state: 'open',
            title: 'testtitle2',
            labels: [{name: 'label2', color: '00ff00'},],
          },
        ],
      },
    })
  })
}));

describe('SearchForm Page tests', () => {
  it('renders the elements', () => {
    console.log("rendering SearchForm");
    render(<SearchForm />);
    const textEl = screen.getByText(/searching/i);
    expect(textEl).toBeInTheDocument();
  });

  it('simulates search', () => {
    let testRenderer;

    act(() => {
      console.log("creating SearchForm")
      testRenderer = create(<SearchForm />);
    });
    act(() => {
      console.log("typing in search text")
      testRenderer.root.findByProps({ id: 'issueSearchText' }).props.onKeyPress({ key: 'u' });
    });
    
    act(() => {
      console.log("interrupt debounce timer typing in search text")
      testRenderer.root.findByProps({ id: 'issueSearchText' }).props.onKeyPress({ key: 'p' });
    });
    
    act(() => {
      console.log("pressing Enter")
      testRenderer.root.findByProps({ id: 'issueSearchText'}).props.onKeyPress({ key: 'Enter' });
    });
        
    act(() => {
        console.log("clicking box")
        testRenderer.root.findByProps({ id: 'issueSearchText' }).props.onClick();
    })
  })

});
