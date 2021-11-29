---
slug: '/docs'
---

# Welcome to Nmbl Code Snippets

What is a code snippet? Well, it's a snippet of code, but that's not all.

> Code snippets should be testable, tested and maintained.

Shots fired. That's right, code snippets should be living, breathing... code. Real code. Library owners, contributors, and evangelists write hundreds of examples, deploy them to the docs sites, chat rooms, sandboxes and issue trackers of the world, and forget about them. Then, a developer like me comes along, tries out 100 examples, and they are all broken. WHY!

Because code snippets aren't testable, tested, or maintained. _But they should be! HOW?!_

This project is how. I'm writing in a markdown document right now, and I'm about to write a code snippet. Not just any code snippet, but a code snippet which is integrated into the build process of this very project. If the code doesn't compile, these snippets never make it to production, and you _don't read this documentation_. Sound too good to be true? If you're reading this, think again!

## The Header snippet

I've created a snippet surrounding the header of this very website. If there is anything incorrect about the code of the header of this website, the entire build will fail.

### The Source ([with snippets preserved](preserving-snippets)):

[comment]: # '@snippet:start preserve-snippets'

```tsx file=./src/header/header.tsx preserve-snippets

```

[comment]: # '@snippet:end preserve-snippets'

### The Markdown:

````md
```tsx file=./src/header/header.tsx snippet=header

```
````

### The Output:

```tsx file=./src/header/header.tsx snippet=header

```

If you're reading this on an actual website (not the source code, silly), and there is output above, then I have proven my point. Convinced? Here's some further reading:

- [Installing](installing)
- [Preserving Snippets](preserving-snippets)

Not convinced? That's ok, too. Here's a llama:

> ```
> \\
> l'>
> ll
> llama~
> || ||
> '' ''
> ```
>
> Source: https://ascii.co.uk/art/llama
