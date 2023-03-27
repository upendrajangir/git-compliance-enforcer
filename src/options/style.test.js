import { expect } from 'chai';
import { describe, it } from 'mocha';
import sass from 'node-sass';

describe('style.scss', () => {
  it('should compile without errors', () => {
    const result = sass.renderSync({
      file: 'src/style.scss',
    });
    expect(result.css).to.exist;
    expect(result.stats.includedFiles).to.have.lengthOf.at.least(1);
  });

  it('should use the correct primary color', () => {
    const result = sass.renderSync({
      file: 'src/style.scss',
    });
    const css = result.css.toString();
    expect(css).to.include('color: #3f51b5;');
  });

  it('should use the correct secondary color', () => {
    const result = sass.renderSync({
      file: 'src/style.scss',
    });
    const css = result.css.toString();
    expect(css).to.include('color: #9e9e9e;');
  });

  it('should use the correct success color', () => {
    const result = sass.renderSync({
      file: 'src/style.scss',
    });
    const css = result.css.toString();
    expect(css).to.include('color: #4caf50;');
  });

  it('should use the correct error color', () => {
    const result = sass.renderSync({
      file: 'src/style.scss',
    });
    const css = result.css.toString();
    expect(css).to.include('color: #f44336;');
  });

  it('should use the correct primary font', () => {
    const result = sass.renderSync({
      file: 'src/style.scss',
    });
    const css = result.css.toString();
    expect(css).to.include('font-family: Arial, sans-serif;');
  });

  it('should use the correct primary button background color', () => {
    const result = sass.renderSync({
      file: 'src/style.scss',
    });
    const css = result.css.toString();
    expect(css).to.include('background-color: #3f51b5;');
  });

  it('should use the correct primary button color', () => {
    const result = sass.renderSync({
      file: 'src/style.scss',
    });
    const css = result.css.toString();
    expect(css).to.include('color: #fff;');
  });

  it('should use the correct primary button padding', () => {
    const result = sass.renderSync({
      file: 'src/style.scss',
    });
    const css = result.css.toString();
    expect(css).to.include('padding: 0.5em 1em;');
  });

  it('should use the correct primary button border', () => {
    const result = sass.renderSync({
      file: 'src/style.scss',
    });
    const css = result.css.toString();
    expect(css).to.include('border: none;');
  });

  it('should use the correct primary button border radius', () => {
    const result = sass.renderSync({
      file: 'src/style.scss',
    });
    const css = result.css.toString();
    expect(css).to.include('border-radius: 4px;');
  });

  it('should use the correct primary button cursor', () => {
    const result = sass.renderSync({
      file: 'src/style.scss',
    });
    const css = result.css.toString();
    expect(css).to.include('cursor: pointer;');
  });

  it('should use the correct success status color', () => {
    const result = sass.renderSync({
      file: 'src/style.scss',
    });
    const css = result.css.toString();
