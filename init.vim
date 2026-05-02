if &compatible
  set nocompatible
endif

const s:config_dir = expand('<sfile>:p:h')
const s:dpp_base = stdpath('cache') .. '/dpp-repro'

const s:bootstraps = [
      \ 'dpp.vim',
      \ 'dpp-ext-lazy',
      \ 'denops.vim',
      \ ]
for s:repo in s:bootstraps
  execute $'set runtimepath^={s:config_dir}/bootstrap/{s:repo}'
endfor

for s:fixture in ['provider', 'consumer']
  let s:fdir = s:config_dir .. '/plugins/' .. s:fixture
  if !isdirectory(s:fdir)
    call mkdir(s:fdir, 'p')
  endif
endfor

if s:dpp_base->dpp#min#load_state()
  autocmd User DenopsReady call dpp#make_state(s:dpp_base, s:config_dir .. '/dpp.ts')
endif

filetype indent plugin on
syntax on
