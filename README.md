# Problem Statement

The goal is to write a configuration parser, in the format `name=value`.  
This configuration parser should support interpolation of values, denoted by `${}`.  
The parser should support nested interpolation.

Here is an example `config.txt` file.

```
a=Hello
b=world
c=${a} ${b}
d=${c}, it's @bradgarropy.
e=
```
