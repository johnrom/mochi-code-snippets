---
slug: '/docs'
---

# Welcome to Nmbl Code Snippets

What is a code snippet? Well, it's a snippet of code, but that's not all.

> Code snippets should be testable, tested and maintained.

Shots fired. That's right, code snippets should be living, breathing... code. Real code. Library owners, contributors, and evangelists write hundreds of examples, deploy them to the docs sites, chat rooms, sandboxes and issue trackers of the world, and forget about them. Then, a developer like me comes along, tries out 100 examples, and they are all broken. WHY!

Because code snippets aren't testable, tested, or maintained. *But they should be! HOW?!*

This project is how. I'm writing in a markdown document right now, and I'm about to write a code snippet. Not just any code snippet, but a code snippet which is integrated into the build process of this very project. If the code doesn't compile, these snippets never make it to production, and you *don't read this documentation*. Sound too good to be true? If you're reading this, think again!

## The Header snippet

I've created a snippet surrounding the header of the docs website for this project. The documentation of this snippet can't be wrong, because if it is, the build will fail, and the documentation will never be deployed. If I ever remove the header of the website, `@nmbl/code-snippets` will throw an error, and again the documentation will never be deployed.

### The Source ([with snippets preserved](preserving-snippets)):

[comment]: # "@snippet:start preserve-snippets"

```tsx file=./src/header/header.tsx preserve-snippets
import * as React from 'react';

export const Header = () => (
  // @snippet:start header
  <header className="main-header">
    <h1>Nmbl Code Snippets</h1>
  </header>
  // @snippet:end header
);
```

[comment]: # "@snippet:end preserve-snippets"

### The Markdown:

````md
```tsx file=./src/header/header.tsx snippet=header

```
````

### The Output:

```tsx file=./src/header/header.tsx snippet=header
  <header className="main-header">
    <h1>Nmbl Code Snippets</h1>
  </header>
```

If you're reading this on an actual website (not the source code, silly), and there is output above, then I have proven my point. Convinced? Here's some further reading:

*   [Installing](installing)
*   [Preserving Snippets](preserving-snippets)

Not convinced? That's ok, too. Here's a llama:

> ```plaintext
> \\
> l'>
> ll
> llama~
> || ||
> '' ''
> ```
>
> Source: https://ascii.co.uk/art/llama
