# Welcome to Nmbl Code Snippets

What is a code snippet? Well, it's a snippet of code, but that's not all.

> Code snippets should be testable, tested and maintained.

Shots fired. That's right, code snippets should be living, breathing... code. Real code. Library owners, contributors, and evangelists write hundreds of examples, deploy them to the docs sites, chat rooms, sandboxes and issue trackers of the world, and forget about them. Then, someone like me comes along, tries out 100 examples, and they all break. WHY!

Because code snippets aren't testable, tested, or maintained. _But they should be! HOW?!_

This project is how. I'm writing in a markdown document right now, and I'm about to throw you a code snippet. Not just any code snippet, but a code snippet which is integrated into the build process of this very project. If the code doesn't compile, these snippets never make it to production, and you _don't read this documentation_. Sound too good to be true? If you're reading this, think again!

## The Hello World snippet

I've created a small hello world app that consists of the function `hello`, which prints `"world"` to the console. This app is within a Lerna monorepo with this website and associated documentation. When I publish this website, all of the modules in the monorepo are going to compile, and if they fail, the entire build will fail. That means no `consoel.log()`. There is a snippet called `hello-world` around the console log.

I will accomplish this with the following code, relative to the root of the monorepo.

### The Source ([with snippets preserved](/docs/preserve-snippets)):

```tsx file=./examples/hello-world-example/hello-world.ts preserve-snippets

```

### The Markdown:

````md
```tsx file=./examples/hello-world-example/hello-world.ts@hello-world

```
````

### The Output:

```tsx file=./examples/hello-world-example/hello-world.ts@hello-world

```

If you're reading this on an actual website (not the source code, silly), and there is output above, then I have proven my point. Convinced? Here's some further reading:

- [JK TODO.](#)

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
