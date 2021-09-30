import React from 'react';
import App from './App.jsx';
import { fireEvent, screen, render } from '@testing-library/react';

describe('testing recorder', () => {
  it('tests the functionality of undo/ redo and selecting colors', () => {
    render(<App />);

    const undo = screen.getByText('undo');
    const redo = screen.getByText('redo');
    const colorPicker = screen.getByLabelText('color-picker');
    const display = screen.getByLabelText('display');
    // const div = screen.getByTestId('div');

    const red = 'FF0000';
    const blue = '0000FF';
    const green = '00FF00';
    const yellow = 'FFFF00';


    fireEvent.change(colorPicker, { target: { value: red } });
    expect(display).toHaveStyle({ background: red });
    fireEvent.change(colorPicker, { target: { value: blue } });
    expect(display).toHaveStyle({ background: blue });
    fireEvent.change(colorPicker, { target: { value: green } });
    expect(display).toHaveStyle({ background: green });

    fireEvent.click(undo);
    expect(display).toHaveStyle({ background: blue });
    fireEvent.click(undo);
    expect(display).toHaveStyle({ background: red });
    fireEvent.click(redo);
    expect(display).toHaveStyle({ background: blue });

    fireEvent.change(colorPicker, { target: { value: yellow } });
    expect(display).toHaveStyle({ background: yellow });

    
    fireEvent.click(undo);
    expect(display).toHaveStyle({ background: blue });
    fireEvent.click(undo);
    expect(display).toHaveStyle({ background: red });

    fireEvent.click(redo);
    expect(display).toHaveStyle({ background: blue });
    fireEvent.click(redo);
    expect(display).toHaveStyle({ background: yellow });
    fireEvent.click(redo);
    expect(display).toHaveStyle({ background: green });


  });
});
