import { defineComponent, h, VNode } from "vue";

import InfoPanel from "vuepress-theme-hope/lib/client/module/blog/components/InfoPanel";

import DropTransition from "vuepress-theme-hope/lib/client/components/transitions/DropTransition";
import MarkdownContent from "vuepress-theme-hope/lib/client/components/MarkdownContent";

import "vuepress-theme-hope/lib/client/module/blog/styles/home.scss";

export default defineComponent({
    name: "MyHome",

    setup() {
        // const articles = useArticles();

        return (): VNode =>
            h("div", { class: "page blog" }, [
                // h(BlogHero),
                h("div", { class: "blog-page-wrapper" }, [
                    h(DropTransition, { appear: true, delay: 0.16 }, () => h(InfoPanel)),
                    h("main", { class: "blog-home", id: "main-content" }, [
                        h(DropTransition, { appear: true, delay: 0.24 }, () =>
                                h(MarkdownContent)
                        ),
                    ]),
                ]),
            ]);
    },
});