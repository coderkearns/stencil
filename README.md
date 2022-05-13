# Stencil

Create new files quickly and easily, all from the command line.

## Installing

There is currently not a npm package for Stencil, so it needs to be installed from this repo directly:

```bash
$ npm install -g git+https://github.com/coderkearns/stencil.git
```

## Usage

### Patterns

A pattern is a stencil template to make new files from.
Patterns are **traced** in creation, asking questions and filling in data as they go. All patterns are rendered with [EJS](http://ejs.co/) templates.

The simplest pattern has no questions, and only uses the file location and pattern name in the template:

There are three global variables: `file` for the output file, `pattern` for the name of the pattern being copied, and a global [`util`](./traceUtils.js) object with a bunch of goodies.

##### simple_example.ejs
```ejs
// File: <%= file %>
// Made from pattern: <%= pattern %>

console.log("Hello, Stencil + <%= pattern %>!");
```

More complicated patterns use a special syntax of **front matter**.

##### front_matter_example.ejs
```ejs
---
title: What's the title?
---
// File: <%= file %>
// Made from pattern: <%= pattern %>

console.log("---------- <%= title %> ----------");
```

The front matter sections use a specific syntax like so:
```
<name> [{optional extra JSON Object data}]: <question ...>
```

Here's by a more complicated example:

##### boolean_question_example.ejs
```ejs
---
shouldIncludeDoctype {"type": "boolean", "default": true}: Should the <!doctype> be included?
---

<% if (shouldIncludeDoctype) { %>
<!doctype html>
<% } %>
```

#### Question Types:

Currently, the `{ "type": str }` JSON string only has two valid options:

- `"string"`: *(the default)* Ask the given question and return a string.
- `"boolean"`: Ask the given y/n question and return a boolean. Accepts a `{ "default": bool }` option to set a default value.

#### Getting Patterns

Installing new patterns is remarkably easy. You can install any pattern from either a local file or a remote URL.

Install a pattern from a local file:

```bash
$ stencil install ./path/to/pattern
```

Install a pattern from a remote URL:

```bash
$ stencil install https://raw.githubusercontent.com/coderkearns/stencil/master/patterns/html
```

### Creating files from patterns: Tracing

In order to create a file from a template, use the `trace` command.

```bash
$ stencil trace helloworldpattern output.html
-- Tracing helloworldpattern --
Question 1? Sure!
My Bool Question [y/N] n
-------------------------------
Pattern helloworldpattern traced to output.html
```

## Contributing

I don't expect much real interaction with this project, but I will gladly accept pull requests and issues!

### To Do

- [ ] Add more question types
- [ ] Add more To Do items :stuck_out_tongue_winking_eye:

## License

[MIT](https://choosealicense.com/licenses/mit/)
