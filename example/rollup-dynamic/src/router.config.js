import { ChunkGenerator } from "../../../src";
import chunk from "./Chunk.svelte";

import DefaultPage from "./pages/DefaultPage.svelte";

const instancePage = ChunkGenerator(
  () => import("./pages/MultipleSameInstance/InstancePage.svelte"),
  chunk
);

export default {
  basePath: "",
  mode: "history", // modes: history, hashbang
  routes: {
    "/": {
      component: DefaultPage,
      name: "Home",
      beforeRouteEnter: (context, next) => {
        // console.log("beforeRouteEnter");
        next();
      },
      afterRouteEnter: (context) => {
        // console.log("afterRouteEntered");
      },
    },
    "/test-page": {
      component: import("./pages/TestPage.svelte"),
    },
    "/test-page-async": {
      component: ChunkGenerator(
        () => import("./pages/TestPageAsync.svelte"),
        chunk
      ),
    },
    "/nested-route-page": {
      component: () => import("./pages/NestedRoutePage.svelte"),
      children: {
        "": {
          component: () => import("./pages/NestedRoute/DefaultPage.svelte"),
        },
        "/example": {
          component: () => import("./pages/NestedRoute/ExamplePage.svelte"),
        },
      },
    },
    "/nested-route-params-page": {
      component: () => import("./pages/NestedRouteParamsTestPage.svelte"),
      children: {
        "": {
          component: () =>
            import("./pages/NestedRouteParamsTest/DefaultPage.svelte"),
        },
        "/example/:page": {
          component: () =>
            import("./pages/NestedRouteParamsTest/ExamplePage.svelte"),
        },
        "/:page": {
          component: () =>
            import("./pages/NestedRouteParamsTest/ExampleParamPage.svelte"),
        },
      },
    },
    "/test-multiple-same-instance": {
      component: () => import("./pages/MultipleSameInstance.svelte"),
      children: {
        "": {
          component: instancePage,
          params: {
            type: "default",
          },
        },
        "/example": {
          component: instancePage,
          params: {
            type: "example",
          },
        },
        "/omg": {
          component: () =>
            import("./pages/MultipleSameInstance/InstancePage.svelte"),
          params: {
            type: "omg",
          },
        },
      },
    },
    "/programmatically-routed": {
      component: () => import("./pages/ProgrammaticallyRouted.svelte"),
    },
    "/query-string?test": {
      component: () => import("./pages/QueryString.svelte"),
    },
    "*": {
      component: () => import("./pages/Error404.svelte"),
      chunk,
    },
  },
};
