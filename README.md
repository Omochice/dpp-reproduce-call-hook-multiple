# dpp.vim reproduce repository for [dpp#41](https://github.com/Shougo/dpp.vim/issues/41)

`dpp#util#_call_hook('source',sourced=[])` causes an unintended load at an unintended timing.

## Reproduce

1. `NVIM_APPNAME=dpp-repro nvim -u init.vim` for creating cache
1. `NVIM_APPNAME=dpp-repro nvim -u init.vim somefile.txt` for observing behaviors

### Expect behavior

Each plugins are loaded once.

### Actual behavior

Each plugins are loaded twice.
