import {
  BaseConfig,
  type ConfigReturn,
} from "jsr:@shougo/dpp-vim@6.3.1/config";
import type {
  ContextBuilder,
  ExtOptions,
  Plugin,
} from "jsr:@shougo/dpp-vim@6.3.1/types";
import type { Protocol } from "jsr:@shougo/dpp-vim@6.3.1/protocol";
import type {
  Ext as LazyExt,
  Params as LazyParams,
} from "jsr:@shougo/dpp-ext-lazy@2.0.1";
import type { Denops } from "jsr:@denops/std@8.2.0";

const plugins: Plugin[] = [
  {
    name: "provider",
    repo: `${import.meta.dirname}/plugins/provider`,
    path: `${import.meta.dirname}/plugins/provider`,
    hook_source:
      `call writefile(['provider hook_source called'], '${import.meta.dirname}/repro.log', 'a')`,
  },
  {
    name: "consumer",
    repo: `${import.meta.dirname}/plugins/consumer`,
    path: `${import.meta.dirname}/plugins/consumer`,
    on_event: ["FileType"],
    hook_source:
      `call writefile(['consumer hook_source called'], '${import.meta.dirname}/repro.log', 'a')`,
  },
];

export class Config extends BaseConfig {
  override async config(
    { denops, contextBuilder }: {
      denops: Denops;
      contextBuilder: ContextBuilder;
      basePath: string;
    },
  ): Promise<ConfigReturn> {
    contextBuilder.setGlobal({ protocols: [] });

    const [context, options] = await contextBuilder.get(denops);
    const protocols = await denops.dispatcher.getProtocols() as Record<
      string,
      Protocol
    >;

    const [lazyExt, lazyOptions, lazyParams] = await denops.dispatcher
      .getExt("lazy") as [LazyExt, ExtOptions, LazyParams];
    const { plugins: enrichedPlugins, stateLines } = await lazyExt.actions
      .makeState.callback({
        denops,
        context,
        options,
        protocols,
        extOptions: lazyOptions,
        extParams: lazyParams,
        actionParams: { plugins },
      });

    return { plugins: enrichedPlugins, stateLines };
  }
}
