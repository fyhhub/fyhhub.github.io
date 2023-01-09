# git-hooks无法触发

```
hint: The '.git/hooks/pre-commit' hook was ignored because it's not set as executable.
hint: You can disable this warning with `git config advice.ignoredHook false`.
```

```shell
chmod 700 .git/hooks/pre-commit
```