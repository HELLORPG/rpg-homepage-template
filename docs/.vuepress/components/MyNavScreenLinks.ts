import { defineComponent, h } from "vue";

import AutoLink from "./MyAutoLink";
import NavScreenDropdown from "vuepress-theme-hope/lib/client/module/navbar/components/NavScreenDropdown";
import { useNavbarConfig } from "vuepress-theme-hope/lib/client/module/navbar/composables";

import type { VNode } from "vue";

import "vuepress-theme-hope/lib/client/module/navbar/styles/nav-screen-links.scss";

export default defineComponent({
    name: "NavScreenLinks",

    setup() {
        const navbarConfig = useNavbarConfig();

        return (): VNode | null =>
            navbarConfig.value.length
                ? h(
                    "nav",
                    { class: "nav-screen-links" },
                    navbarConfig.value.map((config) =>
                        h(
                            "div",
                            { class: "navbar-links-item" },
                            "children" in config
                                ? h(NavScreenDropdown, { config })
                                : h(AutoLink, { config })
                        )
                    )
                )
                : null;
    },
});