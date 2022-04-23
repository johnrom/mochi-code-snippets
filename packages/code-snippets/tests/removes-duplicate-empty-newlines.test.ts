import { removeDuplicateEmptyNewlines } from '../src/remove-duplicate-empty-newlines';

test('Removes duplicate newlines', () => {
  ['\r\n', '\n'].forEach((newline) => {
    [2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((repeatCount) => {
      const newlines = Array(repeatCount + 1).join(newline);
      expect(
        removeDuplicateEmptyNewlines(
          `${newline}# This tests snippets in markdown.${newlines}## This tests snippets in markdown.${newlines}### This tests snippets in markdown.${newline}`,
          newline
        )
      ).toBe(
        `${newline}# This tests snippets in markdown.${newline}${newline}## This tests snippets in markdown.${newline}${newline}### This tests snippets in markdown.${newline}`
      );
    });
  });
});
